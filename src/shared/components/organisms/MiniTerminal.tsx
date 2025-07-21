// @/shared/components/organisms/MiniTerminal.tsx
import { useState, useEffect, useRef } from "react";

const MiniTerminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([
    "Bem-vindo ao CodeHabits Terminal!",
    'Digite "help" para ver os comandos disponíveis.',
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      "Comandos disponíveis:",
      "help - Mostra esta ajuda",
      "clear - Limpa o terminal",
      "motivate - Mensagem motivacional",
      "health - Dicas de saúde para devs",
      "time - Mostra a hora atual",
      'pwd - Mostra o diretório "virtual" atual',
    ],
    clear: () => [],
    motivate: () => [
      "Você é capaz de resolver qualquer bug!",
      "Lembre-se: Todo expert já foi iniciante.",
      "Pausas regulares = Produtividade sustentável 💪",
    ],
    health: () => [
      "💧 Beba água agora!",
      "👀 Lembre-se da regra 20-20-20 para seus olhos",
      "🧘 Faça um alongamento rápido",
      "🪑 Verifique sua postura",
    ],
    time: () => [new Date().toLocaleTimeString()],
    pwd: () => ["/home/dev/codehabits"],
    default: () => [
      `Comando não encontrado: ${input}. Digite "help" para ajuda.`,
    ],
  };

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [output]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOutput = [...output, `$ ${input}`];
    const command = input.toLowerCase().trim();

    // Process command
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const commandOutput = (commands as any)[command]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? (commands as any)[command]()
      : commands.default();

    setOutput([...newOutput, ...commandOutput]);
    setHistory([...history, input]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" && history.length > 0) {
      e.preventDefault();
      const newIndex =
        historyIndex < history.length - 1
          ? historyIndex + 1
          : history.length - 1;
      setHistoryIndex(newIndex);
      setInput(history[history.length - 1 - newIndex]);
    } else if (e.key === "ArrowDown" && historyIndex >= 0) {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(newIndex >= 0 ? history[history.length - 1 - newIndex] : "");
    }
  };

  return (
    <div className="bg-gray-900 mx-auto rounded-xl border border-green-400/30 shadow-lg shadow-green-500/20 w-full max-w-xs h-full flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between bg-gray-800/50 px-4 py-2 rounded-t-xl border-b border-green-400/20">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
          <span className="text-xs font-mono text-green-300">terminal</span>
        </div>
        <span className="text-xs text-gray-400">CodeHabits v1.0</span>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-3 overflow-y-auto font-mono text-sm">
        {output.map((line, i) => (
          <div
            key={i}
            className={`mb-1 ${line.startsWith("$") ? "text-green-400" : "text-gray-300"}`}
          >
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleSubmit} className="px-3 pb-3">
        <div className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-gray-800 border border-gray-700 focus:border-green-500 rounded px-2 py-1 text-gray-200 font-mono text-sm focus:outline-none"
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};

export default MiniTerminal;
