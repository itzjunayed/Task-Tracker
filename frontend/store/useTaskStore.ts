import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/tasks/";

interface Task {
    id: number;
    title: string;
    completed: boolean;
    created_at: string;
}

interface TaskStore {
    tasks: Task[];
    fetchTasks: () => Promise<void>;
    addTask: (title: string) => Promise<void>;
    toggleTask: (id: number, currentState: boolean) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
}

// Create axios instance with interceptor for auth token
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = Cookies.get('auth-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const useTaskStore = create<TaskStore>((set, get) => ({
    tasks: [],

    fetchTasks: async () => {
        try {
            const res = await api.get('');
            set({ tasks: res.data });
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            set({ tasks: [] });
        }
    },

    addTask: async (title) => {
        try {
            const res = await api.post('', { title });
            set({ tasks: [res.data, ...get().tasks] });
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    },

    toggleTask: async (id, currentState) => {
        try {
            const res = await api.patch(`${id}/`, { completed: !currentState });
            set({
                tasks: get().tasks.map((t) => (t.id === id ? res.data : t)),
            });
        } catch (error) {
            console.error('Failed to toggle task:', error);
        }
    },

    deleteTask: async (id) => {
        try {
            await api.delete(`${id}/`);
            set({ tasks: get().tasks.filter((t) => t.id !== id) });
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    },
}));