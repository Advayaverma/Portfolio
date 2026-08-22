export const profile = {
  name: "Advaya Verma",
  email: "advaya2208@gmail.com",
  phone: "+91 9319200479",
  tagline: "Final-year Computer Science student · ML, Backend & Frontend",
  summary:
    "Final-year Computer Science undergraduate at VIT-AP with hands-on experience in machine learning, NLP, backend development, and frontend engineering, including an AI Engineering internship at IDM Valley building LLM-powered features and RAG pipelines. Proficient in Python, REST APIs, and cloud-native tools including Docker and FastAPI, with experience building responsive, interactive interfaces using React, HTML, CSS, and JavaScript. Oracle-certified Generative AI professional with a strong foundation in data structures, algorithms, and software engineering principles. Seeking software engineering or ML roles to apply skills in real-world AI, backend, and full-stack projects.",
  resumeFile: "/Advaya_Verma_resume_v3.pdf",
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
  { id: "experience", label: "Experience" },
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
    "LLMs",
    "RAG",
    "Prompt Engineering",
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
    title: "Production-Style RAG Knowledge Assistant",
    tech: [
      "Python",
      "FastAPI",
      "FAISS",
      "Sentence Transformers",
      "BM25",
      "Cross-Encoder",
      "Gemini API",
      "RAG",
    ],
    description:
      "A production-grade Retrieval-Augmented Generation (RAG) assistant featuring two-stage hybrid search (FAISS dense vectors + BM25Okapi sparse keywords), Cross-Encoder reranking, and Gemini 1.5 Flash grounded QA with source citations.",
    highlights: [
      "Engineered a two-stage hybrid retrieval pipeline combining FAISS dense vector search (all-MiniLM-L6-v2) and a custom BM25Okapi inverted index using Reciprocal Rank Fusion (RRF) and Alpha score fusion.",
      "Integrated cross-encoder reranking (ms-marco-MiniLM-L-6-v2) for deep query-passage cross-attention, significantly improving top-k precision for ambiguous and nuanced queries.",
      "Built modular ingestion and sliding-window chunking pipelines with page-aware PDF/text parsing and 384-dimensional embedding generation.",
      "Implemented prompt grounding and citation mapping with Gemini 1.5 Flash to eliminate hallucinations and return structured source citations via FastAPI REST endpoints.",
    ],
    github: "https://github.com/Advayaverma/Production-Style-RAG-Knowledge-Assistant",
    demo: "",
  },
  {
    title: "Social Media Content Analyzer",
    tech: ["Python", "FastAPI", "React", "Tailwind CSS", "Docker", "PyMuPDF", "Tesseract OCR"],
    description:
      "A full-stack document and image analysis platform that extracts text from PDFs and images via OCR, performing deterministic engagement analysis and readability scoring for social media optimization.",
    highlights: [
      "Developed a full-stack content review platform using FastAPI and React (Vite + Tailwind CSS) to extract, analyze, and optimize drafts from PDFs and images.",
      "Integrated PyMuPDF for multi-page PDF parsing and Tesseract OCR (via Pillow and pytesseract) for robust optical character recognition across image uploads.",
      "Engineered a deterministic analysis engine evaluating Flesch readability scores, sentiment categorization, and engagement signals (hook strength, CTA detection, and hashtag density).",
      "Containerized the entire application with Docker and Docker Compose with pre-configured OCR engines for streamlined, portable deployment.",
    ],
    github: "https://github.com/Advayaverma/Social-Media-Content-Analyzer",
    demo: "",
  },
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
    title: "Stock Analysis & Price Prediction",
    tech: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "yfinance",
      "Matplotlib",
      "Docker",
    ],
    description:
      "An end-to-end financial analytics and machine learning pipeline that fetches historical market data, engineers technical indicators, and trains predictive models to forecast stock price trends.",
    highlights: [
      "Automated historical OHLCV market data collection and local caching via yfinance across configurable tickers and time horizons.",
      "Engineered technical trading indicators including SMA, EMA, RSI, MACD, Bollinger Bands, and rolling volatility metrics using Pandas and NumPy.",
      "Trained and evaluated multiple ML models (Ridge Regression, Random Forest, Gradient Boosting) using RMSE, MAE, and R² scores with automated best-model selection.",
      "Generated visual analytics including feature correlation heatmaps and price trajectory comparisons, containerized with Docker for reproducible execution.",
    ],
    github: "https://github.com/Advayaverma/Stock-Analysis-Prediction",
    demo: "",
  },
  {
    title: "Chemical Risk Analyzer",
    tech: ["Python", "FastAPI", "SQLite", "SQLAlchemy", "HTML", "CSS", "JavaScript"],
    description:
      "A regulatory chemical risk profiling system for food products and cosmetics under FSSAI and CDSCO guidelines, featuring a FastAPI backend and a responsive Single-Page Application (SPA) dashboard.",
    highlights: [
      "Developed a rule-based chemical risk assessment platform with SQLite, SQLAlchemy, and FastAPI to profile products against FSSAI and CDSCO regulations.",
      "Built an interactive, responsive Single-Page Application (SPA) dashboard using HTML, CSS, and Vanilla JavaScript to visualize key system stats, scanned products, and flagged risks.",
      "Implemented an automated regex-based parsing and cleaning engine to match ingredient lists against 17+ regulated substances and calculate safety grades (A-F).",
      "Exposed structured REST endpoints (documented via Swagger UI) for CRUD operations on chemical regulations, real-time ad-hoc analysis, and automated database seeding.",
    ],
    github: "https://github.com/Advayaverma/Chemical-Risk-Analyzer",
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

export const experience = [
  {
    company: "IDM Valley",
    role: "AI Engineering Intern",
    period: "Apr 2026 – Jun 2026",
    location: "Faridabad, Haryana",
    tech: [
      "Python",
      "LLMs",
      "Generative AI",
      "RAG",
      "Embeddings",
      "Vector Databases",
    ],
    highlights: [
      "Assisted in building and deploying AI/ML models for real-world applications.",
      "Developed AI-powered features using Large Language Models (LLMs) and Generative AI.",
      "Collected, cleaned, and preprocessed datasets for model training and evaluation.",
      "Wrote clean, efficient, and well-documented Python code following best practices.",
      "Integrated AI models with web applications and backend APIs.",
      "Experimented with prompt engineering, embeddings, Retrieval-Augmented Generation (RAG), and vector databases.",
    ],
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
  {
    title: "Hashgraph Developer Course",
    issuer: "The Hashgraph Association",
    date: "Mar 2026",
  },
];
