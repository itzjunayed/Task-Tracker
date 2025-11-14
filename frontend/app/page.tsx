"use client";
import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const { tasks, fetchTasks, addTask, toggleTask, deleteTask } = useTaskStore();
  const { user, isAuthenticated, isLoading, checkAuth, logout } = useAuthStore();
  const [title, setTitle] = useState("");
  const searchParams = useSearchParams();

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full mx-auto p-8 rounded-2xl shadow-lg bg-white">
          <h1 className="text-3xl font-bold mb-2 text-center">Task Tracker ✅</h1>
          <p className="text-gray-600 text-center mb-8">Sign in to manage your tasks</p>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
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
            <span className="font-semibold">Sign in with Google</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 rounded-2xl shadow-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task Tracker ✅</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add task..."
          className="flex-1 border rounded-l px-3 py-2 focus:outline-none"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul>
        {tasks.length === 0 ? (
          <li className="text-center text-gray-400 py-8">No tasks yet. Add one above!</li>
        ) : (
          tasks.map((t) => (
            <li key={t.id} className="flex justify-between items-center py-2 border-b">
              <span
                className={`cursor-pointer ${t.completed ? "line-through text-gray-400" : ""}`}
                onClick={() => toggleTask(t.id, t.completed)}
              >
                {t.title}
              </span>
              <button onClick={() => deleteTask(t.id)} className="text-red-500 hover:text-red-700">
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}