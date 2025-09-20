import { create } from "zustand";
import { persist ,createJSONStorage } from "zustand/middleware";

type navSettings = {
  isDarkMod: boolean;
  lang: "en" | "ar";
  openSidebar: boolean;
};

type navSettingsActions = {
  toggleTheme: (lastState: boolean) => void;
  changeLang: (lang: "ar" | "en") => void;
  toggleSidebarViwe: (lastState: boolean) => void;
};

export type navSettingsStore = navSettings & navSettingsActions;

const intialNavSettings: navSettings = {
  isDarkMod: false,
  lang: "ar",
  openSidebar: true,
};

export const useNavSetting = create<navSettingsStore>()(
  persist(
    (set, get) => ({
      ...intialNavSettings,
      toggleSidebarViwe: () =>
        set({ ...get(), openSidebar: !get().openSidebar }),
      toggleTheme: () => set({ ...get(), isDarkMod: !get().isDarkMod }),
      changeLang: (lang: "en" | "ar") => set({ ...get(), lang: lang }),
    }),
    {
      name: "nav-settings",
      storage: createJSONStorage(() => localStorage) 
    }
  )
);
