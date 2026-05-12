// All notebook content lives here. Edit this file to update the portfolio —
// components only handle layout, not copy.

export type Project = {
  caseNo: string;
  title: string;
  problem: string;
  approach: string;
  stack: string[];
  result: string;
  note?: string;
  href?: string;
  underlineD: string;
  underlineViewBox?: string;
};

export type ExperienceEntry = {
  start: string;
  end: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
  tech?: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
  style: "checklist" | "stamps";
};

export type SocialLink = {
  key: string;
  label: string;
  href: string;
  display: string;
};

export const site = {
  name: "Subash Singh Dhami",
  shortName: "Subash.",
  role: "Software Engineer",
  tagline:
    "Backend engineer. Writes systems, breaks them, fixes them again — mostly Java and Spring Boot, with Flutter and React when the work spills past the API.",
  description:
    "Handwritten-notebook portfolio of Subash Singh Dhami — a backend engineer in Kathmandu writing Java and Spring Boot services, with Flutter and React when the work spills past the API.",
  url: "https://subashsdhami.com.np",
  location: "Kathmandu, Nepal",
  email: "subashdhamee@gmail.com",
  entryDate: "May 12th, 2026",
  entryNo: 42,
  notebookNo: "07",
  lastEntry: "May 12 2026",
  copyrightYear: "MMXXVI",
  resume: {
    href: "/assets/Subash_Singh_Dhami_Resume.pdf",
    filename: "Subash_Singh_Dhami_Resume.pdf",
    label: "résumé / cv",
  },
};

export const nav = [
  { href: "/#about", label: "about" },
  { href: "/#skills", label: "skills" },
  { href: "/#projects", label: "projects" },
  { href: "/#experience", label: "experience" },
  { href: "/journal", label: "journal" },
  { href: "/#contact", label: "contact" },
];

export const about = {
  heading: "A note about me.",
  sectionLabel: "II · about the author",
  paragraphs: [
    "I build the parts of software that nobody is supposed to notice — the queues, the indexes, the migrations that run at 3am without paging anyone. Mostly in Java and Spring Boot, mostly on systems where requests have to land in the right order and the database has to still be there in the morning. I like the quiet kind of engineering: small interfaces, boring relational schemas, observability you could explain to your mother.",
    "Currently writing production-grade backend services at Himalayan Guardian Nepal — REST APIs that have to scale honestly, stay up while doing it, and be kind to the next person who reads the code. Before that I interned at Neoyaan and InnoByte, shipping APIs, designing databases, and learning that the deploy pipeline is part of the system, not a side quest. On my own time I built Yugo, a microservices-based public-transport platform that's live and serving riders.",
    "When the work spills past the API, I write the Flutter app or the React frontend that consumes it — but the centre of gravity is always the backend. I keep a notebook because the screen forgets — this is some of it.",
  ],
  signoff: "— S.",
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages I reach for",
    style: "checklist",
    items: ["Java", "JavaScript / TypeScript", "Dart", "Python", "SQL"],
  },
  {
    label: "Backend & APIs",
    style: "stamps",
    items: [
      "Spring Boot",
      "Node.js",
      "Express",
      "Next.js (API routes)",
      "FastAPI",
      "REST APIs",
    ],
  },
  {
    label: "Mobile & frontend",
    style: "stamps",
    items: ["Flutter", "Android", "React", "Next.js", "Tailwind"],
  },
  {
    label: "Datastores & messaging",
    style: "stamps",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "RabbitMQ"],
  },
  {
    label: "ML & data",
    style: "stamps",
    items: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Streamlit"],
  },
  {
    label: "Infrastructure & runtime",
    style: "stamps",
    items: ["Docker", "AWS", "Nginx", "Linux", "VPS", "Git", "CI/CD"],
  },
];

export const projects: Project[] = [
  {
    caseNo: "case study i.",
    title: "Yugo — Smart Mobility Platform",
    problem:
      "Public transport in Kathmandu lacked a clean digital fare-collection layer for riders and operators.",
    approach:
      "Built a microservices backend in Spring Boot with a Flutter rider app and wallet integration; QR-based fares, async messaging, and per-service data ownership.",
    stack: ["Flutter", "Spring Boot", "PostgreSQL", "Microservices"],
    result: "Live platform serving real riders, with each service deployable on its own.",
    note: "note to self — microservices only pay off after the service boundaries stop moving.",
    href: "https://yugo.subashsdhami.com.np/",
    underlineD: "M 2 6 C 30 2, 80 10, 130 5 C 170 1, 200 8, 218 5",
    underlineViewBox: "0 0 220 12",
  },
  {
    caseNo: "case study ii.",
    title: "QuizMaster",
    problem: "Needed a full-stack quiz app with real authentication and an admin surface.",
    approach:
      "Spring Boot backend with token-based auth, Next.js frontend, real-time scoring, and an admin panel for question/quiz management.",
    stack: ["Spring Boot", "Next.js", "PostgreSQL", "Auth"],
    result: "Working quiz platform with sign-in, scoring, and content management.",
    note: "note to self — auth is the part that looks easy until you ship it.",
    href: "https://quizapp.subashsdhami.com.np/",
    underlineD: "M 2 7 C 40 3, 100 11, 160 6 C 200 2, 220 9, 238 6",
    underlineViewBox: "0 0 240 12",
  },
  {
    caseNo: "case study iii.",
    title: "Khojdu — Rental Platform",
    problem:
      "Renters in Kathmandu Valley had no single place to find rooms and flats with reliable filters.",
    approach:
      "Spring Boot + PostgreSQL backend with Redis caching for hot listings, Next.js frontend, and clean search/filter primitives.",
    stack: ["Spring Boot", "Next.js", "PostgreSQL", "Redis"],
    result: "Responsive rental platform with cached search and a maintainable listing model.",
    note: "note to self — cache the read path, not the write path.",
    href: "https://khojdu.subashsdhami.com.np/",
    underlineD: "M 2 6 C 40 11, 90 2, 140 7 C 180 11, 210 4, 228 7",
    underlineViewBox: "0 0 230 12",
  },
  {
    caseNo: "case study iv.",
    title: "SMS Spam Detection",
    problem: "Wanted a working spam classifier that someone could actually try in the browser.",
    approach:
      "Trained a Bi-LSTM model in TensorFlow, wrapped inference in FastAPI, and shipped a Streamlit frontend behind Docker.",
    stack: ["Python", "TensorFlow", "FastAPI", "Docker"],
    result: "End-to-end ML demo — model, API, UI, and container — all in one repo.",
    note: "note to self — half of ML in production is the part that isn't ML.",
    href: "https://github.com/mesubash/sms-spam-detection",
    underlineD: "M 2 6 C 30 10, 80 3, 130 7 C 170 10, 200 4, 218 7",
    underlineViewBox: "0 0 220 12",
  },
  {
    caseNo: "case study v.",
    title: "Library Management System",
    problem: "A small library needed book tracking, user records, and borrowing history.",
    approach:
      "Spring Boot REST API with a React frontend; search, borrowing flow, and user management built around a clean relational schema.",
    stack: ["Spring Boot", "React", "MySQL", "REST APIs"],
    result: "Working library system with search, borrowing, and admin views.",
    note: "note to self — the schema is the product more often than I'd like to admit.",
    href: "https://lms.subashsdhami.com.np/",
    underlineD: "M 2 7 C 50 3, 110 10, 170 6 C 210 3, 230 9, 248 6",
    underlineViewBox: "0 0 250 12",
  },
];

export const experience: ExperienceEntry[] = [
  {
    start: "Oct 2025",
    end: "present",
    role: "Backend Engineer",
    company: "Himalayan Guardian Nepal",
    location: "Kathmandu, Nepal",
    bullets: [
      "Build and maintain Java/Spring Boot services backed by PostgreSQL for complex business workflows.",
      "Lead system design and REST API architecture across multiple services.",
      "Own DevOps for the backend — Docker images, Nginx, deploy pipelines.",
    ],
    tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Nginx"],
  },
  {
    start: "Jul 2025",
    end: "Oct 2025",
    role: "Full-Stack Developer Intern",
    company: "Neoyaan Ltd",
    location: "Kathmandu, Nepal",
    bullets: [
      "Shipped production features using Next.js, Node/Express, and PostgreSQL.",
      "Designed and integrated APIs for complex business workflows.",
      "Picked up the DevOps tooling — Docker, Nginx — needed to get changes live.",
    ],
    tech: ["Next.js", "Node/Express", "PostgreSQL", "Docker", "Nginx"],
  },
  {
    start: "Apr 2025",
    end: "Apr 2025",
    role: "Java Developer Intern",
    company: "InnoByte Services",
    location: "Remote, India",
    bullets: [
      "Built a full-stack web application using Spring Boot, MySQL, and Next.js.",
      "Implemented REST APIs and authentication modules end-to-end.",
    ],
    tech: ["Spring Boot", "MySQL", "Next.js", "REST APIs"],
  },
];

export const education = {
  degree: "B.E. in Software Engineering",
  university: "Pokhara University",
  expected: "2026",
  coursework: "OOP, DSA, AI/ML, Cloud Computing, Agile",
};

export const certifications = [
  "AWS Academy Cloud Architecting",
  "AWS Academy Cloud Foundations",
];

export const socials: SocialLink[] = [
  {
    key: "email",
    label: "email",
    href: "mailto:subashdhamee@gmail.com",
    display: "subashdhamee [at] gmail.com",
  },
  {
    key: "github",
    label: "github",
    href: "https://github.com/mesubash",
    display: "github.com/mesubash",
  },
  {
    key: "linkedin",
    label: "linkedin",
    href: "https://www.linkedin.com/in/subashsdhami/",
    display: "linkedin.com/in/subashsdhami",
  },
  {
    key: "x",
    label: "x / twitter",
    href: "https://x.com/subashdhamee",
    display: "@subashdhamee",
  },
  {
    key: "instagram",
    label: "instagram",
    href: "https://www.instagram.com/da.subashh/",
    display: "@da.subashh",
  },
  {
    key: "writing",
    label: "writing",
    href: "https://subashsdhami.com.np",
    display: "subashsdhami.com.np",
  },
  {
    key: "resume",
    label: "résumé",
    href: "/assets/Subash_Singh_Dhami_Resume.pdf",
    display: "Subash_Singh_Dhami_Resume.pdf",
  },
];
