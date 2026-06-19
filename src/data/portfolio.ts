export const profile = {
  name: "Advaya Verma",
  email: "advaya2208@gmail.com",
  phone: "+91 9319200479",
  tagline: "Final-year Computer Science student · ML, Backend & Frontend",
  summary:
    "Final-year Computer Science undergraduate at VIT-AP with hands-on experience in machine learning, NLP, backend development, and frontend engineering. Proficient in Python, REST APIs, and cloud-native tools including Docker and FastAPI, with experience building responsive, interactive interfaces using React, HTML, CSS, and JavaScript. Oracle-certified Generative AI professional with a strong foundation in data structures, algorithms, and software engineering principles. Seeking a software engineering or ML internship to apply skills in real-world AI, backend, and full-stack projects.",
  resumeFile: "/Advaya_Verma_Resume_v1.pdf",
  links: {
    linkedin: "http://www.linkedin.com/in/advaya-verma-b49249285",
    github: "https://github.com/Advayaverma",
    leetcode: "https://leetcode.com/u/advaya_verma/",
  },
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export const skills = {
  Languages: ["Python", "C", "C++", "Java", "R", "JavaScript"],
  "Web & Backend": ["HTML", "CSS", "React", "FastAPI", "REST APIs"],
  "ML / AI": [
    "Scikit-learn",
    "NumPy",
    "Pandas",
    "Sentence Transformers",
    "FAISS",
  ],
  "Tools & Platforms": [
    "Docker",
    "Git",
    "GitHub",
    "MySQL",
    "Oracle Cloud Infrastructure",
  ],
  Concepts: [
    "NLP",
    "Semantic Search",
    "Clustering",
    "Agile/Scrum",
    "Software Engineering",
    "UML",
  ],
};

export const projects = [
  {
    title: "Semantic Search System",
    tech: ["Python", "FastAPI", "FAISS", "Docker", "NLP", "Scikit-learn"],
    description:
      "A semantic search pipeline using Sentence Transformers and FAISS with GMM-based fuzzy clustering and a semantic cache layer for sub-100ms retrieval.",
    highlights: [
      "Built a semantic search pipeline using Sentence Transformers (MiniLM-L6-v2) and FAISS, achieving sub-100ms nearest-neighbor retrieval over 18,000+ documents from the 20 Newsgroups dataset.",
      "Implemented Gaussian Mixture Model (GMM)-based fuzzy clustering to assign probabilistic multi-topic memberships to documents, improving retrieval relevance for ambiguous queries.",
      "Designed a semantic cache layer to detect similar queries and reuse results, reducing redundant API calls and cutting average response time by ~40%.",
      "Exposed REST API endpoints via FastAPI and containerized the full application using Docker, enabling one-command portable deployment.",
    ],
    github: "https://github.com/Advayaverma/Semantic-Search-System",
    demo: "",
  },
  {
    title: "Digital Library Web App",
    tech: ["HTML", "CSS", "JavaScript"],
    description:
      "A fully client-side digital library with JSON-based local storage, responsive UI, and real-time search — deployed on GitHub Pages.",
    highlights: [
      "Developed a fully client-side digital library system with JSON-based local storage, supporting CRUD operations (add, search, update, delete) for book records.",
      "Built a responsive UI with real-time search and filtering, enabling efficient book management without a backend dependency.",
      "Deployed as a GitHub Pages static site, demonstrating end-to-end ownership from development to deployment.",
    ],
    github: "https://github.com/Advayaverma/Digital-library.git",
    demo: "https://advayaverma.github.io/Digital-library/",
  },
];

export const education = [
  {
    institution: "Vellore Institute of Technology, Andhra Pradesh",
    degree: "B. Tech, Computer Science and Engineering",
    period: "2023 – 2027",
    details: "CGPA: 8.1",
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "DBMS",
      "OOP",
      "Machine Learning",
      "Artificial Intelligence",
      "Software Engineering & UML",
      "Theory of Computation",
      "Compiler Design",
      "Design & Analysis of Algorithms",
    ],
  },
  {
    institution: "Ryan International School, Faridabad",
    degree: "Senior Secondary (Class XII) — CBSE",
    period: "2023",
    details: null,
    coursework: [],
  },
  {
    institution: "Ryan International School, Faridabad",
    degree: "Secondary (Class X) — CBSE",
    period: "2021",
    details: null,
    coursework: [],
  },
];

export const certifications = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle University",
    date: "Oct 2025",
  },
];
