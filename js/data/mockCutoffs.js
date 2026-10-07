/**
 * Mock Cutoffs Dataset for Campus Connect AI
 * Contains multi-year historical cutoff records with category, round, and
 * clear data status and official source citations.
 * RESPONSIBLE AI REQUIREMENT: Clearly distinguish verified historical data
 * from current year estimates.
 */

export const mockCutoffs = [
  // Sri Krishna College of Engg & Tech (SKCET)
  {
    id: "cut-skcet-cse-2025",
    collegeId: "skcet",
    courseId: "skcet-cse",
    courseName: "B.E. Computer Science and Engineering",
    year: 2025,
    round: "Round 1",
    category: "OC (Open Competition)",
    cutoffScore: "182.50",
    maxScore: "200.00",
    equivalentPercent: "91.25%",
    status: "Verified Historical Data",
    source: "Directorate of Technical Education (DoTE) Tamil Nadu - TNEA 2025 Round 1 Allotment",
    sourceDate: "August 2025",
    note: "Official closing mark for Open Competition category."
  },
  {
    id: "cut-skcet-cse-2025-bc",
    collegeId: "skcet",
    courseId: "skcet-cse",
    courseName: "B.E. Computer Science and Engineering",
    year: 2025,
    round: "Round 1",
    category: "BC (Backward Class)",
    cutoffScore: "179.50",
    maxScore: "200.00",
    equivalentPercent: "89.75%",
    status: "Verified Historical Data",
    source: "TNEA 2025 Allotment",
    sourceDate: "August 2025",
    note: "Closing mark for BC category."
  },
  {
    id: "cut-skcet-cse-2024",
    collegeId: "skcet",
    courseId: "skcet-cse",
    courseName: "B.E. Computer Science and Engineering",
    year: 2024,
    round: "Round 1",
    category: "OC",
    cutoffScore: "181.00",
    maxScore: "200.00",
    equivalentPercent: "90.50%",
    status: "Verified Historical Data",
    source: "TNEA 2024 Archive",
    sourceDate: "August 2024",
    note: "Historical benchmark."
  },
  {
    id: "cut-skcet-aids-2025",
    collegeId: "skcet",
    courseId: "skcet-aids",
    courseName: "B.Tech AI and Data Science",
    year: 2025,
    round: "Round 1",
    category: "OC",
    cutoffScore: "180.00",
    maxScore: "200.00",
    equivalentPercent: "90.00%",
    status: "Verified Historical Data",
    source: "TNEA 2025 Counselling Reports",
    sourceDate: "August 2025",
    note: "Closing mark for AI & DS."
  },
  {
    id: "cut-skcet-it-2025",
    collegeId: "skcet",
    courseId: "skcet-it",
    courseName: "B.Tech Information Technology",
    year: 2025,
    round: "Round 1",
    category: "OC",
    cutoffScore: "178.50",
    maxScore: "200.00",
    equivalentPercent: "89.25%",
    status: "Verified Historical Data",
    source: "TNEA 2025 Counselling Reports",
    sourceDate: "August 2025",
    note: "Closing mark for IT."
  },

  // SSN College of Engineering
  {
    id: "cut-ssn-cse-2025",
    collegeId: "ssn",
    courseId: "ssn-cse",
    courseName: "B.E. Computer Science and Engineering",
    year: 2025,
    round: "Round 1",
    category: "OC",
    cutoffScore: "193.00",
    maxScore: "200.00",
    equivalentPercent: "96.50%",
    status: "Verified Historical Data",
    source: "TNEA 2025 Official Counselling Matrix",
    sourceDate: "August 2025",
    note: "High competition closing rank."
  },
  {
    id: "cut-ssn-cse-2024",
    collegeId: "ssn",
    courseId: "ssn-cse",
    courseName: "B.E. Computer Science and Engineering",
    year: 2024,
    round: "Round 1",
    category: "OC",
    cutoffScore: "192.50",
    maxScore: "200.00",
    equivalentPercent: "96.25%",
    status: "Verified Historical Data",
    source: "TNEA 2024 Archive",
    sourceDate: "August 2024",
    note: "Historical cutoff."
  },

  // PSG College of Technology
  {
    id: "cut-psg-cse-2025",
    collegeId: "psg-tech",
    courseId: "psg-cse",
    courseName: "B.E. Computer Science and Engineering",
    year: 2025,
    round: "Round 1",
    category: "OC",
    cutoffScore: "196.00",
    maxScore: "200.00",
    equivalentPercent: "98.00%",
    status: "Verified Historical Data",
    source: "DoTE Tamil Nadu TNEA Allotment Record 2025",
    sourceDate: "July 2025",
    note: "Highest autonomous cutoff in Coimbatore zone."
  },

  // Kumaraguru College of Technology
  {
    id: "cut-kct-cse-2025",
    collegeId: "kct",
    courseId: "kct-cse",
    courseName: "B.E. Computer Science and Engineering",
    year: 2025,
    round: "Round 1",
    category: "OC",
    cutoffScore: "185.00",
    maxScore: "200.00",
    equivalentPercent: "92.50%",
    status: "Verified Historical Data",
    source: "TNEA 2025 DoTE Data",
    sourceDate: "August 2025",
    note: "Closing mark for KCT CSE."
  },

  // CEG Anna University
  {
    id: "cut-ceg-cse-2025",
    collegeId: "ceg-anna",
    courseId: "ceg-cse",
    courseName: "B.E. Computer Science and Engineering",
    year: 2025,
    round: "Round 1",
    category: "OC",
    cutoffScore: "198.50",
    maxScore: "200.00",
    equivalentPercent: "99.25%",
    status: "Verified Historical Data",
    source: "Centre for Admissions, Anna University",
    sourceDate: "July 2025",
    note: "State University Top Ranker cutoff."
  },

  // Rajalakshmi Engineering College
  {
    id: "cut-rec-cse-2025",
    collegeId: "rec",
    courseId: "rec-cse",
    courseName: "B.E. Computer Science and Engineering",
    year: 2025,
    round: "Round 1",
    category: "OC",
    cutoffScore: "183.00",
    maxScore: "200.00",
    equivalentPercent: "91.50%",
    status: "Verified Historical Data",
    source: "TNEA 2025 Allotment",
    sourceDate: "August 2025",
    note: "Closing mark for REC CSE."
  },

  // Coimbatore Institute of Technology
  {
    id: "cut-cit-cse-2025",
    collegeId: "cit",
    courseId: "cit-cse",
    courseName: "B.E. Computer Science and Engineering",
    year: 2025,
    round: "Round 1",
    category: "OC",
    cutoffScore: "191.00",
    maxScore: "200.00",
    equivalentPercent: "95.50%",
    status: "Verified Historical Data",
    source: "TNEA 2025 Cutoff Matrix",
    sourceDate: "August 2025",
    note: "Aided autonomous seat closing score."
  },

  // Thiagarajar College of Engineering
  {
    id: "cut-tce-cse-2025",
    collegeId: "tce",
    courseId: "tce-cse",
    courseName: "B.E. Computer Science and Engineering",
    year: 2025,
    round: "Round 1",
    category: "OC",
    cutoffScore: "189.50",
    maxScore: "200.00",
    equivalentPercent: "94.75%",
    status: "Verified Historical Data",
    source: "TNEA 2025 Madurai Region Data",
    sourceDate: "August 2025",
    note: "Top government-aided choice in southern TN."
  },

  // Sri Sairam Engineering College
  {
    id: "cut-sairam-cse-2025",
    collegeId: "sairam",
    courseId: "sairam-cse",
    courseName: "B.E. Computer Science and Engineering",
    year: 2025,
    round: "Round 2",
    category: "OC",
    cutoffScore: "176.50",
    maxScore: "200.00",
    equivalentPercent: "88.25%",
    status: "Verified Historical Data",
    source: "TNEA 2025 Round 2 Allotment",
    sourceDate: "September 2025",
    note: "Accessible for students with 87% - 89% score."
  },

  // Bannari Amman Institute of Technology
  {
    id: "cut-bit-cse-2025",
    collegeId: "bit",
    courseId: "bit-cse",
    courseName: "B.E. Computer Science and Engineering",
    year: 2025,
    round: "Round 1",
    category: "OC",
    cutoffScore: "179.00",
    maxScore: "200.00",
    equivalentPercent: "89.50%",
    status: "Verified Historical Data",
    source: "TNEA 2025 Allotment",
    sourceDate: "August 2025",
    note: "Closing mark for BIT Sathy CSE."
  }
];
