import { motion } from "framer-motion";
import {
  CodeIcon,
  HeartPulseIcon,
  ZapIcon,
  GitMergeIcon,
  CpuIcon,
  BarChart2Icon,
  ShieldIcon,
  AwardIcon,
} from "lucide-react";

interface BenefitItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  command: string;
  color: string;
  delay: number;
}

const benefits: BenefitItem[] = [
  {
    title: "health.dashboard()",
    description:
      "Hub completo com suas métricas de saúde em tempo real + Timer + Player de Música",
    icon: <BarChart2Icon className="w-5 h-5" />,
    badge: "analytics: enabled",
    command: "codehabits health-dashboard",
    color: "from-green-500 to-green-400",
    delay: 0.1,
  },
  {
    title: "git checkout --healthy",
    description: "Sistema de recompensas por hábitos saudáveis com XP e níveis",
    icon: <AwardIcon className="w-5 h-5" />,
    badge: "gamification: on",
    command: "git commit -m 'drink water +100xp'",
    color: "from-purple-500 to-fuchsia-400",
    delay: 0.2,
  },
  {
    title: "burnout.protect()",
    description: "Algoritmos que detectam sinais de estresse e sugerem ações",
    icon: <ShieldIcon className="w-5 h-5" />,
    badge: "AI: active",
    command: "if (stressLevel > 80) triggerBreak()",
    color: "from-red-500 to-red-400",
    delay: 0.3,
  },
  {
    title: "posture.correct()",
    description:
      "Lembretes inteligentes para melhorar sua postura durante o trabalho",
    icon: <CpuIcon className="w-5 h-5" />,
    badge: "posture: tracking",
    command: "setInterval(postureCheck, 1800000)",
    color: "from-yellow-500 to-amber-400",
    delay: 0.4,
  },
  {
    title: "hydration.reminder()",
    description: "Sistema de hidratação integrado ao seu fluxo de trabalho",
    icon: <ZapIcon className="w-5 h-5" />,
    badge: "hydration: 8/8",
    command: "while(coding) { drinkWater.every(30min) }",
    color: "from-cyan-500 to-blue-400",
    delay: 0.5,
  },
  {
    title: "mental.reset()",
    description: "Exercícios rápidos para pausas mentais entre commits",
    icon: <HeartPulseIcon className="w-5 h-5" />,
    badge: "mental: health",
    command: "await mindfulness(300000)", // 5 minutes in ms
    color: "from-orange-500 to-orange-400",
    delay: 0.6,
  },
];

export function BenefitsDev() {
  return (
    <section className="px-6 py-20 bg-gradient-to-r from-green-900/90 to-blue-900/90 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-mono bg-gray-900 text-green-500 font-normal rounded-full border border-blue-500/20 mb-4">
            CODE HABITS BENEFITS
          </span>
          <h2 className="text-4xl md:text-3xl font-sans font-bold text-gray-200 mb-2">
            Our {""}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              Benefits
            </span>
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Conheça todos os benefícios através das nossas funcionalidades
            principais
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: benefit.delay }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="h-full p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-green-500 hover:border-blue-500 shadow-lg shadow-green-500 transition-all overflow-hidden">
                {/* Gradient effect on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${benefit.color}`}
                />

                {/* Header */}
                <div className="flex items-start gap-4 mb-5 relative z-10">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${benefit.color}`}
                  >
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white font-mono">
                      {benefit.title}
                    </h3>
                    <span className="inline-block px-2 py-0.5 text-xs font-mono bg-gray-800 text-gray-300 rounded border border-gray-700 mt-1">
                      {benefit.badge}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-5 relative z-10">
                  {benefit.description}
                </p>

                {/* Command line */}
                <div className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 font-mono text-xs text-gray-300 overflow-x-auto relative z-10">
                  <span className="text-green-400">$</span> {benefit.command}
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 pointer-events-none border-2 border-blue-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-800 flex flex-wrap justify-center gap-6 text-gray-400 text-sm font-mono"
        >
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <span>+85% adesão aos hábitos</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
            <span>-60% dores posturais</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
            <span>3x mais produtividade</span>
          </div>
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow-lg shadow-blue-500/10">
            <div className="text-left sm:text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to commit to your health?
              </h3>
              <p className="text-sm text-gray-400 mb-4 sm:mb-0">
                Join thousands of developers leveling up their wellbeing
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 rounded-lg text-white font-medium text-sm flex items-center justify-center transition-all">
                <CodeIcon className="mr-2 h-4 w-4" />
                Start Coding Healthy
              </button>
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-gray-300 font-medium text-sm flex items-center justify-center transition-all">
                <GitMergeIcon className="mr-2 h-4 w-4" />
                See Case Studies
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
