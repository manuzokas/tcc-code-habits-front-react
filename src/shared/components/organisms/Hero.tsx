import { Button } from "@/shared/components/atoms/Button";
import {
  CodeIcon,
  TerminalIcon,
  ZapIcon,
  //   GitBranchIcon,
  HeartPulseIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import brain from "@/assets/images/brain.png";

export function Hero() {
  return (
    <section className="relative bg-black text-white py-40 px-6 overflow-hidden border-b border-gray-800">
      {/* Animated grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[url('/grid-dots.svg')] bg-[length:40px_40px]"></div>
      </div>

      {/* Floating brain image with animations */}
      <motion.div
        className="absolute left-[390px] top-[228px] z-0"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Image container with glow effect */}
        <div className="relative w-[90px] h-[90px]">
          {/* Your PNG image */}
          <img
            src={brain}
            alt="Brain health icon"
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]"
          />

          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 bg-blue-500 rounded-full opacity-0 blur-md -z-10"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute right-20 bottom-20 opacity-15"
        animate={{ rotate: [0, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      >
        <CodeIcon size={180} className="text-blue-500" />
      </motion.div>
      {/* Pulse effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse blur-3xl" />
      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 mb-6"
            >
              <ZapIcon className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="font-mono text-sm text-blue-400">
                v2.0.1-beta
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-5xl font-bold mb-4 leading-tight"
            >
              <span className="text-transparent font-mono bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                CodeHabits
              </span>
              <br />
              <span className="text-xl md:text-xl font-mono text-green-300 mt-2 block">
                <TypeAnimation
                  sequence={[
                    "Seu SO para saúde dev",
                    2000,
                    "Ganhe XP por hábitos saudáveis",
                    2000,
                    "Transforme rotinas em dailys do bem-estar",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-400 mb-8 max-w-lg"
            >
              Uma plataforma <span className="font-mono font-bold text-gray-300">exclusiva</span> para Devs. Transforme
              commits em hidratação, pull requests em pausas e merges em
              exercícios.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button className="flex text-base px-8 py-4 bg-blue-900/20 border border-blue-400/50 shadow-lg shadow-blue-500/10 group">
                <TerminalIcon className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                <span className="font-medium">Deploy Health</span>
              </Button>

              <Button className="flex text-base px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 group">
                <HeartPulseIcon className="mr-2 h-5 w-5 text-red-400" />
                <span className="font-medium">Git Checkout Benefits</span>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-5 flex flex-wrap gap-6 text-gray-400 text-sm"
            >
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span>+10k devs mais saudáveis</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>+300% produtividade</span>
              </div>
            </motion.div>
          </div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-full min-h-[400px]"
          >
            {/* Interactive 3D-like cube */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 mr-20">
                {/* Cube faces */}
                <div className="absolute inset-0 bg-blue-900/20 border-2 border-blue-400/30 rounded-xl transform rotate-3 shadow-2xl shadow-blue-500/10"></div>
                <div className="absolute inset-0 bg-purple-900/20 border-2 border-purple-400/30 rounded-xl transform -rotate-3 shadow-2xl shadow-purple-500/10"></div>
                <div className="absolute inset-0 bg-green-900/20 border-2 border-green-400/30 rounded-xl transform rotate-6 shadow-2xl shadow-green-500/10"></div>

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900/30 rounded-xl border border-gray-700/50">
                  <div className="text-center p-6">
                    <div className="text-4xl mb-3">🚀</div>
                    <h3 className="font-mono text-lg text-blue-400 mb-2">
                      git commit -m "saúde"
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Seu próximo commit pode ser por uma rotina mais saudável
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute top-0 right-0 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30 text-green-400 text-xs font-mono">
              +5% produtividade
            </div>
            <div className="absolute bottom-10 left-0 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 text-xs font-mono">
              10k+ devs
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
