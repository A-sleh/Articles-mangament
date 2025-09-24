import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type User = {
  gemail: string;
  password: string;
  image?: string | null;
};

export type IDBUser = {
  gemail?: string ;
  password?: string ;
};

export type AuthState = {
  user: User | null;
  dbUser: IDBUser;
};

export type AuthActions = {
  login: (body: User) => void;
  logout: () => void;
  updateDbUser: (body: IDBUser) => void;
  changeImage: (imageUrl: string | null) => void;
};

export type AuthStore = AuthState & AuthActions;

export const intialAuthState: AuthState = {
  user: null,
  dbUser: {
    gemail: "abdo@gmail.com",
    password: "12345678",
  },
};

function updateUserImage(
  newImageUrl: string | null,
  lastInfo: User | null
): User | null {
  if (!lastInfo) return lastInfo;
  return {
    ...lastInfo,
    image: newImageUrl,
  };
}


export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...intialAuthState,
      login: (body: User) => set({ user: body }),
      logout: () => set({ user: null }),
      updateDbUser: (body: IDBUser) =>
        set({
          user: {
            ...get().user,
            ...body,
          },
          dbUser: body,
        }),
      changeImage: (imageUrl: string | null) =>
        set({
          ...get(),
          user: updateUserImage(imageUrl, get().user),
        }),
    }),
    {
      name: "Auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
