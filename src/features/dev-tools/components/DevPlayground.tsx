import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function DevPlayground() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    { text: "Bem-vindo ao CodeHabits Terminal!", isCommand: false },
    {
      text: 'Digite "help" para ver os comandos disponíveis',
      isCommand: false,
    },
  ]);
  const [showWaterEffect, setShowWaterEffect] = useState(false);
  const terminalEndRef = useRef(null);

  const commands = {
    help: {
      response: [
        "Comandos disponíveis:",
        "hydrate - Registrar consumo de água",
        "stretch - Iniciar pausa para alongamento",
        "stats - Ver suas métricas de saúde",
        "coffee - Registrar pausa para café (com moderação!)",
        'commit - "Comitar" hábitos saudáveis',
      ],
      effect: null,
    },
    hydrate: {
      response: [
        "+10XP para hidratação!",
        "Água é essencial para manter a mente afiada 💧",
      ],
      effect: () => setShowWaterEffect(true),
    },
    stretch: {
      response: [
        "+15XP para mobilidade!",
        "Alongamento previne dores e melhora a postura 🧘",
      ],
      effect: null,
    },
    stats: {
      response: [
        "Métricas de saúde:",
        "Hidratação: 65%",
        "Postura: 45%",
        "Mental: 80%",
      ],
      effect: null,
    },
    coffee: {
      response: [
        "Pausa para café registrada!",
        "Lembre-se: hidrate-se também ☕💦",
      ],
      effect: null,
    },
    commit: {
      response: [
        "Hábitos saudáveis comitados!",
        "Novas conquistas desbloqueadas 🚀",
      ],
      effect: null,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add command to output
    setOutput((prev) => [...prev, { text: `$ ${input}`, isCommand: true }]);

    // Process command
    const cmd = input.toLowerCase();
    if (commands[cmd]) {
      setOutput((prev) => [
        ...prev,
        ...commands[cmd].response.map((text) => ({ text, isCommand: false })),
      ]);
      if (commands[cmd].effect) commands[cmd].effect();
    } else {
      setOutput((prev) => [
        ...prev,
        { text: `Comando não encontrado: ${input}`, isCommand: false },
      ]);
    }

    // Easter eggs
    if (cmd.includes("sudo")) {
      setOutput((prev) => [
        ...prev,
        { text: "Haha, nice try! 😄", isCommand: false },
      ]);
    }

    setInput("");
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  useEffect(() => {
    if (showWaterEffect) {
      const timer = setTimeout(() => setShowWaterEffect(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showWaterEffect]);

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-green-900 to-blue-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              Dev Playground
            </span>
          </h2>
          <p className="text-sm text-gray-400">
            Interaja com sua saúde usando comandos de desenvolvedor
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Water effect */}
          {showWaterEffect && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="text-7xl">💧</div>
            </motion.div>
          )}

          {/* Terminal UI */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center font-mono text-sm text-gray-300">
                codehabits-terminal
              </div>
            </div>

            {/* Terminal content */}
            <div className="p-4 h-80 overflow-y-auto font-mono">
              {output.map((line, i) => (
                <div
                  key={i}
                  className={`mb-2 ${line.isCommand ? "text-blue-400" : "text-gray-300"}`}
                >
                  {line.text}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 bg-gray-800 border-t border-gray-700 flex"
            >
              <span className="text-green-400 mr-2">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-gray-200 outline-none"
                placeholder="Digite um comando..."
                autoFocus
              />
            </form>
          </div>
        </motion.div>

        {/* Easter egg hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-center text-gray-500 text-sm"
        >
          Dica: Tente descobrir comandos secretos (comece com "codehabits:")
        </motion.div>
      </div>
    </section>
  );
}
