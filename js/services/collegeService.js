/**
 * College Service
 * Implements college search, multi-faceted filtering, sorting, and profile retrieval.
 */

import { mockColleges } from '../data/mockColleges.js';
import { mockCourses } from '../data/mockCourses.js';
import { mockCutoffs } from '../data/mockCutoffs.js';
import { api } from './api.js';

export const collegeService = {
  async getColleges(filters = {}, sort = "recommended", page = 1, pageSize = 8) {
    await api.delay(200);
    let list = [...mockColleges];

    // Search query filter (name, city, course, tags)
    if (filters.query && filters.query.trim() !== "") {
      const q = filters.query.toLowerCase().trim();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.popularCourses.some(pc => pc.toLowerCase().includes(q))
      );
    }

    // Filter by Course
    if (filters.course && filters.course !== "all") {
      const courseFilter = filters.course.toLowerCase();
      list = list.filter(c =>
        c.popularCourses.some(pc => pc.toLowerCase().includes(courseFilter))
      );
    }

    // Filter by Location / City
    if (filters.city && filters.city !== "all") {
      const cityFilter = filters.city.toLowerCase();
      list = list.filter(c => c.city.toLowerCase().includes(cityFilter));
    }

    // Filter by Max Fee
    if (filters.maxFee && Number(filters.maxFee) > 0) {
      list = list.filter(c => c.feeRange.min <= Number(filters.maxFee));
    }

    // Filter by College Type
    if (filters.type && filters.type !== "all") {
      list = list.filter(c => c.type.toLowerCase().includes(filters.type.toLowerCase()));
    }

    // Filter by Hostel
    if (filters.hostelRequired) {
      list = list.filter(c => c.hostelAvailable === true);
    }

    // Filter by Rating
    if (filters.minRating && Number(filters.minRating) > 0) {
      list = list.filter(c => c.rating >= Number(filters.minRating));
    }

    // Sort options
    if (sort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sort === "fee-low") {
      list.sort((a, b) => a.feeRange.min - b.feeRange.min);
    } else if (sort === "fee-high") {
      list.sort((a, b) => b.feeRange.max - a.feeRange.max);
    } else if (sort === "nirf") {
      list.sort((a, b) => a.nirfRank - b.nirfRank);
    } else {
      // "recommended" default
      list.sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0) || b.rating - a.rating);
    }

    const total = list.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedItems = list.slice(0, startIndex + pageSize);

    return {
      items: paginatedItems,
      total,
      hasMore: startIndex + pageSize < total
    };
  },

  async getCollegeById(id) {
    await api.delay(150);
    const college = mockColleges.find(c => c.id === id);
    if (!college) return null;

    const courses = mockCourses.filter(cr => cr.collegeId === id);
    const cutoffs = mockCutoffs.filter(cu => cu.collegeId === id);

    return {
      ...college,
      courses,
      cutoffs
    };
  },

  async getAllCourses() {
    await api.delay(100);
    return mockCourses;
  },

  async getCoursesByCollege(collegeId) {
    await api.delay(100);
    return mockCourses.filter(cr => cr.collegeId === collegeId);
  },

  async getCutoffsByCollege(collegeId) {
    await api.delay(100);
    return mockCutoffs.filter(cu => cu.collegeId === collegeId);
  }
};
