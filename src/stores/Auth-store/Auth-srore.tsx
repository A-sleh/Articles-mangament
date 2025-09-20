import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type User = {
  gemail: string;
  password: string;
  image?: string | null;
};

export type AuthState = {
  user: User | null;
};

export type AuthActions = {
  login: (body: User) => void;
  logout: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const intialAuthState: AuthState = {
  user: null,
};

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...intialAuthState,
      login: (body: User) => set({ user: body }),
      logout: () => set({ user: null }),
    }),
    {
      name: "Auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
