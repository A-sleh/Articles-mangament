import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUser, useDbUsers } from "../db-users-store/db-users-store";

// ========== Types ==========

export type ICredential = {
  email: string;
  password: string;
};

export type IUserAuth = IUser & {
  userName: string;
};

export type AuthState = {
  user: IUserAuth | null;
};

export type AuthActions = {
  login: (body: ICredential) => void;
  logout: () => void;
  signup: (body: IUser) => void;
  changeImage: (imageUrl: string | null) => void;
  updateUserName: (userName: string) => void;
  updateUserCredential: (body: ICredential) => void;
};

export type AuthStore = AuthState & AuthActions;

// ========== Initial State ==========

const initialAuthState: AuthState = {
  user: null,
};

// ========== Helpers ==========

function withUserName(user: IUser): IUserAuth {
  return {
    ...user,
    userName: `${user.firstName} ${user.lastName}`,
  };
}

function updateUserImage(
  newImageUrl: string | null,
  currentUser: IUserAuth | null
): IUserAuth | null {
  return currentUser ? { ...currentUser, image: newImageUrl } : null;
}

// ========== Zustand Store ==========

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialAuthState,

      login: (credential) => {
        const dbUsersStore = useDbUsers.getState();
        const user = dbUsersStore.userIsExisit(
          credential.email,
          credential.password
        );

        if (!user) {
          throw new Error("User does not exist.");
        }

        set({ user: withUserName(user) });
      },

      logout: () => set({ user: null }),

      updateUserCredential: (body) => {
        const dbUsersStore = useDbUsers.getState();
        const currentUser = get().user;

        if (!currentUser) return;

        dbUsersStore.updateUserCreadential(body, currentUser.id);
        set({ user: { ...currentUser, ...body } });
      },

      updateUserName: (newName) =>
        set((state) =>
          state.user ? { user: { ...state.user, userName: newName } } : state
        ),

      signup: (body) => {
        const dbUsersStore = useDbUsers.getState();

        try {
          dbUsersStore.addUser(body);
          set({ user: withUserName(body) });
        } catch (error: any) {
          throw new Error(error.message || "Signup failed");
        }
      },

      changeImage: (imageUrl) =>
        set((state) => ({ user: updateUserImage(imageUrl, state.user) })),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
