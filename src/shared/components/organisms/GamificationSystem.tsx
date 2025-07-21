// src/shared/components/organisms/GamificationSystem.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Code,
  Dumbbell,
  BrainCircuit,
  Trophy,
  Droplet,
  Rocket,
  Zap,
  Gem,
  Monitor,
  Award,
  BarChart2,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "@/shared/components/atoms/Button";

const levels = [
  {
    title: "Trainee",
    icon: <Code className="w-4 h-4" />,
    color: "text-gray-400",
    bg: "bg-gray-800/30",
    border: "border-gray-700",
    xpRequired: "0-1K XP",
    rewards: ["Lembretes de saúde", "Análises básicas"],
    tasks: [
      { name: "Primeiro commit", xp: 50, icon: <Code className="w-3 h-3" /> },
      { name: "Hidratação", xp: 20, icon: <Droplet className="w-3 h-3" /> },
    ],
  },
  {
    title: "Junior",
    icon: <BarChart2 className="w-4 h-4" />,
    color: "text-blue-400",
    bg: "bg-blue-900/20",
    border: "border-blue-800/50",
    xpRequired: "1K-3K XP",
    rewards: ["Integração com GitHub", "Alertas posturais"],
    tasks: [
      {
        name: "Hidratação diária",
        xp: 75,
        icon: <Droplet className="w-3 h-3" />,
      },
      { name: "Postura 30min", xp: 50, icon: <Dumbbell className="w-3 h-3" /> },
    ],
  },
  {
    title: "Pleno",
    icon: <Shield className="w-4 h-4" />,
    color: "text-emerald-400",
    bg: "bg-emerald-900/20",
    border: "border-emerald-800/50",
    xpRequired: "3K-7K XP",
    rewards: ["Relatórios avançados", "Saúde da equipe"],
    tasks: [
      { name: "Sequência 7 dias", xp: 200, icon: <Zap className="w-3 h-3" /> },
      { name: "Caminhadas", xp: 120, icon: <Clock className="w-3 h-3" /> },
    ],
  },
  {
    title: "Senior",
    icon: <Trophy className="w-4 h-4" />,
    color: "text-purple-400",
    bg: "bg-purple-900/20",
    border: "border-purple-800/50",
    xpRequired: "7K+ XP",
    rewards: ["Badge de mentor", "Insights personalizados"],
    tasks: [
      { name: "Mentoria", xp: 1000, icon: <Gem className="w-3 h-3" /> },
      {
        name: "Equipe saudável",
        xp: 1200,
        icon: <Rocket className="w-3 h-3" />,
      },
    ],
  },
];

const achievements = [
  {
    name: "Hidratação",
    icon: <Droplet className="w-4 h-4" />,
    xp: 100,
    description: "5 dias hidratando",
    unlocked: true,
    color: "border-blue-500/30 bg-blue-900/10",
  },
  {
    name: "Postura",
    icon: <Dumbbell className="w-4 h-4" />,
    xp: 150,
    description: "20h boa postura",
    unlocked: true,
    color: "border-emerald-500/30 bg-emerald-900/10",
  },
  {
    name: "Mindfulness",
    icon: <BrainCircuit className="w-4 h-4" />,
    xp: 200,
    description: "10 pausas conscientes",
    unlocked: false,
    color: "border-purple-500/30 bg-purple-900/10",
  },
  {
    name: "Tela Saudável",
    icon: <Monitor className="w-4 h-4" />,
    xp: 300,
    description: "Gerenciamento de tempo",
    unlocked: false,
    color: "border-cyan-500/30 bg-cyan-900/10",
  },
];

export function GamificationSystem() {
  const [activeLevel, setActiveLevel] = useState(1);
  const [showAchievements, setShowAchievements] = useState(false);

  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-950 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 border border-gray-700 mb-4">
            <span className="font-mono text-xs text-blue-400 tracking-wider">
              SISTEMA DE GAMIFICAÇÃO
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Evolua Seus Hábitos de Saúde
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            Transforme sua rotina de desenvolvedor em uma jornada de bem-estar
            com nosso sistema de progresso.
          </p>
        </motion.div>

        <div className="pb-5">
          <h3 className="text-xl font-semibold text-white mb-2">Levels</h3>
          <p className="text-xs text-gray-400">
            Suba de nível para desbloquear novas funcionalidades
          </p>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Level Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {levels.map((level, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  onClick={() => setActiveLevel(index + 1)}
                  className={`rounded-lg border ${level.border} ${level.bg} p-5 cursor-pointer transition-all ${activeLevel === index + 1 ? "ring-2 ring-blue-200 shadow-lg shadow-green-400" : ""}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-lg font-semibold ${level.color}`}>
                      {level.title}
                    </h3>
                    <div className="p-2 rounded-md bg-gray-400/20">
                      {level.icon}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">
                    {level.xpRequired}
                  </p>

                  <div className="space-y-2 mb-4">
                    {level.tasks.map((task, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 bg-gray-800/50 rounded-md"
                      >
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-sm bg-gray-700 flex items-center justify-center mr-2">
                            {task.icon}
                          </div>
                          <span className="text-xs text-gray-300">
                            {task.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono bg-gray-700 text-blue-400 px-2 py-0.5 rounded">
                          +{task.xp}XP
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-gray-800">
                    <h4 className="text-xs font-medium text-gray-400 mb-2">
                      Desbloqueia:
                    </h4>
                    <ul className="space-y-1">
                      {level.rewards.map((reward, i) => (
                        <li
                          key={i}
                          className="text-xs text-gray-300 flex items-center"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></span>
                          {reward}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-gray-800/30 border h-fit my-auto border-green-700 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4">
              Seu Progresso
            </h3>

            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>{levels[activeLevel - 1].title}</span>
                <span>{levels[activeLevel - 1].xpRequired}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                  style={{ width: `${(activeLevel / levels.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Próxima Conquista:
              </h4>
              <div className="flex items-center bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                <div className="w-10 h-10 rounded-md bg-emerald-900/30 border border-emerald-800/50 flex items-center justify-center mr-3">
                  <Award className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {levels[activeLevel]?.rewards[0] ||
                      "Nível máximo alcançado"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {levels[activeLevel]?.xpRequired || ""}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">
                Estatísticas:
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-700/30 rounded-md p-2 border border-gray-600">
                  <p className="text-xs text-gray-400">XP Total</p>
                  <p className="text-sm font-medium text-white">1,250</p>
                </div>
                <div className="bg-gray-700/30 rounded-md p-2 border border-gray-600">
                  <p className="text-xs text-gray-400">Conquistas</p>
                  <p className="text-sm font-medium text-white">2/8</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Conquistas
              </h3>
              <p className="text-xs text-gray-400">
                Complete desafios para desbloquear
              </p>
            </div>
            <Button
              onClick={() => setShowAchievements(!showAchievements)}
              className="text-blue-400 hover:text-blue-300"
            >
              {showAchievements ? "Mostrar menos" : "Mostrar todas"}
            </Button>
          </div>

          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-3 transition-all ${showAchievements ? "" : "max-h-[140px] overflow-hidden"}`}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className={`rounded-lg border ${achievement.color} p-3 transition-all ${achievement.unlocked ? "" : "opacity-60"}`}
              >
                <div className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center mx-auto mb-2">
                  {achievement.icon}
                </div>
                <h4 className="text-xs font-semibold text-center text-white mb-1">
                  {achievement.name}
                </h4>
                <p className="text-[0.65rem] text-center text-gray-400 mb-2">
                  {achievement.description}
                </p>
                <div className="flex justify-center">
                  <span className="text-[0.65rem] font-mono bg-gray-800 text-blue-400 px-2 py-0.5 rounded-full">
                    +{achievement.xp}XP
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <Rocket className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Pronto para melhorar seus hábitos?
              </h3>
              <p className="text-sm text-gray-400 mb-6 max-w-md">
                Comece hoje mesmo e transforme sua rotina de desenvolvimento em
                uma jornada mais saudável.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <Button className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-sm">
                  Começar Agora
                </Button>
                <Button className="flex-1 py-2.5 text-sm border-gray-600">
                  Saiba Mais
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
