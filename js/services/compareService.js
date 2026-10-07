/**
 * College Comparison Service
 * Compares up to 3 colleges across academics, cutoffs, fees, placements, and facilities.
 */

import { mockColleges } from '../data/mockColleges.js';
import { mockCourses } from '../data/mockCourses.js';
import { mockCutoffs } from '../data/mockCutoffs.js';
import { api } from './api.js';

export const compareService = {
  async compareColleges(collegeIds = []) {
    await api.delay(150);
    const selected = collegeIds.slice(0, 3).map(id => {
      const col = mockColleges.find(c => c.id === id);
      if (!col) return null;

      const courses = mockCourses.filter(cr => cr.collegeId === id);
      const cutoffs = mockCutoffs.filter(cu => cu.collegeId === id);

      return {
        ...col,
        courses,
        cutoffs
      };
    }).filter(Boolean);

    return selected;
  },

  getComparisonMetrics() {
    return [
      { key: "type", label: "Institution Type" },
      { key: "nirfRank", label: "NIRF Rank (Engg)" },
      { key: "naacGrade", label: "NAAC Accreditation" },
      { key: "tneaCode", label: "TNEA Counselling Code" },
      { key: "historicalCutoff", label: "2025 CSE Cutoff (OC)" },
      { key: "fees", label: "Annual Tuition Fee Range" },
      { key: "hostel", label: "Hostel Facility & Fee" },
      { key: "placementsAvg", label: "Average CTC Package" },
      { key: "placementsHigh", label: "Highest CTC Package" },
      { key: "placementRate", label: "Placement Percentage" },
      { key: "topRecruiters", label: "Key Corporate Recruiters" },
      { key: "campusSize", label: "Campus Infrastructure" },
      { key: "scholarshipsCount", label: "Scholarship Support" },
      { key: "admissionLink", label: "Official Portal" }
    ];
  }
};
