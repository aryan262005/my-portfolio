/**
 * PORTFOLIO CONFIGURATION DATA
 * -------------------------------------------------------------
 * All data is structured with clear, elegant placeholders so you can easily
 * replace them with your actual details, projects, skills, and links.
 *
 * IMPORTANT: No personal information or fake achievements are assumed.
 * Simply replace the [BRACKETED] values below with your real information!
 */

export const personalInfo = {
  name: "ARYAN MAHANTY",
  avatarUrl: "Aryan.png", // Place your photo at public/avatar.png or update this URL
  handle: "@aryan",
  title: "[SDE | ML Engineer | Data Scientist | AI Developer | Prompt Engineer]",
  tagline: "[Building intelligent systems at the intersection of sofware engineering , machine learning and artificial intelligence]",
  status: "Available for Full-time Roles & High-Impact Projects",
  location: "[Bhubaneswar , Odisha / IST Timezone]",
  availability: "[Immediately / 2026]",
  workAuthorization: "[Open to Remote, Relocation & Hybrid]",
  email: "ambbsr26@gmail.com",
  github: "https://github.com/aryan262005",
  linkedin: "https://linkedin.com/in/aryan-mahanty26",
  leetcode: "https://leetcode.com/u/Aryancoder2626",
  instagram: "https://instagram.com/aryan.meranaam",
  resumeUrl: "/certificates/RESUME.pdf", // Add your PDF resume link here
  
  // Quick 1-line elevator pitch for recruiters
  elevatorPitch: "[Full-stack creative developer specializing in modern web architecture, interactive 3D/canvas experiences, and high-performance user interfaces.]",

  // Mini biography or creative manifesto (keep punchy and authentic)
  manifesto: [
    "[I believe exceptional digital products live at the sweet spot where engineering rigor meets artistic personality.]",
    "[Obsessed with performance, micro-interactions, responsive fluidity, and building tools that leave an indelible impression on users.]"
  ]
};

export const quickStats = [
];

export const projectCategories = [
  "All",
  "AI & Machine Learning",
  "Data Science & Machine Learning",
  "FinTech & InsurTech"
];

export const projectsData = [
  {
    id: "project-01",
    title: "[PROJECT 01: Hirenix — AI-Powered Recruitment & Resume Ranking System]",
    slug: "hirenix",
    category: "AI & Machine Learning",
    featured: true,
    status: "PRODUCTION READY",
    auraTag: "AI RECRUITMENT",
    tagline: "[AI-Powered Screening for Smarter Hiring]",
    description: "[description: An AI-powered resume analysis platform that helps job seekers evaluate their resumes against job descriptions, identify missing skills, assess ATS compatibility and receive personalized recommendations to improve their resumes and increase their chances of getting shortlisted.]",
    highlights: [
        "Analyzes resumes to identify key skills, education, experience, and qualifications.",
        "Matches resume content with job descriptions to identify relevant skills and potential skill gaps.",
        "Provides AI-powered feedback and actionable suggestions to improve resume quality and job readiness."
    ],
    
    techStack: ["Python", "Streamlit", "Machine Learning", "Natural Language Processing"],
    githubUrl: "https://github.com/aryan262005/AI-Resume-Intelligence-System",
    liveUrl: "https://ai-resume-intelligence-system-l4trucnkhhhdevbjuaegux.streamlit.app/",
    accentColor: "#ff6b3d",
    cardTheme: "sakura",
    architecture: {
    problem: "[Recruiters struggle to manually review and shortlist thousands of resumes efficiently.]",

    solution: "[Developed an AI-powered recruitment system that processes multiple resumes in bulk, matches candidates against job requirements, and ranks them by relevance to simplify shortlisting.]",

    keyDecisions: [
      "[Implemented bulk resume processing to analyze multiple candidates efficiently.]",
      "[Used NLP and skill matching to evaluate resumes against job descriptions.]",
      "[Generated candidate rankings to help recruiters identify suitable applicants faster.]"
    ],

  impact: "[Streamlines resume screening, reduces manual effort and helps recruiters prioritize relevant candidates.]"
}
  },
  {
    id: "project-02",
    title: "[PROJECT 02:Trader Behavior & Sentiment Analysis]",
    slug: "trader-behavior-sentiment-analysis",
    category: "Data Science & Machine Learning",
    featured: true,
    status: "COMPLETED",
    auraTag: "DATA ANALYTICS",
    tagline: "[Analyzing trader performance and behavioral patterns across market sentiment regimes.]",
    description: "[A data-driven analytics platform exploring how Fear and Greed market sentiment influences trader profitability, trading frequency and long/short positioning using Python, machine learning and interactive visualizations.]",
    highlights: [
      ["Analyzed trader PnL and win rates across Fear and Greed sentiment regimes."],
      ["Compared frequent and infrequent traders to identify behavioral performance patterns."],
      ["Applied KMeans clustering to segment traders into distinct behavioral archetypes."]
    ],
    metrics: [
    { label: "ML Algorithm", value: "KMeans Clustering" },
    { label: "Analysis Focus", value: "Fear vs. Greed" },
    { label: "Dashboard", value: "Interactive" }
    ],
    techStack: ["Python","Pandas","NumPy","Scikit-learn","Streamlit","Data Visualization"],
    githubUrl: "https://github.com/aryan262005/trader-behavior-sentiment-analysis",
    accentColor: "#00f2fe",
    cardTheme: "cyan",
    architecture: {
      problem: "[Understanding how market sentiment affects trader performance and whether distinct trading behavior patterns can be identified from historical trading data]",
      solution: "[Developed a data analysis and machine learning workflow to compare trader performance across sentiment regimes, segment trading behaviors and present findings through an interactive Streamlit dashboard.]",
      keyDecisions: [
        "[Compared PnL and win rates across Fear, Greed, and other available sentiment categories.]",
        "[Segmented traders by trading frequency and analyzed long/short positioning patterns.]",
        "[Used KMeans clustering to discover behavioral groups from selected trader performance features.]"
      ],
      impact: "[Created an interactive analytics dashboard that helps explore relationships between market sentiment, trader performance and trading behavior.]"
    }
  },
  {
  id: "project-03",
  title: "PROJECT 03: AI STUDY ASSISTANT",
  slug: "ai-study-assistant",
  category: "AI & Machine Learning",
  featured: true,
  status: "AI-MODEL",
  auraTag: "RAG SYSTEM",
  tagline: "RAG-based study assistant that answers questions straight from your own notes and PDFs.",
  description: "An AI-powered study assistant that ingests study material, indexes it in a vector database and gives context-grounded answers through a simple Streamlit interface.",
  highlights: [
    "Built an end-to-end RAG pipeline with LlamaIndex for ingestion, chunking and retrieval.",
    "Used Cohere for embeddings and answer generation with Pinecone as the vector store.",
    "Deployed the full app on Streamlit Community Cloud as the capstone of the Celebal internship."
  ],
  metrics: [
    { label: "Pipeline", value: "RAG" },
    { label: "Vector DB", value: "Pinecone" },
    { label: "Deployment", value: "Live on Streamlit Cloud" }
  ],
  techStack: ["Python", "LlamaIndex", "Cohere", "Pinecone", "Streamlit", "PyMuPDF"],
  githubUrl: "https://github.com/aryan262005/CEI_Assignments_Aryan-Mahanty_2026/tree/main/CEI_Final_Project",
  liveUrl: "https://ceiassignmentsaryan-mahanty2026-26neqqyzw4xtcer2fjluj9.streamlit.app/",
  accentColor: "#10b981",
  cardTheme: "emerald",
  architecture: {
    problem: "Students waste time searching through long PDFs and notes to find one answer, and generic chatbots hallucinate when they have no access to the actual material.",
    solution: "Indexed the study material as embeddings in Pinecone and used LlamaIndex to retrieve the relevant chunks, so Cohere generates answers grounded in the uploaded content.",
    keyDecisions: [
      "Used PyMuPDF for reliable PDF text extraction after other parsers gave messy output.",
      "Kept retrieval and generation as separate steps so each can be tuned on its own.",
      "Handled Pinecone and Cohere API deprecations by updating to the current SDK versions."
    ],
    impact: "Turned a basic document Q&A into a deployed study tool that anyone can open from a link."
  }
},
 {
  id: "project-04",
  title: "PROJECT 04: SafeFlow AI",
  slug: "safeflow-ai",
  category: "FinTech & InsurTech",
  featured: true,
  status: "HACKATHON BUILD",
  auraTag: "PARAMETRIC INSURANCE",
  tagline: "Zero-touch parametric insurance for gig workers, where weather disruptions trigger payouts automatically.",
  description: "A parametric insurance platform for the gig economy with a worker dashboard, a fraud-monitoring admin console and simulated auto-settled claims. Built as a standalone frontend showcase with a mock API engine.",
  highlights: [
    ["Simulated zero-touch payouts where weather and disruption triggers settle claims without any manual filing."],
    ["[Built an admin console with threat-level mapping and an investigation queue for fraud review."],
    ["Designed a custom glassmorphism design system with CSS variables, blur tokens and micro-animations."]
  ],
  metrics: [
    { label: "Pages", value: "4" },
    { label: "Backend", value: "None (mock engine)" },
    { label: "Onboarding", value: "Phone OTP flow" }
  ],
  techStack: ["HTML", "CSS", "JavaScript", "Mock API Engine"],
  githubUrl: "https://github.com/aryan262005/Safe-FLow-Ai-",
  accentColor: "#f97316",
  cardTheme: "orange",
  architecture: {
    problem: "Gig workers lose income when weather or disruptions stop work, and traditional insurance claims are slow and paperwork-heavy.",
    solution: "Parametric triggers decide payouts from the event itself, so claims settle automatically while an admin console watches for fraud.",
    keyDecisions: [
      "Wrote a mock API engine (api.js) that intercepts requests locally with simulated latency, so the whole app runs without a backend.",
      "Added a parametric simulator (simulation.js) to test how the UI reacts to weather events and risk surges.",
      "Built the design system on reusable CSS tokens (glass.css) to keep contrast and readability high."
    ],
    impact: "Delivered a working end-to-end demo of the zero-touch claim flow that opens from any static file server."
  }
},
];

export const skillsData = [
  {
    category: "Programming",
    icon: "Code2",
    description: "Core languages for building robust backend services, algorithmic logic, and responsive web platforms.",
    skills: [
      {
        id: "java",
        name: "Java",
        category: "Programming",
        tagline: "Enterprise backend services & object-oriented architectures",
        description: "Designing robust, multi-threaded backend services, enterprise API systems, and clean object-oriented data structures.",
        tags: ["Object-Oriented Design", "Backend Systems", "Concurrency", "Data Structures"],
        related: ["python", "docker", "aws", "git"],
        highlight: "Enterprise Architecture"
      },
      {
        id: "python",
        name: "Python",
        category: "Programming",
        tagline: "AI/ML orchestration, agentic pipelines & rapid backend scripting",
        description: "Primary language for generative AI workflows, LLM orchestration frameworks, data transformations, and asynchronous API microservices.",
        tags: ["AI/ML Pipelines", "LangChain/LangGraph", "Async/FastAPI", "Data Processing"],
        related: ["machine-learning", "langchain", "langgraph", "rag", "streamlit", "docker"],
        highlight: "AI Core & Pipelines"
      },
      {
        id: "javascript",
        name: "JavaScript",
        category: "Programming",
        tagline: "Full-stack web logic, dynamic interfaces & asynchronous runtimes",
        description: "Authoring responsive client-side experiences, asynchronous DOM interactions, modern ESNext patterns, and event-driven architectures.",
        tags: ["Modern ESNext", "Asynchronous Events", "DOM Engine", "Web APIs"],
        related: ["react", "nextjs", "html", "css", "tailwind-css"],
        highlight: "Modern Web Runtime"
      }
    ]
  },
  {
    category: "Web Development",
    icon: "Layout",
    description: "Modern component-driven web architectures, responsive design systems, and high-performance user interfaces.",
    skills: [
      {
        id: "html",
        name: "HTML",
        category: "Web Development",
        tagline: "Semantic web architecture & accessible document structures",
        description: "Structuring clean, accessible (a11y), and SEO-optimized markup that acts as the bedrock for modern web applications.",
        tags: ["Semantic Markup", "Accessibility (WCAG)", "SEO Structure", "DOM Standards"],
        related: ["css", "javascript", "react"],
        highlight: "Semantic Foundation"
      },
      {
        id: "css",
        name: "CSS",
        category: "Web Development",
        tagline: "Responsive layouts, fluid design systems & modern transitions",
        description: "Crafting fluid responsive layouts, CSS Grid/Flexbox architectures, custom properties, and smooth keyframe animations.",
        tags: ["Flexbox & Grid", "Fluid Typography", "CSS Variables", "Transitions"],
        related: ["tailwind-css", "html", "react"],
        highlight: "Fluid Layout Engine"
      }
    ]
  },
  {
    category: "AI / Machine Learning",
    icon: "Cpu",
    description: "Frontier generative AI, retrieval architectures, autonomous multi-agent systems, and vector search foundations.",
    skills: [
      {
        id: "machine-learning",
        name: "Machine Learning",
        category: "AI / Machine Learning",
        tagline: "Predictive algorithms, feature modeling & data intelligence",
        description: "Developing data preprocessing pipelines, supervised/unsupervised predictive models, and statistical evaluation frameworks.",
        tags: ["Predictive Modeling", "Feature Engineering", "Data Pipelines", "Model Evaluation"],
        related: ["python", "generative-ai", "embeddings", "streamlit"],
        highlight: "Predictive Foundations"
      },
      {
        id: "generative-ai",
        name: "Generative AI",
        category: "AI / Machine Learning",
        tagline: "Prompt engineering, synthetic generation & reasoning workflows",
        description: "Harnessing multimodal generative models to automate complex reasoning tasks, synthesize text/code, and build cognitive digital products.",
        tags: ["Prompt Engineering", "Multimodal Systems", "Cognitive Workflows", "Reasoning Engines"],
        related: ["llms", "rag", "langchain", "autogen"],
        highlight: "Creative Reasoning"
      },
      {
        id: "rag",
        name: "RAG",
        category: "AI / Machine Learning",
        tagline: "Retrieval-Augmented Generation & grounded knowledge retrieval",
        description: "Architecting end-to-end RAG pipelines combining chunking strategies, dense embeddings, vector retrieval, and grounded response synthesis.",
        tags: ["Context Grounding", "Semantic Retrieval", "Chunking Strategies", "Hallucination Mitigation"],
        related: ["llms", "embeddings", "vector-databases", "pinecone", "llamaindex", "langchain"],
        highlight: "Knowledge Synthesis"
      },
      {
        id: "llms",
        name: "LLMs",
        category: "AI / Machine Learning",
        tagline: "Frontier language model orchestration & inference optimization",
        description: "Deploying and integrating large language models (OpenAI, Anthropic, Gemini, open-weight models) with structured outputs and function calling.",
        tags: ["Model Orchestration", "Structured Outputs", "Function Calling", "Token Optimization"],
        related: ["generative-ai", "rag", "langchain", "langgraph", "autogen"],
        highlight: "Frontier Models"
      },
      {
        id: "langchain",
        name: "LangChain",
        category: "AI / Machine Learning",
        tagline: "Composable prompt chains, document loaders & cognitive toolkits",
        description: "Building composable LLM chains, connecting memory providers, integrating external tools, and orchestrating complex multi-step reasoning.",
        tags: ["Prompt Templates", "Tool Integrations", "Chains & Runnables", "Memory Providers"],
        related: ["langgraph", "rag", "llms", "python", "vector-databases"],
        highlight: "Chain Composition"
      },
      {
        id: "langgraph",
        name: "LangGraph",
        category: "AI / Machine Learning",
        tagline: "Cyclic state graphs, agentic loops & multi-agent systems",
        description: "Architecting stateful multi-agent systems with cyclic execution graphs, human-in-the-loop validation, and persistent execution checkpoints.",
        tags: ["Cyclic State Graphs", "Multi-Agent Coordination", "Checkpoint Persistence", "Human-in-the-Loop"],
        related: ["langchain", "autogen", "llms", "python"],
        highlight: "Multi-Agent Graphs"
      },
      {
        id: "llamaindex",
        name: "LlamaIndex",
        category: "AI / Machine Learning",
        tagline: "Data framework for indexing enterprise knowledge & custom data",
        description: "Ingesting heterogeneous data sources, building hierarchical document indexes, and querying structured/unstructured enterprise knowledge.",
        tags: ["Document Ingestion", "Hierarchical Indexes", "Knowledge Connectors", "Query Engines"],
        related: ["rag", "vector-databases", "pinecone", "embeddings", "python"],
        highlight: "Data Indexing"
      },
      {
        id: "autogen",
        name: "AutoGen",
        category: "AI / Machine Learning",
        tagline: "Conversational multi-agent collaboration & role-playing agents",
        description: "Building autonomous agent networks where specialized AI personas converse, debate, execute code in sandboxes, and solve multi-tier problems.",
        tags: ["Multi-Agent Debates", "Code Execution", "Autonomous Collaboration", "Role Specialization"],
        related: ["langgraph", "llms", "python", "generative-ai"],
        highlight: "Autonomous Teams"
      },
      {
        id: "embeddings",
        name: "Embeddings",
        category: "AI / Machine Learning",
        tagline: "Dense semantic vector representations & dimensional similarity",
        description: "Generating high-dimensional semantic vectors from text and code, calculating cosine similarity, and driving accurate semantic searches.",
        tags: ["Dense Vectors", "Cosine Similarity", "Semantic Mapping", "Cross-Modal Representation"],
        related: ["vector-databases", "pinecone", "rag", "machine-learning"],
        highlight: "Semantic Coordinates"
      },
      {
        id: "vector-databases",
        name: "Vector Databases",
        category: "AI / Machine Learning",
        tagline: "High-dimensional similarity indexing & sub-millisecond querying",
        description: "Indexing and querying billions of vector embeddings at scale using HNSW and IVF algorithms with dynamic metadata filtering.",
        tags: ["HNSW Indexing", "Metadata Filtering", "Similarity Search", "Knowledge Base Storage"],
        related: ["pinecone", "embeddings", "rag", "llamaindex"],
        highlight: "Similarity Engines"
      }
    ]
  },
  {
    category: "Cloud & Tools",
    icon: "Cloud",
    description: "Cloud infrastructure, containerization, version control, and interactive AI application deployment.",
    skills: [
      {
        id: "aws",
        name: "AWS",
        category: "Cloud & Tools",
        tagline: "Cloud infrastructure, serverless compute & scalable storage",
        description: "Deploying and managing cloud workloads across Amazon S3, Lambda serverless functions, EC2 compute, and IAM security policies.",
        tags: ["S3 Storage", "Lambda Serverless", "EC2 Compute", "IAM Policies"],
        related: ["docker", "git", "python", "pinecone"],
        highlight: "Cloud Infrastructure"
      },
      {
        id: "github",
        name: "GitHub",
        category: "Cloud & Tools",
        tagline: "Collaborative code review, automated CI/CD & repository control",
        description: "Orchestrating automated test/build/deploy pipelines with GitHub Actions, structured pull request reviews, and issue management.",
        tags: ["GitHub Actions", "CI/CD Automation", "Pull Requests", "Code Collaboration"],
        related: ["git", "docker", "aws"],
        highlight: "CI/CD & Collaboration"
      },
      {
        id: "streamlit",
        name: "Streamlit",
        category: "Cloud & Tools",
        tagline: "Rapid interactive AI applications & data dashboards",
        description: "Transforming Python data scripts and machine learning models into intuitive, interactive web applications and demo prototypes in minutes.",
        tags: ["Interactive Dashboards", "Rapid Prototyping", "Python Web Apps", "AI Demos"],
        related: ["python", "machine-learning", "rag", "generative-ai"],
        highlight: "Rapid Prototyping"
      },
      {
        id: "pinecone",
        name: "Pinecone",
        category: "Cloud & Tools",
        tagline: "Serverless vector database for low-latency RAG search",
        description: "Managing high-scale vector namespaces, real-time metadata indexing, and ultra-low latency similarity queries for enterprise RAG systems.",
        tags: ["Serverless Vector DB", "Namespaces", "Real-Time Indexing", "Low-Latency Search"],
        related: ["vector-databases", "embeddings", "rag", "langchain", "llamaindex"],
        highlight: "Vector Search Cloud"
      }
    ]
  }
];

export const certificatesData = [
  {
    id: "cert-01",
    title: "[CERTIFICATE 01: AI & ML Launchpad program]",
    issuer: "[Edge3]",
    date: "[2026]",
    verifyUrl: "/certificates/AI & ML Launchpad completion certificate by Edge3 .pdf",
    certificatePdf: "/certificates/AI & ML Launchpad completion certificate by Edge3 .pdf",
    rarity: "Course Completion",
    badgeIcon: "Code2",
    skills: ["[Python]", "[Machine Learning]", "[Artificial Intelligence]"],
    summary: "[summary: \"Demonstrates completion of the AI & ML Launchpad program, showcasing proficiency in Python, machine learning and artificial intelligence concepts.\"]"
  },
  {
    id: "cert-02",
    title: "[CERTIFICATE 02:INTRODUCTION TO DATA SCIENCE]",
    issuer: "[INFOSYS SPRINGBOARD]",
    date: "[2026]",
    verifyUrl: "/certificates/infosysDataScience.pdf",
    certificatePdf: "/certificates/infosysDataScience.pdf",
    rarity: "Certification",
    badgeIcon: "CloudLightning",
    skills: ["[Python]", "[Machine Learning]", "[Data Analysis]", "[Data Visualization]", "[Data Handling]"],
    summary: "[summary: \"Demonstrates foundational knowledge of data science, Python, machine learning, and data analysis.\"]"
  },
  {
    id: "cert-03",
    title: "[CERTIFICATE 03: AI Tools & ChatGPT Workshops]",
    issuer: "[be10x]",
    date: "[2026]",
    verifyUrl: "/certificates/CertificateBe10x.pdf",
    certificatePdf: "/certificates/CertificateBe10x.pdf",
    rarity: "Certification",
    badgeIcon: "Code2",
    skills: ["[AI Tools]", "[ChatGPT Workshops]"],
    summary: "[summary: \"Demonstrates proficiency in AI tools and ChatGPT workshops, showcasing practical skills in leveraging AI technologies.\"]"
  },
  {
    id: "cert-04",
    title: "[CERTIFICATE 04: GuideWire Devtrails University Hackathon]",
    issuer: "[National Insurance Academy]",
    date: "[2026]",
    verifyUrl: "/certificates/guidewireHackathonCertificate.pdf",
    certificatePdf: "/certificates/guidewireHackathonCertificate.pdf",
    rarity: "Hackathon",
    badgeIcon: "Code2",
    skills: ["[Full-Stack Web]", "[Insurance Model]", "[System Design]"],
    summary: "[summary: \"Participated in the GuideWire Devtrails University Hackathon, built a platform for all Gigworkers as like insurance company but with mordern AI and ML models integrated.\"]"
  },
];

export const experienceData = [
  {
    id: "exp-01",
    role: "[DATA SCIENCE INTERN]",
    company: "[CELEBAL TECHNOLOGIES]",
    period: "[June 2026 - August 2026]",
    location: "[REMOTE]",
    type: "Internship",
    questBadge: "MAIN QUEST COMPLETE",
    description: "[Built and deployed end-to-end ML, deep learning and GenAI projects across the Celebal Excellence Internship, from classical models to agentic RAG apps.]",
    bulletPoints: [
      "Shipped 8 weekly projects spanning regression forecasting, clustering, CNNs, LSTMs, autoencoders and RAG, all deployed live on Streamlit Community Cloud.",
      "Built an AI-powered Study Assistant with LlamaIndex, Cohere and Pinecone that answers questions over uploaded PDFs.",
      "Explored agentic AI workflows with LangGraph and AutoGen and debugged real-world issues like API deprecations and Python version conflicts.",
    ],
    techStack: ["Python", "Scikit-learn", "XGBoost", "TensorFlow", "LangGraph", "LlamaIndex", "Pinecone", "Streamlit"],
    certificatePdf: "/certificates/celebal-data-science-internship-completion.pdf",
  }  
];

export const socialProfiles = [
  {
    id: "github",
    name: "GitHub",
    handle: "@aryan262005",
    url: "https://github.com/aryan262005",
    description: "Explore open source code repositories, tools & side quests",
    icon: "Github",
    badge: "CODE REPOSITORY",
    status: "ACTIVE COMMIT"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "in/aryan-mahanty26",
    url: "https://linkedin.com/in/aryan-mahanty26",
    description: "Professional career journey, endorsements & recommendations",
    icon: "Linkedin",
    badge: "CAREER NETWORK",
    status: "CONNECT"
  },
  {
    id: "leetcode",
    name: "Coding / LeetCode",
    handle: "[Aryancoder2626]",
    url: "https://leetcode.com/u/Aryancoder2626",
    description: "Algorithmic problem solving, data structures & competitive coding",
    icon: "Code",
    badge: "ALGORITHMS",
    status: "SOLVING"
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "[@___its_aryannnn___]",
    url: "https://instagram.com/aryan.meranaam",
    description: "Visual design stories, creative highlights & behind-the-scenes builds",
    icon: "Instagram",
    badge: "VISUAL FEED",
    status: "CREATIVE LOG"
  }
];

export const educationData = [
  {
    step: "01",
    period: "2020 → 2021",
    qualification: "CLASS 10TH",
    institution: "Blossoms School",
    location: "Bhubaneswar, Odisha"
  },
  {
    step: "02",
    period: "2022 → 2023",
    qualification: "CLASS 12TH",
    institution: "BMPS Takshila School",
    location: "Bhubaneswar, Odisha"
  },
  {
    step: "03",
    period: "2023 → 2027",
    qualification: "B.Tech — Computer Science & Engineering",
    institution: "ITER , Siksha 'O' Anusandhan University (SOA)",
    location: "Bhubaneswar, Odisha"
  }
];

export const mascotQuotes = [
  "Hey there! Click anywhere to unleash some aura!",
  "Did you know? You can press R anytime to open the 15-second Recruiter Scan!",
  "100% handcrafted code Ã¢â‚¬â€ zero generic templates allowed! ",
  "Check out the Collectible Certificates in the Trophy Vault! ",
  "Try switching themes in the top-right corner to change my aura! ",
  "Quest log updated: You found the secret mascot dialogue! "
];