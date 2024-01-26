import { defineStore } from "pinia";

interface UserSettingsState {
  isAuthenticated: boolean;
}

export const useUserSettingsStore = defineStore({
  id: "UserSettings",
  state: (): UserSettingsState => {
    return {
      isAuthenticated: false,
    };
  },
  getters: {
    getAuthentication(): boolean {
      return this.isAuthenticated;
    },
  },
  actions: {
    setAuthentication(status: boolean): void {
      this.isAuthenticated = status;
    },
  },
});
