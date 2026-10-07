/**
 * College Decision Assistant & Recommendation Service
 * Responsible, Explainable AI Guidance Engine for Families.
 * 
 * IMPORTANT: In accordance with Responsible AI principles, recommendations
 * explicitly distinguish historical benchmark data from current admissions,
 * and emphasize that guidance is non-guaranteed decision support.
 */

import { mockColleges } from '../data/mockColleges.js';
import { api } from './api.js';

export const aiService = {
  // Quick questions designed for parents (Section 17)
  parentQuickQuestions: [
    { id: "marks", label: "Which colleges fit my child's marks?", prompt: "Which colleges fit my child's marks?" },
    { id: "affordable", label: "Which option is more affordable?", prompt: "Which option is more affordable?" },
    { id: "hostel_safety", label: "Which college is safer for hostel?", prompt: "Which college is safer for hostel?" },
    { id: "compare", label: "Compare SKCET and REC", prompt: "Compare SKCET and REC" },
    { id: "verify_before_applying", label: "What should parents verify before applying?", prompt: "What should parents verify before applying?" },
    { id: "backups", label: "Which colleges should we keep as backups?", prompt: "Which colleges should we keep as backups?" }
  ],

  // Conversational workflow steps tailored for parents
  conversationSteps: [
    {
      step: 1,
      id: "course",
      question: "Which course or engineering branch is your child looking to pursue?",
      placeholder: "e.g., B.E. Computer Science, AI & Data Science",
      presets: [
        "B.E. Computer Science and Engineering",
        "B.Tech Artificial Intelligence and Data Science",
        "B.Tech Information Technology",
        "B.E. Electronics and Communication"
      ]
    },
    {
      step: 2,
      id: "score",
      question: "What is your child's Class 12 percentage or approximate TNEA Cutoff score?",
      placeholder: "e.g., 88% or 176 / 200",
      presets: [
        "88% (TNEA Cutoff ~176.0)",
        "92% (TNEA Cutoff ~184.0)",
        "95% (TNEA Cutoff ~190.0)",
        "82% (TNEA Cutoff ~164.0)"
      ]
    },
    {
      step: 3,
      id: "location",
      question: "Which campus location or city does your family prefer?",
      placeholder: "e.g., Tamil Nadu (Coimbatore / Chennai)",
      presets: [
        "Tamil Nadu (Coimbatore / Chennai)",
        "Coimbatore region",
        "Chennai region",
        "Madurai / Central TN"
      ]
    },
    {
      step: 4,
      id: "budget",
      question: "What is your family's approximate annual budget preference for tuition & living?",
      placeholder: "e.g., Moderate (₹1.5L - ₹2.0L / year)",
      presets: [
        "Moderate (₹1.5L - ₹2.0L / year)",
        "Budget-Friendly (< ₹1.5L / year)",
        "Flexible (Up to ₹2.5L / year)",
        "High / No budget constraint (> ₹2.5L)"
      ]
    },
    {
      step: 5,
      id: "preferences",
      question: "What are your top priorities as a parent? (e.g., Safe hostel, high placement rate, NIRF rank)",
      placeholder: "e.g., Safe on-campus hostel and strong campus placements",
      presets: [
        "Safe on-campus hostel and strong campus placements",
        "High placement track record with Zoho & Microsoft",
        "Autonomous institution with NAAC A++ / A",
        "Merit scholarship availability for 88% score"
      ]
    }
  ],

  /**
   * Generates parent-focused recommendations based on student preferences
   */
  async generateRecommendations(criteria = {}) {
    await api.delay(500);

    const parsedScore = parseFloat(criteria.score) || 88;
    const coursePreference = criteria.course || "B.E. Computer Science and Engineering";
    const budgetPreference = criteria.budget || "Moderate";
    const locationPreference = criteria.location || "Tamil Nadu";

    const recommendations = [
      {
        collegeId: "skcet",
        matchCategory: "BEST FIT",
        admissionReadiness: "HIGH FIT",
        readinessSummary: "Your child's profile is strongly aligned with recent historical cutoff data.",
        matchPercentage: 94,
        badgeColor: "success",
        headline: "Matches Ananya's course (CSE) + preferred region (Coimbatore) + moderate budget",
        courseRecommended: "B.E. Computer Science / B.Tech AI & Data Science",
        fitSummary: "With Ananya's 88% (TNEA Cutoff ~176), SKCET's AI&DS (180.0) and IT (178.5) offer exceptionally high historical admission probability, with CSE (182.5) accessible in later counselling rounds.",
        reasons: [
          "Strong Academic Fit: Class 12 aggregate aligns closely with recent DoTE counselling benchmarks.",
          "Fee Compatibility: Annual tuition of ₹1.75L - 1.95L is within your family's moderate budget range.",
          "Hostel Availability: Separate safe boys & girls hostels with 24/7 security and Wi-Fi on campus.",
          "Career Record: 93% placement rate with marquee recruiters like Zoho, Virtusa, and Amazon."
        ],
        matchDimensions: {
          academicFit: "Strong",
          courseFit: "Excellent",
          location: "Excellent",
          budget: "Good",
          hostel: "Available"
        },
        parentChecklist: [
          { item: "Course available", checked: true },
          { item: "Historical cutoff reviewed", checked: true },
          { item: "Fee range reviewed", checked: true },
          { item: "Location & safety reviewed", checked: true },
          { item: "Hostel reviewed", checked: true }
        ],
        academicProfileFit: "88% Score vs 179.5 BC / 182.5 OC Historical Cutoff",
        feeEstimate: "₹1.75 - 1.95 L / year (Moderate)",
        hostelEstimate: "₹82,000 / year (AC / Non-AC Available)",
        dataSource: "DoTE Tamil Nadu TNEA 2025 Round 1 & Round 2 Official Allotments",
        dataAuditDate: "August 2025",
        explainability: {
          academicWeight: 40,
          academicScore: 92,
          courseWeight: 25,
          courseScore: 98,
          locationWeight: 20,
          locationScore: 95,
          budgetWeight: 15,
          budgetScore: 90,
          totalScore: 94
        }
      },
      {
        collegeId: "rec",
        matchCategory: "GOOD FIT",
        admissionReadiness: "GOOD FIT",
        readinessSummary: "Your child's profile is reasonably aligned with recent historical cutoff data.",
        matchPercentage: 88,
        badgeColor: "primary",
        headline: "Strong academic option in Chennai with TCS industry-partnered curriculum",
        courseRecommended: "B.E. Computer Science / B.Tech CSBS",
        fitSummary: "Historically, students with 87% - 89% score have 90%+ allotment rate for REC CSBS and IT, and competitive entry for core CSE.",
        reasons: [
          "High Placement Density: 90% placement rate with active IT and tech consulting recruiters.",
          "Curriculum Industry Tie-up: B.Tech CSBS program designed in direct collaboration with TCS.",
          "Moderate Tuition: ₹1.65L - 1.95L / year matching family's budget.",
          "Transport & Hostels: Fleet of 85+ college buses connecting Chennai plus on-campus hostels."
        ],
        matchDimensions: {
          academicFit: "Strong",
          courseFit: "Excellent",
          location: "Good",
          budget: "Good",
          hostel: "Available"
        },
        parentChecklist: [
          { item: "Course available", checked: true },
          { item: "Historical cutoff reviewed", checked: true },
          { item: "Fee range reviewed", checked: true },
          { item: "Location & safety reviewed", checked: true },
          { item: "Hostel reviewed", checked: true }
        ],
        academicProfileFit: "88% Score vs 183.0 OC / 179.5 CSBS Historical Cutoff",
        feeEstimate: "₹1.65 - 1.95 L / year (Moderate)",
        hostelEstimate: "₹85,000 / year",
        dataSource: "TNEA 2025 Archive & DoTE Counselling Data",
        dataAuditDate: "August 2025",
        explainability: {
          academicWeight: 40,
          academicScore: 88,
          courseWeight: 25,
          courseScore: 92,
          locationWeight: 20,
          locationScore: 85,
          budgetWeight: 15,
          budgetScore: 90,
          totalScore: 88
        }
      },
      {
        collegeId: "sairam",
        matchCategory: "ALTERNATIVE",
        admissionReadiness: "HIGH FIT",
        readinessSummary: "A comfortable, budget-conscious option with safe historical admission buffer.",
        matchPercentage: 83,
        badgeColor: "warning",
        headline: "Safe alternative option with lower fee and high historical admission probability",
        courseRecommended: "B.E. Computer Science and Engineering",
        fitSummary: "With historical TNEA cutoff at 176.5, Ananya's 88% (approx 176) makes this a very safe option with near-certain seat probability in Round 1/2.",
        reasons: [
          "Economical Fee: Tuition from ₹1.50L - 1.80L / year, providing comfortable financial breathing room.",
          "High Admission Comfort: Historical closing cutoff (176.5) closely aligns with current marks.",
          "Training Labs: Apple Authorized Training Center and Leo Muthu Innovation Center on campus.",
          "Hostel Facilities: Clean residential hostels with vegetarian dining options."
        ],
        matchDimensions: {
          academicFit: "Strong (Safe Buffer)",
          courseFit: "Good",
          location: "Good",
          budget: "Excellent",
          hostel: "Available"
        },
        parentChecklist: [
          { item: "Course available", checked: true },
          { item: "Historical cutoff reviewed", checked: true },
          { item: "Fee range reviewed", checked: true },
          { item: "Location & safety reviewed", checked: true },
          { item: "Hostel reviewed", checked: true }
        ],
        academicProfileFit: "88% Score vs 176.5 OC Historical Cutoff (Direct Match)",
        feeEstimate: "₹1.50 - 1.80 L / year (Budget-Friendly)",
        hostelEstimate: "₹80,000 / year",
        dataSource: "TNEA 2025 Round 2 Allotment",
        dataAuditDate: "September 2025",
        explainability: {
          academicWeight: 40,
          academicScore: 85,
          courseWeight: 25,
          courseScore: 88,
          locationWeight: 20,
          locationScore: 80,
          budgetWeight: 15,
          budgetScore: 95,
          totalScore: 83
        }
      },
      {
        collegeId: "ssn",
        matchCategory: "STRETCH",
        admissionReadiness: "ASPIRATIONAL",
        readinessSummary: "Requires top-percentile cutoffs (~96%+) or institutional merit quota route.",
        matchPercentage: 72,
        badgeColor: "info",
        headline: "Aspirational Benchmark (Tier-1 research campus with Shiv Nadar scholarships)",
        courseRecommended: "B.E. Computer Science and Engineering",
        fitSummary: "SSN CSE historically closes at 193.0 / 200 (~96.5%). Families may consider exploring allied branches (Biomedical/IT) or institutional merit scholarship route.",
        reasons: [
          "Premier Academic Brand: Ranked #45 in India by NIRF with ₹9.2 LPA average CTC.",
          "Full Merit Waivers: Shiv Nadar Foundation offers up to 100% scholarships for deserving talent.",
          "250-Acre Campus: World-class laboratories, supercomputers, and sporting infrastructure on OMR Chennai.",
          "High Competition: Historical cutoff is approx 17 marks above Ananya's current 176 cutoff."
        ],
        matchDimensions: {
          academicFit: "Stretch / Gap: ~17 pts",
          courseFit: "Excellent",
          location: "Excellent",
          budget: "Moderate to High",
          hostel: "Available (AC)"
        },
        parentChecklist: [
          { item: "Course available", checked: true },
          { item: "Historical cutoff reviewed (Stretch)", checked: true },
          { item: "Fee range reviewed", checked: true },
          { item: "Location & safety reviewed", checked: true },
          { item: "Hostel reviewed", checked: true }
        ],
        academicProfileFit: "88% Score vs 193.0 OC Historical Cutoff (Stretch)",
        feeEstimate: "₹2.00 - 2.35 L / year",
        hostelEstimate: "₹95,000 / year",
        dataSource: "TNEA 2025 Round 1 Cutoff",
        dataAuditDate: "August 2025",
        explainability: {
          academicWeight: 40,
          academicScore: 65,
          courseWeight: 25,
          courseScore: 95,
          locationWeight: 20,
          locationScore: 80,
          budgetWeight: 15,
          budgetScore: 75,
          totalScore: 72
        }
      }
    ];

    return recommendations.map(rec => {
      const col = mockColleges.find(c => c.id === rec.collegeId);
      return {
        ...rec,
        college: col
      };
    });
  }
};
