/**
 * Mock Colleges Dataset for Campus Connect AI
 * Realistic Indian college information with focus on Tamil Nadu & South India.
 * Note: Historical cutoff marks & fees are representative benchmarks.
 */

export const mockColleges = [
  {
    id: "skcet",
    name: "Sri Krishna College of Engineering and Technology",
    shortName: "SKCET",
    tneaCode: "2711",
    city: "Coimbatore",
    state: "Tamil Nadu",
    district: "Coimbatore",
    pincode: "641008",
    address: "Kuniamuthur, Coimbatore, Tamil Nadu 641008",
    established: 1998,
    type: "Autonomous",
    affiliation: "Anna University",
    verified: true,
    rating: 4.7,
    reviewsCount: 1420,
    nirfRank: 77,
    naacGrade: "A",
    nbaAccredited: true,
    campusAreaAcres: 52,
    feeRange: {
      min: 150000,
      max: 195000,
      display: "₹1.75 - 1.95 L / year",
      tier: "Moderate"
    },
    hostelAvailable: true,
    hostelFee: 82000,
    scholarships: [
      "Merit-based waiver for TNEA Cutoff > 190 (50% tuition)",
      "First Graduate Scholarship (Govt scheme)",
      "Sports Excellence Full Concession"
    ],
    placements: {
      avgPackage: "7.8 LPA",
      highestPackage: "44.0 LPA",
      placementRate: "93%",
      topRecruiters: ["Zoho", "Virtusa", "Amazon", "Bosch", "Accenture", "TCS Digital"]
    },
    popularCourses: [
      "B.E. Computer Science and Engineering",
      "B.Tech Artificial Intelligence and Data Science",
      "B.Tech Information Technology",
      "B.E. Electronics and Communication"
    ],
    historicalCutoffsSummary: {
      year: 2025,
      cseGeneral: "182.5 / 200",
      status: "Historical TNEA Round 1",
      eligibility: "Class 12 with Physics, Chemistry, Math >= 60%"
    },
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=1000&auto=format&fit=crop&q=80",
    about: "Sri Krishna College of Engineering and Technology is an autonomous institution accredited with 'A' Grade by NAAC. Situated in Coimbatore, it is renowned for its state-of-the-art incubation centers, strong tech industry ties, and consistent 90%+ placement records for computer science engineering branches.",
    facilities: [
      "High-Speed Wi-Fi Campus",
      "AI & Robotics Incubation Lab",
      "Digital Central Library",
      "Modern Hostel (AC / Non-AC)",
      "Indoor Sports Arena",
      "Fleet Transport (60+ Buses)",
      "Cafeteria & Food Court",
      "Health Care Center"
    ],
    officialAdmissionUrl: "https://www.skcet.ac.in/admissions",
    contact: {
      phone: "+91 422 2678001",
      email: "admissions@skcet.ac.in",
      website: "https://www.skcet.ac.in"
    }
  },
  {
    id: "ssn",
    name: "SSN College of Engineering",
    shortName: "SSN",
    tneaCode: "1315",
    city: "Chennai (Kalavakkam)",
    state: "Tamil Nadu",
    district: "Chengalpattu",
    pincode: "603110",
    address: "Old Mahabalipuram Road (OMR), Kalavakkam, Chennai 603110",
    established: 1996,
    type: "Autonomous",
    affiliation: "Anna University",
    verified: true,
    rating: 4.8,
    reviewsCount: 2150,
    nirfRank: 45,
    naacGrade: "A++",
    nbaAccredited: true,
    campusAreaAcres: 250,
    feeRange: {
      min: 190000,
      max: 235000,
      display: "₹2.00 - 2.35 L / year",
      tier: "Moderate to High"
    },
    hostelAvailable: true,
    hostelFee: 95000,
    scholarships: [
      "Shiv Nadar Foundation Full Merit Scholarship (100% waiver)",
      "Rural Student Talent Scholarship",
      "Sports Scholarship"
    ],
    placements: {
      avgPackage: "9.2 LPA",
      highestPackage: "64.0 LPA",
      placementRate: "95%",
      topRecruiters: ["Microsoft", "Google", "Amazon", "Cisco", "Qualcomm", "Zoho"]
    },
    popularCourses: [
      "B.E. Computer Science and Engineering",
      "B.Tech Information Technology",
      "B.E. Electrical and Electronics",
      "B.E. Biomedical Engineering"
    ],
    historicalCutoffsSummary: {
      year: 2025,
      cseGeneral: "193.0 / 200",
      status: "Historical TNEA Round 1",
      eligibility: "Class 12 PCM >= 65%"
    },
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&auto=format&fit=crop&q=80",
    about: "SSN College of Engineering, founded by Dr. Shiv Nadar, is an autonomous engineering institution situated along the IT corridor of Chennai. Widely acclaimed for its research grants, global university tie-ups, and student-driven innovations.",
    facilities: [
      "250-Acre Lush Green Campus",
      "Advanced Supercomputing Cluster",
      "Olympic-size Swimming Pool & Track",
      "Air Conditioned Hostels",
      "24/7 Library with IEEE Digital Access",
      "Innovation Hub & Start-up Incubator",
      "Multi-Cuisine Canteen"
    ],
    officialAdmissionUrl: "https://www.ssn.edu.in/admissions",
    contact: {
      phone: "+91 44 27469700",
      email: "info@ssn.edu.in",
      website: "https://www.ssn.edu.in"
    }
  },
  {
    id: "psg-tech",
    name: "PSG College of Technology",
    shortName: "PSG Tech",
    tneaCode: "2006",
    city: "Coimbatore",
    state: "Tamil Nadu",
    district: "Coimbatore",
    pincode: "641004",
    address: "Avinashi Road, Peelamedu, Coimbatore 641004",
    established: 1951,
    type: "Government Aided / Autonomous",
    affiliation: "Anna University",
    verified: true,
    rating: 4.9,
    reviewsCount: 3100,
    nirfRank: 63,
    naacGrade: "A++",
    nbaAccredited: true,
    campusAreaAcres: 45,
    feeRange: {
      min: 120000,
      max: 175000,
      display: "₹1.40 - 1.75 L / year",
      tier: "Moderate"
    },
    hostelAvailable: true,
    hostelFee: 78000,
    scholarships: [
      "PSG Sons & Charities Merit Aid",
      "Tamil Nadu State First Graduate Concession",
      "Alumni Endowment Aid"
    ],
    placements: {
      avgPackage: "10.4 LPA",
      highestPackage: "52.0 LPA",
      placementRate: "97%",
      topRecruiters: ["Microsoft", "DE Shaw", "Caterpillar", "Qualcomm", "Texas Instruments", "Zoho"]
    },
    popularCourses: [
      "B.E. Computer Science and Engineering",
      "B.Tech Artificial Intelligence & Machine Learning",
      "B.E. Mechanical Engineering (Sandwich)",
      "B.E. Robotics & Automation"
    ],
    historicalCutoffsSummary: {
      year: 2025,
      cseGeneral: "196.0 / 200",
      status: "Historical TNEA Round 1",
      eligibility: "Class 12 with PCM >= 60%"
    },
    logo: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=120&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1000&auto=format&fit=crop&q=80",
    about: "PSG College of Technology is a premiere government-aided, autonomous institution established in 1951 by PSG & Sons Charities. Renowned for its industry-institute interface, proprietary industrial research plants, and pioneering Sandwich engineering programs.",
    facilities: [
      "Pioneering Industrial CNC Labs",
      "TIFAC-CORE Research Labs",
      "High Performance Computing Lab",
      "Hostels for Boys & Girls",
      "Auditorium & Open Air Theatre",
      "Extensive Sports Complex"
    ],
    officialAdmissionUrl: "https://www.psgtech.edu/admissions.php",
    contact: {
      phone: "+91 422 2572177",
      email: "principal@psgtech.ac.in",
      website: "https://www.psgtech.edu"
    }
  },
  {
    id: "kct",
    name: "Kumaraguru College of Technology",
    shortName: "KCT",
    tneaCode: "2712",
    city: "Coimbatore",
    state: "Tamil Nadu",
    district: "Coimbatore",
    pincode: "641049",
    address: "Saravanampatti, Coimbatore, Tamil Nadu 641049",
    established: 1984,
    type: "Autonomous",
    affiliation: "Anna University",
    verified: true,
    rating: 4.6,
    reviewsCount: 1680,
    nirfRank: 82,
    naacGrade: "A++",
    nbaAccredited: true,
    campusAreaAcres: 156,
    feeRange: {
      min: 160000,
      max: 200000,
      display: "₹1.65 - 2.00 L / year",
      tier: "Moderate"
    },
    hostelAvailable: true,
    hostelFee: 85000,
    scholarships: [
      "Mahatma Gandhi Merit Scholarship (₹1 Crore annual fund)",
      "KCT Alumni Scholarship",
      "First Graduate Tuition Waiver"
    ],
    placements: {
      avgPackage: "6.8 LPA",
      highestPackage: "36.0 LPA",
      placementRate: "91%",
      topRecruiters: ["Robert Bosch", "Amazon", "Ford", "Soliton", "Accenture", "Cognizant"]
    },
    popularCourses: [
      "B.E. Computer Science and Engineering",
      "B.Tech Information Technology",
      "B.E. Mechatronics Engineering",
      "B.Tech Artificial Intelligence & Data Science"
    ],
    historicalCutoffsSummary: {
      year: 2025,
      cseGeneral: "185.0 / 200",
      status: "Historical TNEA Round 1",
      eligibility: "Class 12 with PCM >= 60%"
    },
    logo: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=120&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1000&auto=format&fit=crop&q=80",
    about: "Kumaraguru College of Technology (KCT) is an autonomous engineering college located in Saravanampatti, Coimbatore. Known for the FORGE innovation accelerator, vibrant student tech forums, eco-friendly campus, and hands-on maker spaces.",
    facilities: [
      "FORGE Innovation Accelerator",
      "Fab Lab & Hardware Incubator",
      "156-Acre Sprawling Green Campus",
      "Multi-Court Sports Arena & Gym",
      "Hostels with Wi-Fi & Solar Power",
      "Cafeteria & Organic Food Kiosks"
    ],
    officialAdmissionUrl: "https://www.kct.ac.in/admissions",
    contact: {
      phone: "+91 422 2661100",
      email: "info@kct.ac.in",
      website: "https://www.kct.ac.in"
    }
  },
  {
    id: "ceg-anna",
    name: "College of Engineering, Guindy (CEG Anna University)",
    shortName: "CEG Anna Univ",
    tneaCode: "0001",
    city: "Chennai",
    state: "Tamil Nadu",
    district: "Chennai",
    pincode: "600025",
    address: "Sardar Patel Road, Guindy, Chennai 600025",
    established: 1794,
    type: "State University Campus",
    affiliation: "Anna University",
    verified: true,
    rating: 4.9,
    reviewsCount: 4200,
    nirfRank: 13,
    naacGrade: "A++",
    nbaAccredited: true,
    campusAreaAcres: 223,
    feeRange: {
      min: 45000,
      max: 65000,
      display: "₹50,000 - 65,000 / year",
      tier: "Low / Govt Subsidized"
    },
    hostelAvailable: true,
    hostelFee: 42000,
    scholarships: [
      "Tamil Nadu Govt Moovalur Ramamirtham Ammaiyar Scheme",
      "Post-Matric Scholarship for Reserved Categories",
      "Auroville & Alumni Endowment"
    ],
    placements: {
      avgPackage: "11.5 LPA",
      highestPackage: "50.0 LPA",
      placementRate: "96%",
      topRecruiters: ["Google", "Microsoft", "Texas Instruments", "Apple", "Oracle", "Goldman Sachs"]
    },
    popularCourses: [
      "B.E. Computer Science and Engineering",
      "B.Tech Information Technology",
      "B.E. Electrical & Electronics",
      "B.E. Mechanical Engineering"
    ],
    historicalCutoffsSummary: {
      year: 2025,
      cseGeneral: "198.5 / 200",
      status: "Historical TNEA Top Rankers",
      eligibility: "Class 12 PCM >= 60%"
    },
    logo: "https://images.unsplash.com/photo-1568792923760-d70635a89fac?w=120&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&auto=format&fit=crop&q=80",
    about: "College of Engineering, Guindy is one of Asia's oldest technical institutions, founded in 1794. As the flagship university campus of Anna University, it attracts top rankers across Tamil Nadu and produces world-class engineers, entrepreneurs, and scientists.",
    facilities: [
      "Heritage 223-Acre Green Campus",
      "Ramanujan Computing Centre",
      "AU-KBC Research Centre",
      "University Central Library",
      "Extensive Hostels & Dining Halls",
      "Athletics Pavilion & Stadium"
    ],
    officialAdmissionUrl: "https://ceg.annauniv.edu/admission",
    contact: {
      phone: "+91 44 22358491",
      email: "dean@ceg.annauniv.edu",
      website: "https://ceg.annauniv.edu"
    }
  },
  {
    id: "rec",
    name: "Rajalakshmi Engineering College",
    shortName: "REC Chennai",
    tneaCode: "1211",
    city: "Chennai (Thandalam)",
    state: "Tamil Nadu",
    district: "Kancheepuram",
    pincode: "602105",
    address: "Rajalakshmi Nagar, Thandalam, Chennai 602105",
    established: 1997,
    type: "Autonomous",
    affiliation: "Anna University",
    verified: true,
    rating: 4.5,
    reviewsCount: 1540,
    nirfRank: 86,
    naacGrade: "A++",
    nbaAccredited: true,
    campusAreaAcres: 75,
    feeRange: {
      min: 160000,
      max: 195000,
      display: "₹1.65 - 1.95 L / year",
      tier: "Moderate"
    },
    hostelAvailable: true,
    hostelFee: 85000,
    scholarships: [
      "Rajalakshmi Merit Concession (>185 Cutoff)",
      "Govt 7.5% Govt School Quota Scheme",
      "Sports Achievers Waiver"
    ],
    placements: {
      avgPackage: "6.5 LPA",
      highestPackage: "32.0 LPA",
      placementRate: "90%",
      topRecruiters: ["Cognizant", "TCS", "Wipro", "Zoho", "LTI Mindtree", "HCL"]
    },
    popularCourses: [
      "B.E. Computer Science and Engineering",
      "B.Tech Artificial Intelligence and Machine Learning",
      "B.Tech Computer Science and Business Systems (CSBS)",
      "B.E. Aerospace Engineering"
    ],
    historicalCutoffsSummary: {
      year: 2025,
      cseGeneral: "183.0 / 200",
      status: "Historical TNEA Round 1",
      eligibility: "Class 12 with PCM >= 55%"
    },
    logo: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=120&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80",
    about: "Rajalakshmi Engineering College (REC) is an autonomous institution accredited with NAAC A++ located near Sriperumbudur industrial belt in Chennai. Known for partnerships with TCS, IBM, and robust placements in IT & manufacturing sectors.",
    facilities: [
      "Modern Computing Centers",
      "TCS Academic Research Lab",
      "Hostels with AC Accommodation",
      "Fleet of 85+ AC / Non-AC Buses",
      "Digital Knowledge Center",
      "Sports Ground & Gymnasium"
    ],
    officialAdmissionUrl: "https://www.rajalakshmi.org/admissions",
    contact: {
      phone: "+91 44 67181111",
      email: "admissions@rajalakshmi.edu.in",
      website: "https://www.rajalakshmi.org"
    }
  },
  {
    id: "cit",
    name: "Coimbatore Institute of Technology",
    shortName: "CIT",
    tneaCode: "2005",
    city: "Coimbatore",
    state: "Tamil Nadu",
    district: "Coimbatore",
    pincode: "641014",
    address: "Civil Aerodrome Post, Coimbatore 641014",
    established: 1956,
    type: "Government Aided / Autonomous",
    affiliation: "Anna University",
    verified: true,
    rating: 4.7,
    reviewsCount: 1850,
    nirfRank: 90,
    naacGrade: "A",
    nbaAccredited: true,
    campusAreaAcres: 25,
    feeRange: {
      min: 110000,
      max: 155000,
      display: "₹1.25 - 1.55 L / year",
      tier: "Moderate"
    },
    hostelAvailable: true,
    hostelFee: 72000,
    scholarships: [
      "V. Rangasamy Naidu Educational Trust Aid",
      "First Graduate Tuition Concession",
      "Alumni Scholarship"
    ],
    placements: {
      avgPackage: "8.1 LPA",
      highestPackage: "38.5 LPA",
      placementRate: "92%",
      topRecruiters: ["Oracle", "ThoughtWorks", "DE Shaw", "Zoho", "Robert Bosch", "TCS"]
    },
    popularCourses: [
      "B.E. Computer Science and Engineering",
      "B.Tech Information Technology",
      "B.Tech Artificial Intelligence and Data Science",
      "B.E. Electrical and Electronics Engineering"
    ],
    historicalCutoffsSummary: {
      year: 2025,
      cseGeneral: "191.0 / 200",
      status: "Historical TNEA Round 1",
      eligibility: "Class 12 with PCM >= 60%"
    },
    logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=120&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1000&auto=format&fit=crop&q=80",
    about: "Coimbatore Institute of Technology (CIT) is a government-aided autonomous institution founded in 1956. Known for its strong mathematical foundation in computing, world-class faculty, and outstanding placement record in product software companies.",
    facilities: [
      "Data Analytics & AI Research Centre",
      "Modern Robotics Labs",
      "Central Library with 80,000+ Volumes",
      "Student Hostels with Dining",
      "Auditorium & Seminar Halls"
    ],
    officialAdmissionUrl: "https://www.cit.edu.in/admissions",
    contact: {
      phone: "+91 422 2574071",
      email: "principal@cit.edu.in",
      website: "https://www.cit.edu.in"
    }
  },
  {
    id: "tce",
    name: "Thiagarajar College of Engineering",
    shortName: "TCE Madurai",
    tneaCode: "5008",
    city: "Madurai",
    state: "Tamil Nadu",
    district: "Madurai",
    pincode: "625015",
    address: "Tiruparankundram, Madurai, Tamil Nadu 625015",
    established: 1957,
    type: "Government Aided / Autonomous",
    affiliation: "Anna University",
    verified: true,
    rating: 4.8,
    reviewsCount: 1980,
    nirfRank: 85,
    naacGrade: "A+",
    nbaAccredited: true,
    campusAreaAcres: 143,
    feeRange: {
      min: 115000,
      max: 160000,
      display: "₹1.20 - 1.60 L / year",
      tier: "Moderate"
    },
    hostelAvailable: true,
    hostelFee: 70000,
    scholarships: [
      "Thiagarajar Trust Merit Scholarship",
      "Govt First Graduate Assistance",
      "SC/ST Post-Matric Fee Waiver"
    ],
    placements: {
      avgPackage: "7.9 LPA",
      highestPackage: "34.0 LPA",
      placementRate: "91%",
      topRecruiters: ["Qualcomm", "Zoho", "L&T", "TCS Digital", "Infosys", "Honeywell"]
    },
    popularCourses: [
      "B.E. Computer Science and Engineering",
      "B.Tech Information Technology",
      "B.E. Electronics and Communication",
      "B.E. Mechatronics"
    ],
    historicalCutoffsSummary: {
      year: 2025,
      cseGeneral: "189.5 / 200",
      status: "Historical TNEA Round 1",
      eligibility: "Class 12 with PCM >= 60%"
    },
    logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=120&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80",
    about: "Thiagarajar College of Engineering (TCE) is an autonomous government-aided institution located in Madurai. TCE has over 6 decades of academic heritage with extensive industry partnerships in IoT, VLSI, and cloud architectures.",
    facilities: [
      "143-Acre Picturesque Campus",
      "Honeywell Software Centre of Excellence",
      "High Tech Computing Hub",
      "Spacious Separate Hostels",
      "Playgrounds & Indoor Stadium"
    ],
    officialAdmissionUrl: "https://www.tce.edu/admission",
    contact: {
      phone: "+91 452 2482240",
      email: "principal@tce.edu",
      website: "https://www.tce.edu"
    }
  },
  {
    id: "sairam",
    name: "Sri Sairam Engineering College",
    shortName: "Sairam",
    tneaCode: "1419",
    city: "Chennai (Tambaram)",
    state: "Tamil Nadu",
    district: "Chennai",
    pincode: "600044",
    address: "Sai Leo Nagar, West Tambaram, Chennai 600044",
    established: 1995,
    type: "Autonomous",
    affiliation: "Anna University",
    verified: true,
    rating: 4.4,
    reviewsCount: 1320,
    nirfRank: 105,
    naacGrade: "A+",
    nbaAccredited: true,
    campusAreaAcres: 60,
    feeRange: {
      min: 145000,
      max: 180000,
      display: "₹1.50 - 1.80 L / year",
      tier: "Moderate"
    },
    hostelAvailable: true,
    hostelFee: 80000,
    scholarships: [
      "MJF Lion Leo Muthu Merit Scholarship",
      "First Graduate Scholarship",
      "Sports Achievers Free Education"
    ],
    placements: {
      avgPackage: "5.8 LPA",
      highestPackage: "28.0 LPA",
      placementRate: "88%",
      topRecruiters: ["TCS", "Cognizant", "Zoho", "Wipro", "Mindtree", "Capgemini"]
    },
    popularCourses: [
      "B.E. Computer Science and Engineering",
      "B.Tech Artificial Intelligence and Data Science",
      "B.Tech Information Technology",
      "B.E. Electrical & Electronics"
    ],
    historicalCutoffsSummary: {
      year: 2025,
      cseGeneral: "176.5 / 200",
      status: "Historical TNEA Round 2",
      eligibility: "Class 12 PCM >= 50%"
    },
    logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=80",
    about: "Sri Sairam Engineering College is an autonomous institution located in West Tambaram, Chennai. The institution emphasizes career training, skill enhancement labs, and entrepreneurship ecosystems.",
    facilities: [
      "Apple Authorized Training Center",
      "Leo Muthu Innovation Center",
      "Clean Campus Hostels",
      "Multi-Speciality Health Center",
      "Bus Connectivity across Chennai"
    ],
    officialAdmissionUrl: "https://sairam.edu.in/admission",
    contact: {
      phone: "+91 44 22512222",
      email: "sairam@sairam.edu.in",
      website: "https://sairam.edu.in"
    }
  },
  {
    id: "bit",
    name: "Bannari Amman Institute of Technology",
    shortName: "BIT Sathy",
    tneaCode: "2702",
    city: "Sathyamangalam",
    state: "Tamil Nadu",
    district: "Erode",
    pincode: "638401",
    address: "Alathukombai, Sathyamangalam, Erode, Tamil Nadu 638401",
    established: 1996,
    type: "Autonomous",
    affiliation: "Anna University",
    verified: true,
    rating: 4.6,
    reviewsCount: 1720,
    nirfRank: 89,
    naacGrade: "A+",
    nbaAccredited: true,
    campusAreaAcres: 181,
    feeRange: {
      min: 150000,
      max: 185000,
      display: "₹1.55 - 1.85 L / year",
      tier: "Moderate"
    },
    hostelAvailable: true,
    hostelFee: 78000,
    scholarships: [
      "Bannari Amman Group Rural Talent Scholarship",
      "First Graduate Scholarship",
      "National Talent Search Awardees"
    ],
    placements: {
      avgPackage: "6.4 LPA",
      highestPackage: "30.0 LPA",
      placementRate: "90%",
      topRecruiters: ["Zoho", "Virtusa", "Soliton", "CTS", "TCS", "Accenture"]
    },
    popularCourses: [
      "B.E. Computer Science and Engineering",
      "B.Tech Information Technology",
      "B.Tech Artificial Intelligence and Data Science",
      "B.E. Agricultural Engineering"
    ],
    historicalCutoffsSummary: {
      year: 2025,
      cseGeneral: "179.0 / 200",
      status: "Historical TNEA Round 1/2",
      eligibility: "Class 12 with PCM >= 55%"
    },
    logo: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=1000&auto=format&fit=crop&q=80",
    about: "Bannari Amman Institute of Technology is an autonomous engineering institution situated in a lush 181-acre campus near Bhavani River in Sathyamangalam. Renowned for residential student life, modern research facilities, and intensive software engineering bootcamps.",
    facilities: [
      "Special Learning Centers (50+ Technology Labs)",
      "181-Acre Eco-friendly Green Campus",
      "Full Wi-Fi Residential Campus",
      "Modern Hostel with 5000+ capacity",
      "Sports Pavilion and Swimming Pool"
    ],
    officialAdmissionUrl: "https://www.bitsathy.ac.in/admission",
    contact: {
      phone: "+91 4295 226000",
      email: "admissions@bitsathy.ac.in",
      website: "https://www.bitsathy.ac.in"
    }
  },
  {
    id: "vit",
    name: "Vellore Institute of Technology",
    shortName: "VIT Vellore",
    tneaCode: "DEEMED-VIT",
    city: "Vellore",
    state: "Tamil Nadu",
    district: "Vellore",
    pincode: "632014",
    address: "Katpadi, Vellore, Tamil Nadu 632014",
    established: 1984,
    type: "Deemed University",
    affiliation: "Institution of Eminence / UGC",
    verified: true,
    rating: 4.8,
    reviewsCount: 5200,
    nirfRank: 11,
    naacGrade: "A++",
    nbaAccredited: true,
    campusAreaAcres: 372,
    feeRange: {
      min: 198000,
      max: 395000,
      display: "₹1.98 - 3.95 L / year (Categorized)",
      tier: "High"
    },
    hostelAvailable: true,
    hostelFee: 115000,
    scholarships: [
      "GV School Development Programme (GVSDP) - 100% Fee Waiver for Board Toppers",
      "VITEEE Rank-based Scholarship (1-50 Rank: 75% waiver)"
    ],
    placements: {
      avgPackage: "9.9 LPA",
      highestPackage: "1.02 CPA",
      placementRate: "92%",
      topRecruiters: ["Microsoft", "Amazon", "Intel", "Adobe", "Morgan Stanley", "PayPal"]
    },
    popularCourses: [
      "B.Tech Computer Science and Engineering",
      "B.Tech CSE with spec in AI and Machine Learning",
      "B.Tech CSE with spec in Information Security",
      "B.Tech Electronics and Communication"
    ],
    historicalCutoffsSummary: {
      year: 2025,
      cseGeneral: "VITEEE Rank < 7,500 (Category 1)",
      status: "Historical VITEEE Counselling",
      eligibility: "Class 12 with PCM aggregate >= 60%"
    },
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1000&auto=format&fit=crop&q=80",
    about: "VIT Vellore is one of India's premier private deemed universities, recognized as an Institution of Eminence (IoE). With vibrant international student exchange programs, FFCS (Fully Flexible Credit System), and marquee campus placement drives.",
    facilities: [
      "372-Acre Mega Campus",
      "Smart Classrooms & Innovation Labs",
      "Periyar Central Library",
      "Multi-story Hostels with AC",
      "Outdoor Stadium & Olympic Pool"
    ],
    officialAdmissionUrl: "https://vit.ac.in/admissions",
    contact: {
      phone: "+91 416 2202020",
      email: "admissions@vit.ac.in",
      website: "https://vit.ac.in"
    }
  },
  {
    id: "amrita",
    name: "Amrita Vishwa Vidyapeetham",
    shortName: "Amrita Coimbatore",
    tneaCode: "DEEMED-AMRITA",
    city: "Coimbatore (Ettimadai)",
    state: "Tamil Nadu",
    district: "Coimbatore",
    pincode: "641112",
    address: "Amritanagar, Ettimadai, Coimbatore 641112",
    established: 1994,
    type: "Deemed University",
    affiliation: "UGC / NAAC A++",
    verified: true,
    rating: 4.7,
    reviewsCount: 2300,
    nirfRank: 7,
    naacGrade: "A++",
    nbaAccredited: true,
    campusAreaAcres: 400,
    feeRange: {
      min: 250000,
      max: 350000,
      display: "₹2.50 - 3.50 L / year",
      tier: "High"
    },
    hostelAvailable: true,
    hostelFee: 98000,
    scholarships: [
      "Amrita Chancellor Scholarship (90% fee waiver for AEEE Top Rankers)",
      "Merit-cum-Means Concession"
    ],
    placements: {
      avgPackage: "9.1 LPA",
      highestPackage: "56.0 LPA",
      placementRate: "94%",
      topRecruiters: ["Cisco", "Amazon", "Microsoft", "Bosch", "Accenture", "TCS"]
    },
    popularCourses: [
      "B.Tech Computer Science and Engineering",
      "B.Tech Artificial Intelligence and Data Science",
      "B.Tech Cyber Security",
      "B.Tech Automation and Robotics"
    ],
    historicalCutoffsSummary: {
      year: 2025,
      cseGeneral: "AEEE Rank < 2,000",
      status: "Historical AEEE Counselling",
      eligibility: "Class 12 PCM >= 60%"
    },
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&auto=format&fit=crop&q=80",
    about: "Amrita Vishwa Vidyapeetham is a multi-disciplinary, research-intensive university ranked among the top 10 universities in India by NIRF. Situated against the Western Ghats in Ettimadai, it blends cutting-edge technology education with values-based holistic training.",
    facilities: [
      "400-Acre Scenic Mountain-Foot Campus",
      "Center for Cyber Security Systems & Networks",
      "TIFAC-CORE in Cyber Security",
      "Residential Hostels with Dining Halls",
      "Olympic Standard Sports Complex"
    ],
    officialAdmissionUrl: "https://www.amrita.edu/admissions",
    contact: {
      phone: "+91 422 2685000",
      email: "admissions@amrita.edu",
      website: "https://www.amrita.edu"
    }
  }
];
