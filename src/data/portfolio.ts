export const profile = {
  name: "Advaya Verma",
  email: "advaya2208@gmail.com",
  phone: "+91 9319200479",
  tagline: "Final-year Computer Science student · ML, Backend & Frontend",
  summary:
    "Final-year Computer Science undergraduate at VIT-AP with hands-on experience in machine learning, NLP, backend development, and frontend engineering, including an AI Engineering internship at IDM Valley building LLM-powered features and RAG pipelines. Proficient in Python, REST APIs, and cloud-native tools including Docker and FastAPI, with experience building responsive, interactive interfaces using React, HTML, CSS, and JavaScript. Oracle-certified Generative AI professional with a strong foundation in data structures, algorithms, and software engineering principles. Seeking software engineering or ML roles to apply skills in real-world AI, backend, and full-stack projects.",
  resumeFile: "/Advaya_Verma_resume.pdf",
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
  "ML / AI": [
    "Scikit-learn",
    "NumPy",
    "Pandas",
    "Sentence Transformers",
    "FAISS",
    "NLP",
    "RAG",
    "LLMs",
    "Generative AI",
    "Vector Databases",
    "Semantic Search",
  ],
  "Web & Backend": [
    "FastAPI",
    "PostgreSQL",
    "REST APIs",
    "React",
    "Supabase",
    "MySQL",
    "HTML",
    "CSS",
  ],
  "Data Engineering": [
    "PySpark",
    "Delta Lake",
    "Medallion Architecture",
    "Kimball Star Schema",
    "SCD Type 2",
    "ETL / ELT Pipelines",
    "Data Quality & Quarantine",
    "ACID Transactions",
    "Incremental Processing / CDC",
    "Time Travel & Schema Evolution",
  ],
  "Software Engineering": [
    "Unit & Integration Testing",
    "Data Modeling",
    "Agile/Scrum",
    "Software Architecture",
    "UML",
  ],
  DevOps: ["Docker", "GitHub Actions", "CI/CD", "Vercel"],
  Languages: ["Python", "SQL", "C", "C++", "Java", "R", "JavaScript"],
};

export const projects = [
  {
    title: "Explainable Multimodal Clinical Decision Support System (AI-CDSS)",
    tech: [
      "Python",
      "FastAPI",
      "React",
      "PyTorch",
      "XGBoost",
      "FAISS",
      "Docker",
    ],
    description:
      "A full-stack, on-premise clinical decision support platform unifying EHR data, 12-lead ECGs, brain MRI, lab reports, and guideline retrieval with physician-in-the-loop explainability and automated rule verification.",
    highlights: [
      "Led a team of 4 members to build a full-stack, on-premise clinical decision support platform (FastAPI, React 18, Docker) unifying EHR data, 12-lead ECGs, brain MRI, lab reports, and guideline retrieval, with JWT role-based access and a physician-in-the-loop design.",
      "Developed a 30-day diabetic readmission XGBoost model on 101,763 encounters; cost-sensitive threshold tuning cut false alarms by 60.6% at 84.1% sensitivity, with TreeSHAP, LIME, and a counterfactual what-if sandbox for explainability.",
      "Implemented an 8-stage ECG image-to-signal pipeline with a ResNet-1D classifier (0.92 macro AUROC on PTB-XL), a ViT-Base/16 MRI classifier (95.27% accuracy), and 3D MONAI tumor segmentation with Monte Carlo Dropout uncertainty (WT Dice 0.90).",
      "Built FAISS-based RAG guideline retrieval (MiniLM-L6-v2) returning verbatim ADA/ACC-AHA text with source citations, plus a deterministic 14-chemistry lab rule engine with OCR report extraction, backed by 118+ automated tests.",
    ],
    github:
      "https://github.com/Advayaverma/Multimodal-AI-Clinical-Decision-Support-System-for-Doctors",
    demo: "",
  },
  {
    title: "GraphMind — Grounded Knowledge-Graph Q&A (MLH Hacktober 3rd Place)",
    tech: [
      "Node.js",
      "Express",
      "Gemini API",
      "Knowledge Graphs",
      "vis-network",
      "BFS Traversal",
      "REST APIs",
    ],
    description:
      "A graph-native reasoning engine built in a team of 3 for MLH Hacktoberfest (ranked 3rd overall) that extracts structured knowledge graphs from multi-format documents to answer complex multi-hop queries with exact citations and zero hallucinations.",
    highlights: [
      "Collaborated in a 3-person team for MLH Hacktoberfest to design and build a graph-native Q&A engine, earning 3rd place overall in the hackathon.",
      "Engineered an in-memory knowledge graph engine with document chunking (up to 25 MB PDFs) and Gemini-powered extraction of typed entities and directed relationships with canonical Jaccard deduplication.",
      "Implemented multi-hop reasoning using Breadth-First Search (BFS) traversal, shortest-path calculation, automated cross-document conflict/contradiction detection, and strict citation-backed hallucination abstention.",
      "Built an interactive visual canvas using vis-network featuring dynamic color-coded nodes, animated path traversal highlights, and an end-to-end 20-query enterprise benchmark suite.",
    ],
    github: "https://github.com/AdityaV33/GraphMind-Hacktober",
    demo: "https://graphmind-hacktober.onrender.com/",
  },
  {
    title: "Retail Data Engineering Pipeline — End-to-End Lakehouse Analytics",
    tech: [
      "Python",
      "PySpark",
      "Delta Lake",
      "PostgreSQL",
      "Azure Databricks",
      "Azure Data Factory",
      "ADLS Gen2",
      "Docker",
      "GitHub Actions",
    ],
    description:
      "An enterprise Medallion Lakehouse pipeline (Bronze → Silver → Gold) processing 105k+ transactional records, CRM masters, and REST API forex feeds using PySpark and Delta Lake ACID transactions, Kimball Star Schema modeling, automated quarantine validation, and Azure cloud integration.",
    highlights: [
      "Architected an enterprise Medallion Lakehouse pipeline (Bronze → Silver → Gold) ingesting 105k+ transactional records, CRM masters, and REST API forex feeds using Python, PySpark, and Delta Lake ACID transactions.",
      "Engineered an automated Data Quality & Quarantine framework enforcing atomic validation rules (nulls, ranges, timestamps, foreign key referential integrity), isolating 1,100 defective records (1.05%) with defect codes and achieving a 98.95% clean data SLA pass rate.",
      "Implemented a Kimball Dimensional Star Schema with SCD Type 2 for customer demographics and segment tracking (10,500 active + 249 historical audit records) and constructed fact_sales across 104k+ transactions with surrogate keys.",
      "Designed Day-2 incremental processing with Delta Lake MERGE and schema evolution, achieving sub-minute DAG orchestration across 7 pipeline stages, validated by 77 automated unit/integration tests, Dockerized with PostgreSQL healthchecks, and mapped to Azure Data Factory & ADLS Gen2.",
    ],
    github: "https://github.com/Advayaverma/Retail-Data-Engineering-Pipeline-End-to-End-ETL-Lakehouse-Analytics",
    demo: "",
  },
  {
    title: "Digital Library Cloud Platform",
    tech: [
      "React 18",
      "Vite",
      "Supabase",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
    ],
    description:
      "A cloud-native digital library platform migrated from a static site to a modern React 18 & Vite SPA, featuring ACID-compliant concurrency control, GoTrue RBAC authentication, and automated CI/CD.",
    highlights: [
      "Architected & Migrated Full-Stack Platform: Migrated legacy static application into a modern React 18 & Vite SPA with React Router, implementing modular component architecture, Context API state management, and real-time catalog search.",
      "Database & Concurrency Engineering: Built a relational backend on Supabase (PostgreSQL) with partial unique indexes (unique_active_book_borrowing) to eliminate double-borrow race conditions across concurrent users.",
      "Authentication & Role-Based Access Control (RBAC): Integrated Supabase GoTrue Auth and database Row-Level Security (RLS), supporting dual-identifier login (Username/Email via PL/pgSQL RPC) and route-level protection for members and admins.",
      "Testing & Automated CI/CD: Established zero-dependency automated unit/service test suites (node:test), multi-stage Docker containerization (Alpine/Nginx), and GitHub Actions CI pipelines with edge deployment on Vercel.",
    ],
    github: "https://github.com/Advayaverma/Digital-library",
    demo: "https://digital-library-opal.vercel.app/",
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
      "Applied semantic search and information-retrieval concepts from prior project work to develop and experiment with Retrieval-Augmented Generation (RAG) workflows for LLM-based applications.",
      "Worked with text embeddings, document retrieval, and vector databases to build retrieval pipelines for supplying relevant context to language models.",
      "Experimented with prompt engineering and context integration to improve the quality and relevance of LLM-generated responses.",
      "Used Python for data preprocessing, retrieval workflow development, experimentation, and integration of AI components with application backends.",
      "Created technical documentation covering RAG workflows, implementation approaches, configuration, and usage guidelines to support development and knowledge sharing.",
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
  {
    title:
      "Hacktoberfest 26 — Certificate of Achievement (Winner: Grounded Knowledge-Graph Q&A, GraphMind)",
    issuer:
      "Hacktoberfest Hack Day Amaravati × AIBPT Club - VIT-AP (MLH × DEV · DigitalOcean)",
    date: "Oct 2026",
  },
];
