export const KEYWORD_SKILLS = [
  "java",
  "python",
  "sql",
  "javascript",
  "typescript",
  "react",
  "node",
  "c",
  "c++",
  "go",
  "git",
  "aws",
  "docker",
  "figma",
  "kotlin",
  "swift"
];

export const KEYWORD_COURSES = [
  "data structures",
  "algorithms",
  "databases",
  "operating systems",
  "object-oriented programming",
  "software engineering",
  "computer networks",
  "machine learning"
];

export const INDUSTRIES = ["FinTech", "Game Dev", "HealthTech", "EdTech", "SaaS", "AI/ML"];

export const JOBS = [
  {
    id: "j1",
    company: "Northbeam Analytics",
    role: "Software Developer Intern",
    salary: 34,
    deadline: "2026-04-02",
    location: "Waterloo",
    industry: "SaaS",
    requirements: ["Java", "SQL", "Git", "Data Structures"],
    learnable: ["Spring Boot"],
    reviews: [
      {
        from: "3B CS",
        interview: "Medium",
        stack: "Java, Postgres, React",
        quote: "Two technical rounds and one behavioral. They care about clean code and communication."
      },
      {
        from: "4A CS",
        interview: "Hard",
        stack: "Java, Kafka",
        quote: "System design lite. Not impossible, but prep your concurrency basics."
      }
    ],
    rejectionInsights: [
      "60% of rejected candidates lacked advanced SQL query depth.",
      "41% struggled to explain tradeoffs in past projects.",
      "Top improvement: prepare one end-to-end project story with measurable impact."
    ]
  },
  {
    id: "j2",
    company: "Lattice FinPay",
    role: "Backend Co-op",
    salary: 38,
    deadline: "2026-03-31",
    location: "Toronto",
    industry: "FinTech",
    requirements: ["Python", "SQL", "APIs", "Databases"],
    learnable: ["Kafka", "Redis"],
    reviews: [
      {
        from: "3A CS",
        interview: "Medium",
        stack: "Python, Flask, AWS",
        quote: "Take-home was fair and focused on API design plus testing."
      }
    ],
    rejectionInsights: [
      "52% of rejections came from weak API design explanations.",
      "35% did not demonstrate debugging process clearly.",
      "Top improvement: practice writing test cases before coding."
    ]
  },
  {
    id: "j3",
    company: "Pixel Grove Studios",
    role: "Gameplay Programmer Intern",
    salary: 30,
    deadline: "2026-04-10",
    location: "Remote",
    industry: "Game Dev",
    requirements: ["C++", "Math", "Debugging", "Algorithms"],
    learnable: ["Unreal Engine"],
    reviews: [
      {
        from: "2B CS",
        interview: "Hard",
        stack: "C++, Unreal",
        quote: "Expect vector math and optimization questions. Great mentorship culture though."
      }
    ],
    rejectionInsights: [
      "64% of rejected applicants could not optimize naive algorithms.",
      "48% were unfamiliar with memory profiling tools.",
      "Top improvement: build one polished gameplay demo and discuss performance choices."
    ]
  },
  {
    id: "j4",
    company: "Maple Health Systems",
    role: "Full-Stack Developer Co-op",
    salary: 33,
    deadline: "2026-04-06",
    location: "Waterloo",
    industry: "HealthTech",
    requirements: ["JavaScript", "React", "Node", "SQL"],
    learnable: ["HIPAA basics"],
    reviews: [
      {
        from: "3B CS",
        interview: "Easy",
        stack: "React, Node, Mongo",
        quote: "Friendly process, more collaboration-focused than algorithm-heavy."
      }
    ],
    rejectionInsights: [
      "46% missed out due to weak frontend state-management examples.",
      "39% lacked SQL fundamentals despite full-stack resumes.",
      "Top improvement: prepare one full-stack feature walkthrough."
    ]
  },
  {
    id: "j5",
    company: "NovaLearn",
    role: "Platform Engineering Intern",
    salary: 36,
    deadline: "2026-04-12",
    location: "Toronto",
    industry: "EdTech",
    requirements: ["Go", "Docker", "Git", "Computer Networks"],
    learnable: ["Kubernetes"],
    reviews: [
      {
        from: "4A CS",
        interview: "Medium",
        stack: "Go, Docker, GCP",
        quote: "They love candidates who can reason about reliability and incident response."
      }
    ],
    rejectionInsights: [
      "55% could not explain networking basics in distributed systems.",
      "44% had no containerization project to discuss.",
      "Top improvement: complete a small service deployment project with logs and monitoring."
    ]
  }
];

export const STATUS_COLUMNS = ["Saved", "Applied", "Interviewing", "Offer", "Rejected"];
