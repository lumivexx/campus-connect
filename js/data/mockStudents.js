/**
 * Mock Students & Parent User Dataset for Campus Connect AI
 * Primary Parent: Ravi Kumar
 * Primary Student/Child: Ananya Kumar (Class 12, 88% aggregate, B.E. Computer Science aspirant, Tamil Nadu)
 * Secondary Child for switching demo: Mitra Kumar (91.5% score)
 */

export const mockStudents = [
  {
    id: "parent-ravi",
    parentName: "Ravi Kumar",
    name: "Ravi Kumar", // for compatibility
    role: "parent",
    email: "ravi.kumar@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    phone: "+91 98401 23456",
    activeChildId: "child-ananya",
    children: [
      {
        id: "child-ananya",
        name: "Ananya Kumar",
        shortName: "Ananya",
        relationship: "Daughter",
        classLevel: "Class 12 Completed",
        board: "CBSE",
        stream: "Physics, Chemistry, Mathematics & CS",
        marks: {
          percentage: 88.0,
          tneaEquivalentCutoff: 176.0,
          physics: 86,
          chemistry: 88,
          maths: 90,
          computerScience: 94
        },
        preferredCourse: "B.E. Computer Science and Engineering",
        preferredSpecializations: [
          "Artificial Intelligence & Machine Learning",
          "Data Science",
          "Information Technology"
        ],
        preferredLocation: "Tamil Nadu",
        preferredCities: ["Coimbatore", "Chennai"],
        budget: {
          tier: "Moderate",
          maxAnnualFee: 200000,
          display: "₹1.50 - 2.00 L / year"
        },
        hostelRequired: true
      },
      {
        id: "child-mitra",
        name: "Mitra Kumar",
        shortName: "Mitra",
        relationship: "Son",
        classLevel: "Class 12 Completed",
        board: "State Board",
        stream: "PCM & Computer Applications",
        marks: {
          percentage: 91.5,
          tneaEquivalentCutoff: 183.0,
          physics: 90,
          chemistry: 92,
          maths: 92,
          computerScience: 96
        },
        preferredCourse: "B.Tech Artificial Intelligence and Data Science",
        preferredSpecializations: ["Data Analytics", "Cloud Computing"],
        preferredLocation: "Coimbatore",
        preferredCities: ["Coimbatore"],
        budget: {
          tier: "Moderate",
          maxAnnualFee: 220000,
          display: "₹1.75 - 2.20 L / year"
        },
        hostelRequired: true
      }
    ],

    // Active child properties mirrored on root for backwards compatibility
    childName: "Ananya Kumar",
    classLevel: "Class 12 Completed",
    board: "CBSE",
    stream: "Physics, Chemistry, Mathematics & CS",
    marks: {
      percentage: 88.0,
      tneaEquivalentCutoff: 176.0,
      physics: 86,
      chemistry: 88,
      maths: 90,
      computerScience: 94
    },
    preferredCourse: "B.E. Computer Science and Engineering",
    preferredSpecializations: [
      "Artificial Intelligence & Machine Learning",
      "Data Science",
      "Information Technology"
    ],
    preferredLocation: "Tamil Nadu",
    preferredCities: ["Coimbatore", "Chennai"],
    budget: {
      tier: "Moderate",
      maxAnnualFee: 200000,
      display: "₹1.50 - 2.00 L / year"
    },
    hostelRequired: true,
    scholarshipInterest: true,

    // Shortlist with categorized parent tiers
    savedColleges: ["skcet", "ssn", "kct", "rec"],
    shortlistCategories: {
      best_fit: ["skcet"],
      good_options: ["rec", "kct"],
      backup_options: ["sairam"]
    },
    savedCourses: ["skcet-cse", "kct-cse", "rec-cse"],
    followedColleges: ["skcet", "psg-tech"],
    registeredEvents: ["evt-ssn-ai-workshop"],

    recommendationHistory: [
      {
        id: "rec-session-1",
        date: "2026-10-06T10:15:00Z",
        course: "B.E. Computer Science and Engineering",
        score: "88%",
        location: "Tamil Nadu",
        budget: "Moderate",
        recommendationsCount: 4,
        topCollegeId: "skcet"
      }
    ],

    upcomingDeadlines: [
      {
        id: "dl-tnea-choice",
        title: "TNEA Online Registration & Certificate Verification",
        authority: "Directorate of Technical Education (DoTE) TN",
        deadline: "2026-10-22",
        daysRemaining: 12,
        status: "ACTION NEEDED",
        urgency: "urgent",
        link: "https://www.tneaonline.org"
      },
      {
        id: "dl-skcet-scholarship",
        title: "SKCET Merit Scholarship Application Submission",
        authority: "Sri Krishna Institutions",
        deadline: "2026-10-25",
        daysRemaining: 15,
        status: "UPCOMING",
        urgency: "warning",
        link: "https://www.skcet.ac.in"
      },
      {
        id: "dl-hackfest",
        title: "HackFest 2026 Innovation Registration Deadline",
        authority: "SKCET Krishna Innovation Center",
        deadline: "2026-10-20",
        daysRemaining: 10,
        status: "OPTIONAL",
        urgency: "info",
        link: "#events"
      }
    ]
  }
];

export const mockNotifications = [
  {
    id: "notif-1",
    type: "deadline",
    title: "Action Needed: TNEA 2026 Certificate Verification",
    message: "12 days remaining to complete document upload for Ananya's engineering counselling.",
    timestamp: "10 mins ago",
    read: false,
    collegeId: null,
    actionLink: "#saved"
  },
  {
    id: "notif-2",
    type: "admission",
    title: "Official DoTE Cutoff Archive Updated",
    message: "DoTE Tamil Nadu released verified 2025 closing cutoff marks for Autonomous colleges.",
    timestamp: "2 hours ago",
    read: false,
    collegeId: null,
    actionLink: "#discover"
  },
  {
    id: "notif-3",
    type: "ai",
    title: "Parent Advisor Recommendation Ready",
    message: "Based on Ananya's 88% score, SKCET and REC show the strongest academic & fee compatibility.",
    timestamp: "5 hours ago",
    read: false,
    collegeId: "skcet",
    actionLink: "#ai-guide"
  },
  {
    id: "notif-4",
    type: "college",
    title: "Campus Update: PSG Tech Semiconductor Lab",
    message: "PSG College of Technology inaugurated new undergraduate VLSI Testing facility.",
    timestamp: "1 day ago",
    read: true,
    collegeId: "psg-tech",
    actionLink: "#community"
  },
  {
    id: "notif-5",
    type: "event",
    title: "Free Parent Counselling Session by SKCET",
    message: "Sri Krishna Institutions announced a choice-filling webinar for Class 12 parents on Oct 14.",
    timestamp: "2 days ago",
    read: true,
    collegeId: "skcet",
    actionLink: "#events"
  }
];
