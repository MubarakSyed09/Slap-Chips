const CHIP_FLAVORS = {
  salted: { id: 'salted', name: 'Classic Salted', cost: 0, color: '#f59e0b', highlight: '#fde68a', shadow: '#b45309' },
  flamin_hot: { id: 'flamin_hot', name: "Flamin' Hot Chili", cost: 400, color: '#ef4444', highlight: '#fca5a5', shadow: '#991b1b' },
  sour_cream: { id: 'sour_cream', name: 'Sour Cream & Onion', cost: 650, color: '#84cc16', highlight: '#d9f99d', shadow: '#4d7c0f' },
  neon_wasabi: { id: 'neon_wasabi', name: 'Neon Cyber Wasabi', cost: 900, color: '#06b6d4', highlight: '#a5f3fc', shadow: '#0e7490' },
  golden_truffle: { id: 'golden_truffle', name: 'Luxe Golden Truffle', cost: 1500, color: '#eab308', highlight: '#fef08a', shadow: '#854d0e' }
};

/**
 * StorageManager - LocalStorage persistence for Slap Chips
 * Handles profile stats, points (never reduced on defeat), 6 Anime characters, and match history.
 */
class StorageManager {
  constructor() {
    this.STORAGE_KEYS = {
      PROFILE: 'slapchips_profile',
      LAST_MATCH: 'slapchips_last_match',
      MATCH_HISTORY: 'slapchips_history',
      SETTINGS: 'slapchips_settings',
      DAILY_SPIN: 'slapchips_daily_spin'
    };
    this._initDefaults();
  }

  _initDefaults() {
    let profile = this.getProfile();
    const animeRoster = ['sap1kaa', 'kenji', 'aoi', 'ren', 'sakura', 'shinji'];
    if (!profile) {
      profile = {
        username: 'Player 1',
        points: 4640, // Matching 4,640 from reference image
        gems: 150,    // Matching 150 from reference image
        cash: 4640,
        wins: 0,
        losses: 0,
        currentStreak: 0,
        bestStreak: 0,
        slapsLanded: 0,
        safeChipsEaten: 0,
        equippedCharacter: 'sap1kaa',
        unlockedCharacters: animeRoster,
        equippedFlavor: 'salted',
        unlockedFlavors: ['salted']
      };
      this.saveProfile(profile);
    } else {
      let changed = false;
      if (!profile.username) {
        profile.username = 'Player 1';
        changed = true;
      }
      if (profile.points === undefined) {
        profile.points = profile.cash || 4640;
        changed = true;
      }
      if (profile.gems === undefined) {
        profile.gems = 150;
        changed = true;
      }
      if (!profile.unlockedCharacters || !profile.unlockedCharacters.includes('sap1kaa')) {
        profile.unlockedCharacters = animeRoster;
        changed = true;
      }
      if (!animeRoster.includes(profile.equippedCharacter)) {
        profile.equippedCharacter = 'sap1kaa';
        changed = true;
      }
      if (!profile.unlockedFlavors) {
        profile.unlockedFlavors = ['salted'];
        changed = true;
      }
      if (!profile.equippedFlavor) {
        profile.equippedFlavor = 'salted';
        changed = true;
      }
      if (changed) this.saveProfile(profile);
    }

    if (!this.getMatchHistory()) {
      this.saveMatchHistory([]);
    }
  }

  getProfile() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Failed reading profile from localStorage', e);
      return null;
    }
  }

  saveProfile(profile) {
    try {
      localStorage.setItem(this.STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed saving profile to localStorage', e);
    }
  }

  updateProfile(updates) {
    const profile = this.getProfile() || {};
    const updated = { ...profile, ...updates };
    this.saveProfile(updated);
    return updated;
  }

  /**
   * Increase points on victory.
   * Requirement: When user wins increase points, when loses nothing goes!
   */
  addPoints(amount) {
    if (!amount || amount <= 0) return (this.getProfile() || {}).points || 0;
    const profile = this.getProfile() || {};
    profile.points = (profile.points || 0) + amount;
    profile.cash = profile.points;
    this.saveProfile(profile);
    return profile.points;
  }

  addGems(amount) {
    if (!amount || amount <= 0) return (this.getProfile() || {}).gems || 0;
    const profile = this.getProfile() || {};
    profile.gems = (profile.gems || 0) + amount;
    this.saveProfile(profile);
    return profile.gems;
  }

  getLastDailySpin() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.DAILY_SPIN);
      return data ? Number(data) : 0;
    } catch (e) {
      return 0;
    }
  }

  canDailySpin() {
    const last = this.getLastDailySpin();
    if (!last) return true;
    const elapsed = Date.now() - last;
    return elapsed >= 24 * 60 * 60 * 1000; // 24 hours
  }

  getDailySpinCooldown() {
    const last = this.getLastDailySpin();
    if (!last) return 0;
    const elapsed = Date.now() - last;
    const remaining = 24 * 60 * 60 * 1000 - elapsed;
    return Math.max(0, remaining);
  }

  recordDailySpin() {
    try {
      localStorage.setItem(this.STORAGE_KEYS.DAILY_SPIN, Date.now().toString());
    } catch (e) {
      console.warn('Failed saving daily spin timestamp', e);
    }
  }

  setUsername(newUsername) {
    if (!newUsername || !newUsername.trim()) return;
    return this.updateProfile({ username: newUsername.trim() });
  }

  getLastMatch() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.LAST_MATCH);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Failed reading last match from localStorage', e);
      return null;
    }
  }

  saveLastMatch(matchData) {
    try {
      const formatted = {
        lastPlayed: matchData.lastPlayed || new Date().toISOString(),
        result: matchData.result || 'Victory',
        playerCharacter: matchData.playerCharacter || 'sap1kaa',
        opponent: matchData.opponent || 'Robo-Chip 3000',
        cashEarned: matchData.cashEarned !== undefined ? matchData.cashEarned : 0,
        pointsEarned: matchData.pointsEarned !== undefined ? matchData.pointsEarned : (matchData.result === 'Victory' ? 300 : 0),
        heartsLeft: matchData.heartsLeft !== undefined ? matchData.heartsLeft : 0,
        turnsTaken: matchData.turnsTaken !== undefined ? matchData.turnsTaken : 0,
        slapsLanded: matchData.slapsLanded || 0,
        safeChipsEaten: matchData.safeChipsEaten || 0
      };
      localStorage.setItem(this.STORAGE_KEYS.LAST_MATCH, JSON.stringify(formatted));
      this.addMatchToHistory(formatted);
      return formatted;
    } catch (e) {
      console.warn('Failed saving last match to localStorage', e);
      return null;
    }
  }

  getMatchHistory() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.MATCH_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Failed reading match history from localStorage', e);
      return [];
    }
  }

  saveMatchHistory(history) {
    try {
      localStorage.setItem(this.STORAGE_KEYS.MATCH_HISTORY, JSON.stringify(history.slice(0, 50)));
    } catch (e) {
      console.warn('Failed saving match history to localStorage', e);
    }
  }

  addMatchToHistory(match) {
    const history = this.getMatchHistory();
    history.unshift(match);
    this.saveMatchHistory(history);
  }

  getSettings() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : { soundMuted: false };
    } catch (e) {
      return { soundMuted: false };
    }
  }

  saveSettings(settings) {
    try {
      localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed saving settings to localStorage', e);
    }
  }

  resetAll() {
    localStorage.removeItem(this.STORAGE_KEYS.PROFILE);
    localStorage.removeItem(this.STORAGE_KEYS.LAST_MATCH);
    localStorage.removeItem(this.STORAGE_KEYS.MATCH_HISTORY);
    this._initDefaults();
  }
}

// Global storage singleton
if (typeof window !== 'undefined') {
  window.gameStorage = new StorageManager();
  window.CHIP_FLAVORS = CHIP_FLAVORS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StorageManager, CHIP_FLAVORS };
}
