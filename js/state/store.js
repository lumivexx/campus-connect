/**
 * Centralized Reactive State Store
 * Implements observer/subscriber pattern for instant, seamless state sync
 * across all navigation, cards, badges, and views.
 */

import { authService } from '../services/authService.js';
import { notificationService } from '../services/notificationService.js';
import { api } from '../services/api.js';

class Store {
  constructor() {
    this.subscribers = [];
    
    // Initial state loaded from storage or defaults
    const user = authService.getCurrentUser();
    const savedColleges = api.getStorage("savedColleges", user.savedColleges || ["skcet", "ssn", "kct"]);
    const followedColleges = api.getStorage("followedColleges", user.followedColleges || ["skcet", "psg-tech"]);
    const compareColleges = api.getStorage("compareColleges", ["skcet", "rec"]);

    this.state = {
      currentRoute: "landing", // default start at landing, or user can click anywhere
      routeParams: {},
      currentUser: user,
      savedCollegeIds: new Set(savedColleges),
      followedCollegeIds: new Set(followedColleges),
      compareCollegeIds: compareColleges,
      unreadNotifs: notificationService.getUnreadCount(),
      globalSearchQuery: "",
      aiRecommendations: api.getStorage("aiRecommendations", null),
      aiChatMessages: api.getStorage("aiChatMessages", []),
      activeCollegeId: null,
      activeEventId: null,
      toast: null
    };
  }

  getState() {
    return this.state;
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify(eventKey = null) {
    for (const callback of this.subscribers) {
      try {
        callback(this.state, eventKey);
      } catch (err) {
        console.error("Store notification error:", err);
      }
    }
  }

  navigate(route, params = {}) {
    this.state.currentRoute = route;
    this.state.routeParams = params;
    window.location.hash = route;
    this.notify("navigation");
  }

  setRoute(route, params = {}) {
    this.state.currentRoute = route;
    this.state.routeParams = params;
    this.notify("navigation");
  }

  toggleSaveCollege(collegeId) {
    const set = this.state.savedCollegeIds;
    let saved = false;
    if (set.has(collegeId)) {
      set.delete(collegeId);
      saved = false;
    } else {
      set.add(collegeId);
      saved = true;
    }
    const arr = Array.from(set);
    api.setStorage("savedColleges", arr);
    this.notify("savedColleges");
    return saved;
  }

  isCollegeSaved(collegeId) {
    return this.state.savedCollegeIds.has(collegeId);
  }

  toggleFollowCollege(collegeId) {
    const set = this.state.followedCollegeIds;
    let followed = false;
    if (set.has(collegeId)) {
      set.delete(collegeId);
      followed = false;
    } else {
      set.add(collegeId);
      followed = true;
    }
    const arr = Array.from(set);
    api.setStorage("followedColleges", arr);
    this.notify("followedColleges");
    return followed;
  }

  isCollegeFollowed(collegeId) {
    return this.state.followedCollegeIds.has(collegeId);
  }

  addToCompare(collegeId) {
    let list = [...this.state.compareCollegeIds];
    if (list.includes(collegeId)) {
      return { success: true, message: "College already in comparison list" };
    }
    if (list.length >= 3) {
      return { success: false, message: "Maximum 3 colleges can be compared at once. Please remove one." };
    }
    list.push(collegeId);
    this.state.compareCollegeIds = list;
    api.setStorage("compareColleges", list);
    this.notify("compareColleges");
    return { success: true, message: "Added to comparison list!" };
  }

  removeFromCompare(collegeId) {
    let list = this.state.compareCollegeIds.filter(id => id !== collegeId);
    this.state.compareCollegeIds = list;
    api.setStorage("compareColleges", list);
    this.notify("compareColleges");
  }

  isInCompare(collegeId) {
    return this.state.compareCollegeIds.includes(collegeId);
  }

  setAIRecommendations(recommendations) {
    this.state.aiRecommendations = recommendations;
    api.setStorage("aiRecommendations", recommendations);
    this.notify("aiRecommendations");
  }

  setAIChatMessages(messages) {
    this.state.aiChatMessages = messages;
    api.setStorage("aiChatMessages", messages);
    this.notify("aiChat");
  }

  updateCurrentUser(user) {
    this.state.currentUser = user;
    this.notify("currentUser");
  }

  updateUnreadNotifs(count) {
    this.state.unreadNotifs = count;
    this.notify("notifications");
  }

  showToast(message, type = "info") {
    this.state.toast = { message, type, id: Date.now() };
    this.notify("toast");
  }
}

export const store = new Store();
