// src/shared/components/organisms/Footer.tsx
import {
  Github,
  Twitter,
  Linkedin,
  GitBranch,
  HeartPulse,
  Code2,
  Zap,
  Coffee,
  BrainCircuit,
} from "lucide-react";
import { Button } from "@/shared/components/atoms/Button";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-green-600">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                CodeHabits
              </span>
            </div>
            <p className="text-gray-400">
              Transformando commits em hábitos saudáveis desde 2024
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-blue-400" />
              Navegação
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Gamificação
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Personas DEV
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Depoimentos
                </a>
              </li>
            </ul>
          </div>

          {/* Health Habits */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-green-400" />
              Hábitos
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Zap className="w-4 h-4 text-yellow-400" /> Pausas ativas
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Coffee className="w-4 h-4 text-blue-400" /> Hidratação
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <BrainCircuit className="w-4 h-4 text-purple-400" /> Saúde
                mental
              </li>
            </ul>
          </div>

          {/* CTA Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Junte-se à nossa comunidade
            </h3>
            <p className="text-gray-400 mb-4">
              Receba dicas de saúde para devs e atualizações
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 CodeHabits. Todos os direitos reservados.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              Termos
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              Privacidade
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-20 w-60 h-60 rounded-full bg-green-500/10 blur-3xl"></div>
      </div>
    </footer>
  );
}
