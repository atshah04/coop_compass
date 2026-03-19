export const KEYWORD_SKILLS = [
  "excel",
  "power bi",
  "tableau",
  "data analysis",
  "research",
  "project management",
  "communication",
  "copywriting",
  "social media",
  "crm",
  "salesforce",
  "figma",
  "canva",
  "stakeholder management",
  "presentation",
  "budgeting",
  "process mapping",
  "scheduling",
  "event planning",
  "customer service",
  "python",
  "sql"
];

export const KEYWORD_COURSES = [
  "statistics",
  "economics",
  "marketing",
  "finance",
  "human resources",
  "operations management",
  "accounting",
  "business communication",
  "project management",
  "psychology"
];

export const INDUSTRIES = [
  "Business",
  "Healthcare",
  "Public Sector",
  "Retail",
  "Media",
  "Technology"
];

export const JOBS = [
  {
    id: "j1",
    company: "Northbeam Insights",
    role: "Data Analyst Co-op",
    salary: 31,
    deadline: "2026-04-02",
    location: "Waterloo",
    industry: "Business",
    requirements: ["Excel", "Data analysis", "Presentation", "Statistics"],
    learnable: ["Power BI"],
    reviews: [
      {
        from: "3B Economics",
        interview: "Medium",
        dayToDay: "Excel models, dashboard updates, weekly stakeholder readouts",
        quote: "Case exercise plus one behavioral round. They value clear thinking over flashy jargon."
      },
      {
        from: "4A Statistics",
        interview: "Medium",
        dayToDay: "Trend analysis, survey summaries, insight memos",
        quote: "Great mentorship. Be ready to explain how your analysis would influence decisions."
      }
    ],
    rejectionInsights: [
      "57% of rejected candidates could not explain their analysis process clearly.",
      "43% lacked confidence presenting recommendations.",
      "Top improvement: prepare one project story with a clear business outcome."
    ]
  },
  {
    id: "j2",
    company: "Lattice Financial",
    role: "Operations Co-op",
    salary: 29,
    deadline: "2026-03-31",
    location: "Toronto",
    industry: "Business",
    requirements: ["Process mapping", "Communication", "Scheduling", "Project management"],
    learnable: ["Salesforce"],
    reviews: [
      {
        from: "3A AFM",
        interview: "Medium",
        dayToDay: "Workflow documentation, vendor follow-ups, KPI tracking",
        quote: "Interview focused on prioritization and detail orientation."
      }
    ],
    rejectionInsights: [
      "50% of rejections came from unclear examples of ownership.",
      "37% struggled with scenario questions about conflicting deadlines.",
      "Top improvement: prepare STAR stories for planning and coordination."
    ]
  },
  {
    id: "j3",
    company: "Pixel Grove Media",
    role: "Marketing & Content Co-op",
    salary: 27,
    deadline: "2026-04-10",
    location: "Remote",
    industry: "Media",
    requirements: ["Copywriting", "Social media", "Research", "Canva"],
    learnable: ["Paid campaign analytics"],
    reviews: [
      {
        from: "2B Arts",
        interview: "Easy",
        dayToDay: "Content calendar planning, campaign brainstorming, light reporting",
        quote: "Friendly team and lots of room to pitch ideas if you bring examples."
      }
    ],
    rejectionInsights: [
      "62% of rejected applicants lacked a writing portfolio.",
      "33% did not show familiarity with campaign metrics.",
      "Top improvement: prepare two sample posts and explain expected audience impact."
    ]
  },
  {
    id: "j4",
    company: "Maple Health Systems",
    role: "Program Coordination Co-op",
    salary: 30,
    deadline: "2026-04-06",
    location: "Waterloo",
    industry: "Healthcare",
    requirements: ["Stakeholder management", "Scheduling", "Business communication", "Excel"],
    learnable: ["Healthcare compliance basics"],
    reviews: [
      {
        from: "3B Health Studies",
        interview: "Easy",
        dayToDay: "Team meeting logistics, reporting, patient-program admin support",
        quote: "Very collaborative environment. They care most about reliability and communication."
      }
    ],
    rejectionInsights: [
      "45% missed out due to weak examples of cross-team communication.",
      "34% could not describe how they stay organized under pressure.",
      "Top improvement: bring one concrete scheduling or coordination example."
    ]
  },
  {
    id: "j5",
    company: "NovaLearn",
    role: "Student Success Co-op",
    salary: 28,
    deadline: "2026-04-12",
    location: "Toronto",
    industry: "Technology",
    requirements: ["Customer service", "Communication", "Research", "Presentation"],
    learnable: ["CRM"],
    reviews: [
      {
        from: "4A Psychology",
        interview: "Medium",
        dayToDay: "Student onboarding calls, issue triage, resource creation",
        quote: "Empathy and clear communication mattered more than prior platform knowledge."
      }
    ],
    rejectionInsights: [
      "53% could not show examples of handling difficult conversations.",
      "31% lacked evidence of initiative in past team settings.",
      "Top improvement: prepare one story about resolving a user problem end-to-end."
    ]
  },
  {
    id: "j6",
    company: "Civic Transit Office",
    role: "Policy Research Co-op",
    salary: 30,
    deadline: "2026-04-09",
    location: "Toronto",
    industry: "Public Sector",
    requirements: ["Research", "Writing", "Presentation", "Policy analysis"],
    learnable: ["Public consultation process"],
    reviews: [
      {
        from: "3A Political Science",
        interview: "Medium",
        dayToDay: "Briefing notes, stakeholder scans, policy memo drafts",
        quote: "Expect scenario questions about balancing evidence with practical constraints."
      }
    ],
    rejectionInsights: [
      "49% of candidates lacked policy writing samples.",
      "36% could not connect research findings to actionable recommendations.",
      "Top improvement: bring one concise briefing note sample to discuss."
    ]
  }
];

export const STATUS_COLUMNS = ["Saved", "Applied", "Interviewing", "Offer", "Rejected"];

export const PEER_CHANNELS = [
  {
    id: "c1",
    jobId: "j1",
    company: "Northbeam Insights",
    role: "Data Analyst Co-op",
    mentor: "Avery (4A Statistics)",
    gradYear: "2027",
    responseTime: "Usually replies in 2-4h",
    tags: ["Case interview", "Data storytelling", "Reporting"],
    messages: [
      {
        from: "mentor",
        text: "Happy to help. Ask me anything about interview prep or team culture.",
        time: "09:12"
      },
      {
        from: "student",
        text: "Was presenting findings part of the interview?",
        time: "09:15"
      },
      {
        from: "mentor",
        text: "Yes. I had to explain a mini case and walk through my recommendation clearly.",
        time: "09:19"
      }
    ]
  },
  {
    id: "c2",
    jobId: "j2",
    company: "Lattice Financial",
    role: "Operations Co-op",
    mentor: "Noah (3B AFM)",
    gradYear: "2028",
    responseTime: "Usually replies same day",
    tags: ["Process mapping", "Prioritization", "Cross-team communication"],
    messages: [
      {
        from: "mentor",
        text: "If you want, I can review one STAR story before your interview.",
        time: "13:03"
      }
    ]
  },
  {
    id: "c3",
    jobId: "j4",
    company: "Maple Health Systems",
    role: "Program Coordination Co-op",
    mentor: "Sana (4B Health Studies)",
    gradYear: "2026",
    responseTime: "Usually replies in < 1h",
    tags: ["Interview prep", "Healthcare admin", "Team fit"],
    messages: [
      {
        from: "mentor",
        text: "Interview was collaborative. Bring one project where you coordinated multiple stakeholders.",
        time: "18:42"
      }
    ]
  },
  {
    id: "c4",
    jobId: "j6",
    company: "Civic Transit Office",
    role: "Policy Research Co-op",
    mentor: "Maya (4A Political Science)",
    gradYear: "2027",
    responseTime: "Usually replies in 1-2h",
    tags: ["Policy writing", "Public sector", "Research methods"],
    messages: [
      {
        from: "mentor",
        text: "Bring one writing sample. They ask how you turn evidence into practical recommendations.",
        time: "10:21"
      }
    ]
  }
];
