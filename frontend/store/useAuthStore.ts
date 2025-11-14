import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = "http://localhost:8000";

interface User {
    email: string;
    first_name?: string;
    last_name?: string;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
    handleGoogleCallback: (code: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    checkAuth: async () => {
        const token = Cookies.get('auth-token');

        if (!token) {
            set({ user: null, isAuthenticated: false, isLoading: false });
            return;
        }

        try {
            const res = await axios.get(`${API_BASE}/auth/user/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            set({ user: res.data, isAuthenticated: true, isLoading: false });
        } catch (error) {
            console.error('Auth check failed:', error);
            Cookies.remove('auth-token');
            Cookies.remove('refresh-token');
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },

    logout: async () => {
        try {
            await axios.post(
                `${API_BASE}/auth/logout/`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth-token')}`,
                    },
                }
            );
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            Cookies.remove('auth-token');
            Cookies.remove('refresh-token');
            set({ user: null, isAuthenticated: false });
        }
    },

    handleGoogleCallback: async (code: string) => {
        try {
            // Send both code AND redirect_uri
            const res = await axios.post(
                `${API_BASE}/auth/google/`,
                {
                    code: code,
                    redirect_uri: `${window.location.origin}/auth/callback`  // ADD THIS
                },
                { withCredentials: true }
            );

            if (res.data.access_token) {
                Cookies.set('auth-token', res.data.access_token);
                if (res.data.refresh_token) {
                    Cookies.set('refresh-token', res.data.refresh_token);
                }
                await useAuthStore.getState().checkAuth();
            }
        } catch (error) {
            console.error('Google callback failed:', error);
            throw error;
        }
    },
}));