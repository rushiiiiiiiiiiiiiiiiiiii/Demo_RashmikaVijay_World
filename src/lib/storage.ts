// Local storage utilities for managing app state

interface UserProfile {
  name: string;
  pin: string;
  theme: 'light' | 'dark';
  setupComplete: boolean;
}

interface AppState {
  favorites: string[];
  unlockedMessages: string[];
  lastVisit: string;
  moodHistory: Array<{ mood: string; date: string }>;
}

export const storage = {
  // User Profile
  getUserProfile(): UserProfile | null {
    const profile = localStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
  },

  setUserProfile(profile: UserProfile): void {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  },

  updateUserProfile(updates: Partial<UserProfile>): void {
    const profile = this.getUserProfile();
    if (profile) {
      this.setUserProfile({ ...profile, ...updates });
    }
  },

  // ✔ NEW — get PIN directly
  getPin(): string | null {
    return this.getUserProfile()?.pin || null;
  },

  // ✔ NEW — update PIN safely
  setPin(pin: string): void {
    this.updateUserProfile({ pin });
  },

  // App State
  getAppState(): AppState {
    const state = localStorage.getItem('appState');
    return state ? JSON.parse(state) : {
      favorites: [],
      unlockedMessages: [],
      lastVisit: new Date().toISOString(),
      moodHistory: [],
    };
  },

  setAppState(state: AppState): void {
    localStorage.setItem('appState', JSON.stringify(state));
  },

  // Favorites
  addFavorite(id: string): void {
    const state = this.getAppState();
    if (!state.favorites.includes(id)) {
      state.favorites.push(id);
      this.setAppState(state);
    }
  },

  removeFavorite(id: string): void {
    const state = this.getAppState();
    state.favorites = state.favorites.filter(f => f !== id);
    this.setAppState(state);
  },

  isFavorite(id: string): boolean {
    const state = this.getAppState();
    return state.favorites.includes(id);
  },

  // Unlocked Messages
  unlockMessage(id: string): void {
    const state = this.getAppState();
    if (!state.unlockedMessages.includes(id)) {
      state.unlockedMessages.push(id);
      this.setAppState(state);
    }
  },

  isMessageUnlocked(id: string): boolean {
    const state = this.getAppState();
    return state.unlockedMessages.includes(id);
  },

  // Mood History
  addMoodEntry(mood: string): void {
    const state = this.getAppState();
    state.moodHistory.push({
      mood,
      date: new Date().toISOString(),
    });
    this.setAppState(state);
  },

  // Theme
  getTheme(): 'light' | 'dark' {
    const profile = this.getUserProfile();
    return profile?.theme || 'light';
  },

  setTheme(theme: 'light' | 'dark'): void {
    this.updateUserProfile({ theme });
    document.documentElement.classList.toggle('dark', theme === 'dark');
  },

  // Setup Complete
  isSetupComplete(): boolean {
    const profile = this.getUserProfile();
    return profile?.setupComplete || false;
  },

  // Verify PIN
  verifyPin(pin: string): boolean {
    const profile = this.getUserProfile();
    return profile?.pin === pin;
  },

  // Clear all
  clearAll(): void {
    localStorage.clear();
  },
};
