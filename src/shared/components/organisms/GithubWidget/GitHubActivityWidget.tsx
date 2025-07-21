import { motion } from "framer-motion";
import {
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Star,
  Zap,
} from "lucide-react";
import type { Button } from "../../atoms/Button";

export function GitHubActivityWidget() {

  // Dados mockados - na implementação real viriam da API do GitHub
  const [stats] = useState({
    commits: 12,
    pullRequests: 3,
    branches: 2,
    stars: 5,
    streak: 8,
  });

  const [isConnected, setIsConnected] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 lg:col-span-2"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
            <GitBranch className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Atividade no GitHub
          </h3>
        </div>
        <Button
          onClick={() => setIsConnected(!isConnected)}
          className={isConnected ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {isConnected ? "Conectado" : "Conectar GitHub"}
        </Button>
      </div>

      {isConnected ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Commits */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <GitCommit className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Commits</h4>
                  <span className="text-xs text-gray-500">hoje</span>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {stats.commits}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-blue-500"
                style={{
                  width: `${Math.min(100, (stats.commits / 20) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Pull Requests */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                  <GitPullRequest className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">PRs</h4>
                  <span className="text-xs text-gray-500">esta semana</span>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {stats.pullRequests}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-purple-500"
                style={{
                  width: `${Math.min(100, (stats.pullRequests / 5) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Streak */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Streak</h4>
                  <span className="text-xs text-gray-500">
                    dias consecutivos
                  </span>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {stats.streak}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-orange-500"
                style={{
                  width: `${Math.min(100, (stats.streak / 30) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Stars */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Stars</h4>
                  <span className="text-xs text-gray-500">este mês</span>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {stats.stars}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-yellow-500"
                style={{
                  width: `${Math.min(100, (stats.stars / 10) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <GitMerge className="mx-auto h-12 w-12 text-gray-400" />
          <h4 className="mt-4 font-medium text-gray-800">
            Conecte sua conta do GitHub
          </h4>
          <p className="mt-2 text-gray-600">
            Sincronize suas atividades de desenvolvimento e ganhe pontos por
            seus commits, PRs e contribuições.
          </p>
          <Button
            onClick={() => setIsConnected(true)}
            className="mt-4 bg-gray-800 hover:bg-gray-700"
          >
            <GitBranch className="mr-2 w-4 h-4" />
            Conectar GitHub
          </Button>
        </div>
      )}
    </motion.div>
  );
}
function useState(arg0: { commits: number; pullRequests: number; branches: number; stars: number; streak: number; }): [any, any] {
    throw new Error("Function not implemented.");
}

