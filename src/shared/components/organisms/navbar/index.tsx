"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Trophy,
  User,
  Bell,
  Flame,
  Menu,
  X,
  Terminal,
  Github,
} from "lucide-react";

import { Button } from "../../atoms/Button";
import { Progress } from "@/shared/components/atoms/Progress";
import { Avatar } from "@/shared/components/atoms/Avatar";
import { Badge } from "@/shared/components/atoms/Badge";
import { Tooltip } from "@/shared/components/atoms/Tooltip";
import { ThemeToggle } from "../../atoms/ThemeToggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasNotifications] = useState(true);

  // Mock data - substitua por dados reais posteriormente
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    avatar: string | null; // Explicitamente definido como string ou null
  }>({
    name: "DevUser",
    avatar: null,
  });

  // Mock user data - substituir por dados reais do seu sistema
  const userData = {
    level: 12,
    xp: 1245,
    nextLevelXp: 2000,
    streak: 7,
    badges: 5,
  };

  // Função mock para login (substitua pela sua implementação real posteriormente)
  const handleLogin = () => {
    setIsAuthenticated(true);
    setUser({
      name: "JohnDoe",
      avatar:
        "https://files.tecnoblog.net/wp-content/uploads/2019/02/thispersondoesnotexist.jpg",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progressPercentage = (userData.xp / userData.nextLevelXp) * 100;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-blue-900/5 backdrop-blur-sm "
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex items-center justify-between h-16">
          {/* Logo e navegação principal */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Terminal className="h-6 w-6 text-green-400" />
              <span className="ml-2 text-xl font-bold text-white font-mono">
                Code<span className="text-blue-400">Habits</span>
              </span>
            </div>

            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a
                href="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Code className="h-4 w-4 mr-1" />
                Hub
              </a>
              <a
                href="/habits"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Flame className="h-4 w-4 mr-1" />
                Hábitos
              </a>
              <a
                href="/stats"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Trophy className="h-4 w-4 mr-1" />
                Progresso
              </a>
            </nav>
          </div>

          {/* Desktop - Lado direito */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Barra de progresso do nível */}
            <Tooltip
              content={`Level ${userData.level} - ${userData.xp}/${userData.nextLevelXp} XP`}
            >
              <div className="flex items-center">
                <span className="text-xs text-yellow-400 font-mono mr-2">
                  Lv.{userData.level}
                </span>
                <Progress
                  value={progressPercentage}
                  className="w-24 h-2"
                  indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500"
                />
              </div>
            </Tooltip>

            {/* Notificações */}
            <button className="p-1 rounded-full text-gray-400 hover:text-white relative">
              <Bell className="h-5 w-5" />
              {hasNotifications && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </button>

            {/* Login/Avatar */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Badge
                  content={userData.streak}
                  variant="primary"
                  className="font-mono text-xs"
                  tooltip={`${userData.streak} dias de streak!`}
                >
                  <Flame className="h-5 w-5 text-orange-400" />
                </Badge>

                <Avatar
                  src={user?.avatar}
                  alt={user?.name}
                  fallback={
                    user?.name ? (
                      <span className="text-sm font-medium">
                        {user.name.charAt(0)}
                      </span>
                    ) : (
                      <User className="h-5 w-5" />
                    )
                  }
                  className="h-8 w-8"
                />
              </div>
            ) : (
              <Button className="font-mono text-sm w-full hover:bg-orange-500 flex" onClick={handleLogin}>
                <Github className="h-4 w-4 mr-1 text-orange-300 font-bold" />
                Sign In with GitHub
              </Button>
            )}
            <ThemeToggle/>
          </div>

          {/* Mobile - Botão de menu */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#0d1117] border-t border-gray-800">
              <a
                href="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <Code className="h-5 w-5 mr-2" />
                Hub
              </a>
              <a
                href="/habits"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <Flame className="h-5 w-5 mr-2" />
                Hábitos
              </a>
              <a
                href="/stats"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <Trophy className="h-5 w-5 mr-2" />
                Progresso
              </a>

              {isAuthenticated ? (
                <div className="pt-4 pb-2 border-t border-gray-800">
                  <div className="flex items-center px-3 py-2">
                    <div className="flex-shrink-0">
                      <Avatar
                        src={user?.avatar}
                        alt={user?.name}
                        fallback={
                          user?.name?.charAt(0) || <User className="h-5 w-5" />
                        }
                        className="h-9 w-9"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-white">
                        {user?.name}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-yellow-400 font-mono mr-2">
                          Lv.{userData.level}
                        </span>
                        <Progress
                          value={progressPercentage}
                          className="w-16 h-1.5"
                          indicatorClassName="bg-gradient-to-r from-blue-500 to-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  className="w-full mt-2 font-mono text-sm"
                  onClick={handleLogin}
                >
                  <Github className="h-4 w-4 mr-1" />
                  Login com GitHub
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
