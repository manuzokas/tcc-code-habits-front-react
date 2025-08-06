const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/login", (req, res) => {
  const scopes =
    "streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-recently-played user-top-read";

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)}`;

  res.redirect(spotifyAuthUrl);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  if (!code) {
    return res.status(400).send("Código de autorização não fornecido.");
  }

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
    console.error("Erro na autenticação:", error.response?.data);
    res.status(500).send("Erro ao autenticar com o Spotify.");
  }
});

app.post("/refresh_token", async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).send("Refresh token não fornecido.");
  }

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

    res.json({
      access_token,
      refresh_token: new_refresh_token,
      expires_in,
    });
  } catch (error) {
    console.error("Erro ao refrescar o token:", error.response?.data);
    res.status(500).send("Erro ao refrescar o token do Spotify.");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de autenticação do Spotify rodando na porta ${PORT}`);
});
