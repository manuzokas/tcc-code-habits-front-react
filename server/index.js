const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
  debug: true,
});

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const { supabase } = require("./supabaseClient");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// --- rotas do spotify ---
app.get("/login", (req, res) => {
  const scopes =
    "streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-recently-played user-top-read";
  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(
    scopes
  )}&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)}`;
  res.redirect(spotifyAuthUrl);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  if (!code)
    return res.status(400).send("Código de autorização não fornecido.");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  });

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      body.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID +
                ":" +
                process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;
    res.redirect(
      `http://localhost:5173/dashboard/spotify-callback?access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`
    );
  } catch (error) {
    console.error("Erro na autenticação do Spotify:", error.response?.data);
    res.status(500).send("Erro ao autenticar com o Spotify.");
  }
});

app.post("/refresh_token", async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token)
    return res.status(400).send("Refresh token não fornecido.");

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refresh_token,
  });

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      body.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID +
                ":" +
                process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
        },
      }
    );

    const { access_token, expires_in } = response.data;
    const new_refresh_token = response.data.refresh_token || refresh_token;

    res.json({ access_token, refresh_token: new_refresh_token, expires_in });
  } catch (error) {
    console.error(
      "Erro ao refrescar o token do Spotify:",
      error.response?.data
    );
    res.status(500).send("Erro ao refrescar o token do Spotify.");
  }
});

// --- rotas do GitHub ---
app.get("/github/connect", (req, res) => {
  const { userId } = req.query;
  const scopes = "repo user";
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${
    process.env.GITHUB_CLIENT_ID
  }&redirect_uri=${
    process.env.GITHUB_CALLBACK_URL
  }&scope=${encodeURIComponent(scopes)}&state=${userId}`;
  res.redirect(githubAuthUrl);
});

app.get("/github/callback", async (req, res) => {
  const code = req.query.code;
  const userId = req.query.state;

  if (!code || !userId) {
    return res.status(400).send("Authorization code or user ID not provided.");
  }

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
    redirect_uri: process.env.GITHUB_CALLBACK_URL,
  });

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );

    const { access_token } = response.data;

    const githubUserResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const githubUsername = githubUserResponse.data.login;

    const { error } = await supabase
      .from("profiles")
      .update({
        github_access_token: access_token,
        github_username: githubUsername,
      })
      .eq("id", userId);

    if (error) {
      console.error("Erro ao salvar dados do GitHub no Supabase:", error);
      throw new Error("Failed to save GitHub data.");
    }

    res.redirect(`http://localhost:5173/dashboard?github_success=true`);
  } catch (error) {
    console.error("Erro na autenticação do GitHub:", error.response?.data);
    res.status(500).send("Erro ao autenticar com o GitHub.");
  }
});

app.get("/github/commits", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).send("User ID is required.");
  }

  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("github_access_token, github_username")
      .eq("id", userId)
      .single();

    if (error || !profile?.github_access_token || !profile?.github_username) {
      return res.status(404).send("GitHub account not linked.");
    }

    const accessToken = profile.github_access_token;
    const username = profile.github_username;

    const since = new Date();
    since.setUTCHours(0, 0, 0, 0);
    const sinceISO = since.toISOString().split("T")[0];

    const searchResponse = await axios.get(
      "https://api.github.com/search/commits",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-GitHub-Api-Version": "2022-11-28",
          Accept: "application/vnd.github.cloak-preview",
        },
        params: {
          q: `author:${username} author-date:>=${sinceISO}`,
          sort: "author-date",
          order: "desc",
          per_page: 100,
        },
      }
    );

    const commits = searchResponse.data.items;
    const totalCommits = searchResponse.data.total_count;

    const commitTimestamps = commits.map((commit) => commit.commit.author.date);

    const recentCommits = commits.map((commit) => ({
      repoName: commit.repository.name,
      message: commit.commit.message,
      url: commit.html_url,
      time: new Date(commit.commit.author.date).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Sao_Paulo",
      }),
    }));

    const today = new Date().toISOString().split("T")[0];
    const metricsToUpsert = [
      {
        user_id: userId,
        metric_type: "commit_count",
        value: totalCommits.toString(),
        date: today,
        last_updated: new Date().toISOString(),
      },
      {
        user_id: userId,
        metric_type: "commit_timestamps",
        value: JSON.stringify(commitTimestamps),
        date: today,
        last_updated: new Date().toISOString(),
      },
    ];

    const { error: upsertError } = await supabase
      .from("health_metrics_daily")
      .upsert(metricsToUpsert, { onConflict: "user_id,metric_type,date" });

    if (upsertError) {
      console.error(
        "Erro ao salvar métricas de commits no Supabase:",
        upsertError
      );
    }

    res.json({
      count: totalCommits,
      timestamps: commitTimestamps,
      recentCommits: recentCommits,
    });
  } catch (error) {
    console.error(
      "Erro ao buscar commits do GitHub:",
      error.response?.data || error.message
    );
    res.status(500).send("Erro ao buscar commits.");
  }
});

app.get("/github/commits-period", async (req, res) => {
  const { userId, period } = req.query;

  if (!userId || !period) {
    return res.status(400).send("User ID and period are required.");
  }

  try {
    const days = period === "7days" ? 7 : 30;
    const allDatesInRange = [];
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      allDatesInRange.push(d.toISOString().split("T")[0]);
    }
    const startDateISO = allDatesInRange[allDatesInRange.length - 1];
    const endDateISO = allDatesInRange[0];

    const { data: existingData, error: fetchError } = await supabase
      .from("health_metrics_daily")
      .select("date, value")
      .eq("user_id", userId)
      .eq("metric_type", "commit_count")
      .gte("date", startDateISO)
      .lte("date", endDateISO);

    if (fetchError) throw fetchError;

    const existingDates = new Set(existingData.map((d) => d.date));

    const missingDates = allDatesInRange.filter((d) => !existingDates.has(d));

    if (missingDates.length > 0) {
      console.log(`Backfill necessário para ${missingDates.length} dias.`);
      const { data: profile } = await supabase
        .from("profiles")
        .select("github_access_token, github_username")
        .eq("id", userId)
        .single();

      if (!profile?.github_access_token) {
        return res.status(404).send("GitHub account not linked.");
      }

      const accessToken = profile.github_access_token;
      const username = profile.github_username;

      const newMetricsToUpsert = [];

      for (const date of missingDates) {
        const searchResponse = await axios.get(
          "https://api.github.com/search/commits",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-GitHub-Api-Version": "2022-11-28",
              Accept: "application/vnd.github.cloak-preview",
            },
            params: { q: `author:${username} author-date:${date}` },
          }
        );

        const commitCount = searchResponse.data.total_count;

        newMetricsToUpsert.push({
          user_id: userId,
          metric_type: "commit_count",
          value: commitCount.toString(),
          date: date,
          last_updated: new Date().toISOString(),
        });
      }

      if (newMetricsToUpsert.length > 0) {
        const { error: upsertError } = await supabase
          .from("health_metrics_daily")
          .upsert(newMetricsToUpsert, {
            onConflict: "user_id,metric_type,date",
          });
        if (upsertError) throw upsertError;
      }
    }

    const { data: finalData, error: finalFetchError } = await supabase
      .from("health_metrics_daily")
      .select("date, value")
      .eq("user_id", userId)
      .eq("metric_type", "commit_count")
      .gte("date", startDateISO)
      .lte("date", endDateISO)
      .order("date", { ascending: true });

    if (finalFetchError) throw finalFetchError;

    const commitHistory = finalData.map((item) => ({
      date: item.date,
      commits: parseInt(item.value, 10) || 0,
    }));

    res.json({ history: commitHistory });
  } catch (error) {
    console.error("Erro na rota /github/commits-period:", error.message);
    res.status(500).send("Erro ao buscar histórico de commits.");
  }
});

// --- ROTA PARA O ÍNDICE DE FOCO EFETIVO (IFE) ---
app.get("/api/metrics/ife", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authorization header is missing or malformed" });
  }
  const token = authorization.split(" ")[1];

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return res
      .status(401)
      .json({ error: userError?.message || "Invalid token or user not found" });
  }

  const { data, error } = await supabase.rpc("get_daily_ife", {
    p_user_id: user.id,
  });

  if (error) {
    console.error("Erro ao chamar a função RPC get_daily_ife:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});
// --- FIM DA ROTA IFE ---

// --- ROTA PARA O RESUMO DIÁRIO (IFE, Humor, Produtividade) ---
app.get("/api/metrics/daily-summary", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authorization header is missing or malformed" });
  }
  const token = authorization.split(" ")[1];

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return res
      .status(401)
      .json({ error: userError?.message || "Invalid token or user not found" });
  }

  const { data, error } = await supabase.rpc("get_daily_summary", {
    p_user_id: user.id,
  });

  if (error) {
    console.error("Erro ao chamar a função RPC get_daily_summary:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});
// --- FIM DA ROTA RESUMO DIÁRIO ---

app.listen(PORT, () => {
  console.log(
    `Servidor de autenticação do Spotify e GitHub rodando na porta ${PORT}`
  );
});
