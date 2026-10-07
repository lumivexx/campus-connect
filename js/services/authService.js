/**
 * Auth & Parent / Student Profile Service
 * Manages parent accounts (Ravi Kumar), child switching (Ananya vs Mitra),
 * categorized shortlists, and institutional role switching.
 */

import { mockStudents } from '../data/mockStudents.js';
import { api } from './api.js';

export const authService = {
  getCurrentUser() {
    let user = api.getStorage("currentUser");
    if (!user) {
      user = { ...mockStudents[0], role: "parent" };
      api.setStorage("currentUser", user);
    }
    return user;
  },

  async login(email, password) {
    await api.delay(200);
    if (!email || !password) {
      throw new Error("Please enter both email and password.");
    }

    let user = this.getCurrentUser();
    user.email = email;
    api.setStorage("currentUser", user);
    api.setStorage("isAuthenticated", true);
    return user;
  },

  async signup(signupData) {
    await api.delay(250);
    const { name, email, password, childName, classLevel, preferredCourse, location } = signupData;

    if (!name || !email || !password) {
      throw new Error("Please provide your name, email, and password.");
    }

    const newUser = {
      ...mockStudents[0],
      id: "parent-" + Date.now(),
      parentName: name,
      name: name,
      email: email,
      childName: childName || "Ananya Kumar",
      classLevel: classLevel || "Class 12 Completed",
      preferredCourse: preferredCourse || "B.E. Computer Science and Engineering",
      preferredLocation: location || "Tamil Nadu",
      role: "parent",
      needsOnboarding: true
    };

    api.setStorage("currentUser", newUser);
    api.setStorage("isAuthenticated", true);
    return newUser;
  },

  async switchChild(childId) {
    await api.delay(100);
    let user = this.getCurrentUser();
    const targetChild = (user.children || []).find(c => c.id === childId);
    if (!targetChild) return user;

    user.activeChildId = targetChild.id;
    user.childName = targetChild.name;
    user.classLevel = targetChild.classLevel;
    user.board = targetChild.board;
    user.stream = targetChild.stream;
    user.marks = { ...targetChild.marks };
    user.preferredCourse = targetChild.preferredCourse;
    user.preferredLocation = targetChild.preferredLocation;
    user.preferredCities = [...targetChild.preferredCities];
    user.budget = { ...targetChild.budget };
    user.hostelRequired = targetChild.hostelRequired;

    api.setStorage("currentUser", user);
    return user;
  },

  async updateShortlistCategory(collegeId, category) {
    await api.delay(80);
    let user = this.getCurrentUser();
    if (!user.shortlistCategories) {
      user.shortlistCategories = { best_fit: [], good_options: [], backup_options: [] };
    }

    // Remove from all categories first
    Object.keys(user.shortlistCategories).forEach(cat => {
      user.shortlistCategories[cat] = user.shortlistCategories[cat].filter(id => id !== collegeId);
    });

    // Add to target category
    if (user.shortlistCategories[category]) {
      user.shortlistCategories[category].push(collegeId);
    }

    api.setStorage("currentUser", user);
    return user;
  },

  async completeOnboarding(onboardingData) {
    await api.delay(200);
    let user = this.getCurrentUser();

    user.childName = onboardingData.childName || user.childName;
    user.marks = {
      ...user.marks,
      percentage: parseFloat(onboardingData.percentage) || user.marks.percentage,
      tneaEquivalentCutoff: parseFloat(onboardingData.cutoff) || user.marks.tneaEquivalentCutoff
    };
    user.preferredCourse = onboardingData.preferredCourse || user.preferredCourse;
    user.preferredLocation = onboardingData.preferredLocation || user.preferredLocation;
    user.budget = {
      ...user.budget,
      tier: onboardingData.budgetTier || user.budget.tier,
      maxAnnualFee: parseInt(onboardingData.maxAnnualFee) || user.budget.maxAnnualFee
    };
    user.hostelRequired = onboardingData.hostelRequired !== undefined ? onboardingData.hostelRequired : true;
    user.needsOnboarding = false;

    api.setStorage("currentUser", user);
    return user;
  },

  async updateProfile(updates) {
    await api.delay(150);
    let user = this.getCurrentUser();
    user = { ...user, ...updates };
    api.setStorage("currentUser", user);
    return user;
  },

  switchRole(targetRole = "college_admin") {
    let user = this.getCurrentUser();
    user.role = targetRole;
    api.setStorage("currentUser", user);
    return user;
  },

  logout() {
    api.setStorage("isAuthenticated", false);
  },

  isAuthenticated() {
    return api.getStorage("isAuthenticated", true);
  }
};
