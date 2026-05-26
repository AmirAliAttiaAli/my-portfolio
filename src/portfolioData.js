export const profile = {
  name: "Amir Ali Attia Ali",
  title: "Data Scientist | ML Engineer | Data Analyst | Instructor",
  location: "Giza, Egypt",
  email: "amir.ali.torad@gmail.com",
  phone: "+20 112 780 2955",
  linkedin: "linkedin.com/in/amir-ali-torad",
  github: "github.com/AmirAliAttiaAli",
  summary:
    "Passionate Data Scientist and Machine Learning Engineer with a strong academic foundation in Computer Science and Information Systems, currently contributing to advanced machine learning research at the University of Tokyo's Matsuo-Iwasawa Lab. Expert in building robust predictive models, deploying deep learning architectures, and engineering state-of-the-art Generative AI solutions (including LLMs, RAG, and prompt engineering). Active community leader and Data Science Instructor at GDG on Campus - El-Azhar, dedicated to turning complex datasets into actionable insights and solving real-world challenges through AI.",
};

export const stats = [
  { label: "Education", value: "B.Sc. CSIS" },
  { label: "Specialization", value: "ML & GenAI" },
  { label: "Base Location", value: "Giza, Egypt" },
  { label: "Languages", value: "English & Arabic" },
];

export const experience = [
  {
    role: "Data Science Instructor",
    org: "GDG on Campus - El-Azhar",
    location: "Egypt",
    period: "March 2026 - Present",
    bullets: [
      "Deliver comprehensive data science lectures covering Python, SQL, and Machine Learning fundamentals.",
      "Mentor 50+ students in hands-on projects focused on data analysis, statistical methods, and visualization.",
      "Introduce learners to real-world developer tools and collaborative coding workflows.",
    ],
  },
  {
    role: "Data Science Core Team",
    org: "GDG on Campus - El-Azhar",
    location: "Egypt",
    period: "October 2025 - Present",
    bullets: [
      "Supported the data science student community through technical leadership, collaboration, and knowledge sharing.",
      "Worked on internal initiatives related to curriculum design, study groups, and hackathon organization.",
      "Contributed to community growth and organized interactive learner engagement sessions.",
    ],
  },
  {
    role: "Data Science Intern",
    org: "Matsuo-Iwasawa Lab U-Tokyo",
    location: "Egypt (Remote)",
    period: "April 2026 - Present",
    bullets: [
      "Contributing to data science research projects, analytical pipelines, and experimental machine learning workflows.",
      "Gaining hands-on experience under advanced research methodologies and collaborative academic settings.",
    ],
  },
  {
    role: "Full Stack Member",
    org: "TEDxAOU",
    location: "Egypt",
    period: "April 2026 - Present",
    bullets: [
      "Build and maintain responsive landing pages and web components for TEDx events.",
      "Collaborate in a cross-functional team of developers and designers to ensure high-performance UI delivery.",
    ],
  },
  {
    role: "Marketing Specialist",
    org: "Blue Camp",
    location: "Egypt",
    period: "January 2026 - Present",
    bullets: [
      "Develop and coordinate digital marketing campaigns, boosting audience engagement and project visibility.",
      "Analyze content reach and campaign metrics to optimize event outreach and lead generation.",
    ],
  },
  {
    role: "Deep Learning Trainee",
    org: "Orange Digital Center Egypt",
    location: "Egypt",
    period: "February 2026 - March 2026",
    bullets: [
      "Built and optimized Convolutional Neural Networks (CNNs) for image-based classification tasks.",
      "Utilized TensorFlow, Keras, and OpenCV for computer vision, image processing, and data augmentation.",
      "Applied hyperparameter tuning, transfer learning, and evaluation metrics to ensure production-grade accuracy.",
    ],
  },
  {
    role: "Data Science Member",
    org: "Microsoft Student Club - KFS",
    location: "Egypt",
    period: "October 2025 - January 2026",
    bullets: [
      "Participated in student-led data science studies and technical workshops.",
      "Collaborated on peer learning initiatives, covering data cleaning fundamentals and introductory SQL.",
    ],
  },
  {
    role: "Generative AI Trainee",
    org: "Information Technology Institute (ITI)",
    location: "Giza, Egypt",
    period: "November 2025 - December 2025",
    bullets: [
      "Explored Large Language Model (LLM) concepts, prompt engineering strategies, and RAG architectures.",
      "Implemented Retrieval-Augmented Generation pipelines using vector stores to ground model responses in custom knowledge bases.",
      "Built prototype web apps deploying orchestration frameworks (LangChain) to deliver context-aware generation.",
    ],
  },
  {
    role: "Data Analytics Trainee",
    org: "National Telecommunication Institute (NTI)",
    location: "Egypt",
    period: "September 2025 - September 2025",
    bullets: [
      "Acquired deep foundations in data analytics, data warehousing, and structured reporting workflows.",
      "Cleaned, manipulated, and visualized complex datasets using Python, Matplotlib, and SQL.",
    ],
  },
  {
    role: "Internship Trainee",
    org: "CIB Egypt",
    location: "Egypt",
    period: "August 2025 - August 2025",
    bullets: [
      "Completed intensive professional training, gaining exposure to corporate banking workflows.",
      "Observed data security protocols, database structures, and internal reporting mechanisms.",
    ],
  },
];

export const projects = [
  {
    name: "Fruit-AI-Classifier",
    meta: "ODC Capstone Project, 2026",
    summary:
      "A deep learning computer vision system designed for automated fruit identification, sorting, and quality inspection.",
    highlights: [
      "Developed a custom Convolutional Neural Network (CNN) with transfer learning for multi-class image classification.",
      "Created an interactive Streamlit dashboard allowing users to upload fruit photos and receive real-time confidence scores.",
      "Engineered automated preprocessing and augmentation pipelines using OpenCV to handle diverse lighting and image qualities.",
    ],
    tools: ["TensorFlow", "Keras", "OpenCV", "Python", "Streamlit"],
  },
  {
    name: "RAG-Knowledge-Assistant",
    meta: "Personal Project, 2025",
    summary:
      "A Retrieval-Augmented Generation (RAG) agent that allows users to chat with custom document archives and PDFs securely.",
    highlights: [
      "Utilized LangChain and vector databases (ChromaDB) to perform semantic searches over proprietary text documents.",
      "Integrated OpenAI GPT models with custom prompt templates, drastically reducing AI hallucinations.",
      "Built an intuitive chat interface to query documents, trace sources, and summarize complex texts.",
    ],
    tools: ["LangChain", "OpenAI API", "ChromaDB", "Python", "Streamlit"],
  },
  {
    name: "Customer-Segmentation-Engine",
    meta: "NTI Project, 2025",
    summary:
      "An unsupervised machine learning project to segment e-commerce customers based on purchasing behavioral patterns.",
    highlights: [
      "Applied K-Means clustering and Principal Component Analysis (PCA) to group customers based on RFM metrics.",
      "Cleaned and engineered behavioral features from raw transactional databases using Pandas and NumPy.",
      "Exported results into an interactive Power BI dashboard to guide targeted marketing campaigns.",
    ],
    tools: ["Scikit-learn", "Pandas", "NumPy", "Power BI", "Matplotlib"],
  },
];

export const skills = [
  "Python", "SQL", "C++", "Bash", "NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn",
  "XGBoost", "LightGBM", "CatBoost", "TensorFlow", "Keras", "PyTorch", "CNN", "RNN", "LSTM",
  "Transfer Learning", "Fine-tuning", "Hugging Face Transformers", "BERT", "GPT", "T5",
  "RoBERTa", "spaCy", "Prompt Engineering", "RAG", "LLMs", "Quantization", "Pruning",
  "n8n", "Docker", "MLflow", "CI/CD", "Streamlit", "FastAPI", "MySQL", "MongoDB", "OpenCV",
  "Git", "OOP", "Data Structures", "Algorithms", "CrewAI", "Multi-Agent Systems", "GPT-4o"
];

export const education = [
  {
    degree: "B.Sc. in Computer Science and Information Systems",
    school: "Culture and Science City",
    period: "October 2024 - May 2028",
    note: "Focusing on Software Engineering, Data Structures, Algorithms, and Database Management Systems.",
  },
];

export const certifications = [
  {
    name: "AI for All: From Basics to GenAI Practice",
    issuer: "Information Technology Institute (ITI)",
    issueMonth: "December",
    issueYear: "2025",
    expMonth: "",
    expYear: "",
    image: ""
  },
  {
    name: "Programming Using Python",
    issuer: "National Telecommunication Institute (NTI)",
    issueMonth: "September",
    issueYear: "2025",
    expMonth: "",
    expYear: "",
    image: ""
  },
  {
    name: "Introduction to Deep Learning",
    issuer: "Orange Digital Center",
    issueMonth: "March",
    issueYear: "2026",
    expMonth: "",
    expYear: "",
    image: ""
  },
  {
    name: "Introduction to SQL",
    issuer: "National Telecommunication Institute (NTI)",
    issueMonth: "September",
    issueYear: "2025",
    expMonth: "",
    expYear: "",
    image: ""
  },
  {
    name: "Getting Started with Deep Learning",
    issuer: "NVIDIA Deep Learning Institute",
    issueMonth: "February",
    issueYear: "2026",
    expMonth: "",
    expYear: "",
    image: ""
  }
];

export const roles = [
  "Data Scientist",
  "ML Engineer",
  "AI Researcher",
  "Deep Learning Dev",
  "GenAI Explorer"
];
