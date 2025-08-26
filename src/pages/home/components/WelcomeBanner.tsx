import { motion } from "framer-motion";

export const WelcomeBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-sm relative overflow-hidden rounded-2xl bg-blue-600/10 backdrop-blur-sm border border-gray-700 p-6 mb-8 shadow-md shadow-blue-500"
    >
      {/* Efeito de gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-gray-900 to-green-900/10 opacity-30 pointer-events-none" />

      {/* Efeitos de brilho minimalistas */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/5 rounded-full filter blur-xl" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-500/5 rounded-full filter blur-xl" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Avatar moderno com borda gradiente */}
        <div className="mb-4 p-0.5 rounded-full bg-gradient-to-r from-blue-500 to-green-500">
          <div className="p-1 rounded-full bg-gray-800">
            <img
              src="https://files.tecnoblog.net/wp-content/uploads/2019/02/thispersondoesnotexist.jpg"
              alt="dev icon"
              className="w-14 h-14 object-cover rounded-full border-2 border-gray-800"
            />
          </div>
        </div>

        {/* Título clean */}
        <h3 className="text-lg font-semibold text-white">
          Bem-vindo de volta, <span className="text-blue-400">Dev</span>
        </h3>

        {/* Mensagem concisa */}
        <p className="text-[12px] text-gray-400 mb-5 max-w-[250px]">
          Seu espaço para equilibrar código e bem-estar
        </p>

        {/* Tags modernas */}
        <div className="flex gap-2">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 border border-blue-800/50">
            #DevWellness
          </span>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-700/50 text-gray-300 border border-gray-600/50">
            #Hub
          </span>
        </div>
      </div>
    </motion.div>
  );
};
