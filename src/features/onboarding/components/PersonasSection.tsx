// src/shared/components/organisms/PersonasSection.tsx
import { motion } from "framer-motion";
import {
  Code,
  Zap,
  Clock,
  Coffee,
  BrainCircuit,
  GitPullRequest,
} from "lucide-react";
import { Button } from "@/shared/components/atoms/Button";

export function PersonasSection() {
  const personas = [
    {
      name: "O Crônico",
      description: "Vive no código, esquece do corpo",
      icon: <Clock className="w-4 h-4" />,
      traits: ["12+ horas/dia", "Dores posturais", "Baixa hidratação"],
      color: "from-red-500 to-rose-600",
      border: "hover:border-red-400/50",
    },
    {
      name: "O Ansioso",
      description: "Pressão = Burnout em progresso",
      icon: <Zap className="w-4 h-4" />,
      traits: [
        "Multitarefa excessiva",
        "Dificuldade em desligar",
        "Sono irregular",
      ],
      color: "from-amber-500 to-yellow-600",
      border: "hover:border-amber-400/50",
    },
    {
      name: "O Desorganizado",
      description: "Sem rotina, caos no workflow",
      icon: <Coffee className="w-4 h-4" />,
      traits: [
        "Pausas irregulares",
        "Má gestão de tempo",
        "Alimentação desregrada",
      ],
      color: "from-blue-500 to-indigo-600",
      border: "hover:border-blue-400/50",
    },
    {
      name: "O Consciente",
      description: "Equilíbrio em construção",
      icon: <BrainCircuit className="w-4 h-4" />,
      traits: ["Pausas regulares", "Alongamentos", "Hidratação ok"],
      color: "from-emerald-500 to-teal-600",
      border: "hover:border-emerald-400/50",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-green-900 to-blue-950 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700/80 mb-3"
          >
            <Code className="w-4 h-4 text-blue-400 mr-2" />
            <span className="font-mono text-xs text-green-400 tracking-wider">
              DEV-WELLNESS SCAN
            </span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Qual é seu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              perfil DEV?
            </span>
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Identificamos seu padrão de trabalho e criamos um plano
            personalizado para melhorar sua saúde e produtividade.
          </p>
        </motion.div>

        {/* Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -5,
                rotate: index % 2 === 0 ? 1 : -1,
                boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-xl bg-gray-900/50 border border-gray-800/30 backdrop-blur-sm overflow-hidden ${persona.border} transition-all duration-300 ease-out group`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-10 ${persona.color} pointer-events-none`}
              />

              <div className="p-5 relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-1.5 rounded-md bg-gradient-to-br ${persona.color} shadow-md`}
                  >
                    {persona.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {persona.name}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {persona.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-1.5 mt-3">
                  {persona.traits.map((trait, i) => (
                    <motion.li
                      key={i}
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-2 text-xs text-gray-300"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${persona.color}`}
                      />
                      {trait}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-gray-900/70 border border-gray-800/50 rounded-lg p-6 max-w-2xl mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent opacity-20 pointer-events-none border border-green-500" />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="mb-3"
              >
                <GitPullRequest className="w-8 h-8 text-blue-400" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">
                Seu{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                  relatório personalizado
                </span>{" "}
                em 2 minutos
              </h3>
              <p className="text-xs text-gray-400 mb-4 max-w-md">
                Responda nosso questionário rápido e receba um plano de saúde
                DEV feito sob medida para você.
              </p>
              <Button className="px-6 py-2.5 text-sm bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 transition-all group">
                <span className="relative z-10">Descobrir meu perfil</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
