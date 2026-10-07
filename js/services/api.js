/**
 * Base API Client & Mock Persistence Layer
 * Simulates network latency, handles local storage syncing, and maintains
 * strict API contracts ready for future FastAPI / Node.js backend integration.
 */

const STORAGE_KEY_PREFIX = "campus_connect_ai_";

export const api = {
  // Simulate network delay for realistic loading UX
  async delay(ms = 250) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  getStorage(key, fallback = null) {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn("Storage read error:", e);
      return fallback;
    }
  },

  setStorage(key, value) {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn("Storage write error:", e);
    }
  },

  removeStorage(key) {
    try {
      localStorage.removeItem(STORAGE_KEY_PREFIX + key);
    } catch (e) {
      console.warn("Storage remove error:", e);
    }
  }
};
