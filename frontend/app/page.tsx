"use client";
import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { useAuthStore } from "@/store/useAuthStore";
import Scene3D from "@/components/Scene3D";

// Particle component for animated background
function Particle({ delay }: { delay: number }) {
  return (
    <div
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${15 + Math.random() * 10}s`,
      }}
    />
  );
}

export default function Home() {
  const { tasks, fetchTasks, addTask, toggleTask, deleteTask } = useTaskStore();
  const { user, isAuthenticated, isLoading, checkAuth, logout } = useAuthStore();
  const [title, setTitle] = useState("");

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated, fetchTasks]);

  const handleAdd = async () => {
    if (title.trim()) {
      await addTask(title);
      setTitle("");
    }
  };

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/callback`;
    const scope = "openid email profile";

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

    window.location.href = googleAuthUrl;
  };

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-blue-900 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
          </div>
          <div className="text-lg font-medium text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        {/* 3D Background Scene */}
        <div className="absolute inset-0 z-0">
          <Scene3D />
        </div>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-between min-h-screen py-8 sm:py-12 px-4">
          {/* Title - Slides down from top */}
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-center text-white drop-shadow-2xl animate-slide-down px-4">
              Task Tracker
            </h1>
          </div>

          {/* Sign in button - At bottom */}
          <div className="w-full max-w-md animate-slide-up px-4">
            <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20">
              <p className="text-white/90 text-center mb-6 text-base sm:text-lg">
                Sign in to manage your tasks
              </p>

              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white rounded-xl px-6 py-3 sm:py-4 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:cursor-pointer"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-semibold text-gray-700 text-sm sm:text-base">Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slide-down {
            from {
              opacity: 0;
              transform: translateY(-100px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(100px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-slide-down {
            animation: slide-down 1s ease-out;
          }

          .animate-slide-up {
            animation: slide-up 1s ease-out 0.3s backwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.5} />
        ))}
      </div>

      <div className="relative z-10 h-screen flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header - Fixed */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Task Tracker
            </h1>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs sm:text-sm text-white/80 truncate max-w-[200px]">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="text-xs sm:text-sm bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg font-semibold whitespace-nowrap hover:cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Input Field - Fixed with animated background */}
        <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 overflow-hidden flex flex-col min-h-0">

          <div className="relative z-10 flex flex-col sm:flex-row gap-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="Add a new task..."
              className="text-white flex-1 border border-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-950 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-900 transition-all duration-200 shadow-md hover:shadow-lg font-semibold whitespace-nowrap hover:cursor-pointer"
            >
              Add Task
            </button>
          </div>

          <h2 className="text-base sm:text-lg font-semibold text-white mt-4 mb-4">
            Your Tasks ({tasks.length})
          </h2>

          <div className="flex-1 overflow-y-auto pr-2 -mr-2 custom-scrollbar">
            {tasks.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400 text-base sm:text-lg text-center px-4">
                  No tasks yet. Add one above!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between items-center p-3 sm:p-4 rounded-lg transition-all duration-200 group hover:shadow-md  hover:cursor-pointer bg-white/5"
                  >
                    <span
                      className={`cursor-pointer flex-1 text-sm sm:text-base ${t.completed
                        ? "line-through text-gray-400"
                        : "text-white hover:text-cyan-700"
                        } transition-colors duration-200 break-words pr-2`}
                      onClick={() => toggleTask(t.id, t.completed)}
                    >
                      {t.completed && "✓ "}
                      {t.title}
                    </span>
                    <button
                      onClick={() => deleteTask(t.id)}
                      className="text-gray-400 hover:text-red-500 opacity-100 group-hover:opacity-100 transition-all duration-200 ml-2 flex-shrink-0 hover:cursor-pointer"
                      aria-label="Delete task"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Particle animation */
        @keyframes float-up {
          0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(100px) scale(1);
            opacity: 0;
          }
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          animation: float-up linear infinite;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        /* Stripe animation for input section */
        @keyframes slide-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .stripe {
          position: absolute;
          width: 200%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
          animation: slide-right 3s linear infinite;
        }

        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f1f1;
        }
      `}</style>
    </div>
  );
}