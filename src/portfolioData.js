// Baseline portfolio data for Amir Ali Attia Ali - Data Scientist & Machine Learning Engineer

export const profile = {
  name: "Amir Ali Attia Ali",
  title: "Data Scientist | Machine Learning Engineer",
  headline: "Turning Data into Insights. Building Models into Solutions.",
  location: "Giza, Egypt",
  email: "amir.ali.torad@gmail.com",
  phone: "+201127802955",
  linkedin: "https://www.linkedin.com/in/amir-ali-torad",
  github: "https://github.com/AmirAliAttiaAli",
  cv: "https://drive.google.com/file/d/1PoQzyoHPi6FyImfqfGeBXHB6zTM7oGA4/view?usp=sharing",
  about: "Passionate about building AI solutions that solve real-world problems. I'm a Computer Science student, Machine Learning Engineer, and Data Science Instructor with hands-on experience in Machine Learning, Deep Learning, Data Analytics, and Generative AI. Through internships, technical programs, and teaching, I've developed practical experience in designing data-driven solutions, building predictive models, and mentoring aspiring data professionals.\n\nMy journey includes experience with DEPI, NTI, Orange Digital Center, ITI, GDG on Campus Al-Azhar, and iSchool, where I've worked on real projects and collaborated with talented teams. I'm passionate about continuous learning, sharing knowledge, and applying AI to create measurable impact.\n\nI'm always open to internships, collaborations, research opportunities, and full-time roles in AI and Machine Learning.",
  areasOfInterest: [
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Computer Vision",
    "LLMs",
    "Generative AI",
    "Data Analytics",
    "MLOps"
  ]
};

export const stats = [
  { label: "Education", value: "B.Sc. CS & IS" },
  { label: "Focus", value: "Machine Learning & DS" },
  { label: "AI & ML Projects", value: "2 End-to-End Systems" },
  { label: "Mentorship", value: "50+ Students Taught" }
];

export const skillsCategorized = {
  dataScience: [
    "Python",
    "SQL",
    "Pandas",
    "NumPy",
    "Data Cleaning",
    "Exploratory Data Analysis (EDA)",
    "Data Visualization",
    "Statistics",
    "Matplotlib",
    "Seaborn"
  ],
  machineLearning: [
    "Scikit-learn",
    "Regression",
    "Classification",
    "Clustering",
    "Feature Engineering",
    "Model Evaluation"
  ],
  deepLearningAI: [
    "TensorFlow",
    "Keras",
    "CNN",
    "Transfer Learning",
    "Computer Vision",
    "Generative AI",
    "LLMs"
  ],
  toolsDeployment: [
    "Git",
    "GitHub",
    "Jupyter Notebook",
    "Streamlit",
    "Playwright",
    "MLOps"
  ]
};

export const skills = [
  ...skillsCategorized.dataScience,
  ...skillsCategorized.machineLearning,
  ...skillsCategorized.deepLearningAI,
  ...skillsCategorized.toolsDeployment
];

export const projects = [
  {
    id: "estate-miner",
    name: "Estate-Miner",
    subtitle: "Egyptian Real Estate Data Mining & Analytics",
    category: "Data Analytics & Web Scraping",
    period: "May 2026 – Jul 2026",
    associatedWith: "GDG on Campus Al-Azhar",
    description: "Built an automated web scraping pipeline using Playwright to collect Egyptian real estate listings. Cleaned and validated raw property data through a structured data cleaning process. Performed feature engineering by creating pricing and property-related metrics. Conducted comprehensive Exploratory Data Analysis (EDA) to uncover pricing trends, regional insights, and property characteristics. Prepared a high-quality dataset suitable for future machine learning models.",
    highlights: [
      "Built an automated web scraping pipeline using Playwright to collect real estate listings.",
      "Cleaned and validated raw property data through structured data cleaning pipelines.",
      "Engineered pricing and property-related metrics for feature extraction.",
      "Conducted comprehensive Exploratory Data Analysis (EDA) for regional market insights.",
      "Delivered a clean, ML-ready dataset for price prediction models."
    ],
    technologies: [
      "Python",
      "Playwright",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Jupyter Notebook"
    ],
    keyAreas: [
      "Web Scraping",
      "Data Cleaning",
      "Feature Engineering",
      "Exploratory Data Analysis"
    ],
    github: "https://github.com/AmirAliAttiaAli/Estate-Miner",
    demo: "",
    type: "Data Analytics"
  },
  {
    id: "fruit-ai-classifier",
    name: "Fruit-AI-Classifier",
    subtitle: "Deep Learning Image Classification System",
    category: "Deep Learning & Computer Vision",
    period: "Feb 2026 – Mar 2026",
    associatedWith: "Orange Digital Center Egypt",
    description: "An end-to-end image classification system built using deep learning techniques. The model is based on Transfer Learning using a pretrained CNN (MobileNetV2) to improve accuracy while reducing training time. The application is deployed using Streamlit, allowing users to upload fruit images and receive real-time predictions with confidence scores.",
    highlights: [
      "Implemented MobileNetV2 Transfer Learning for high-accuracy fruit image classification.",
      "Constructed automated preprocessing (resizing, normalization) and augmentation workflows.",
      "Deployed real-time inference web application using Streamlit.",
      "Rendered top-k class predictions alongside confidence scores for user transparency."
    ],
    keyConcepts: [
      "Convolutional Neural Networks (CNN)",
      "Transfer Learning",
      "Image Preprocessing",
      "Model Evaluation",
      "Visualization"
    ],
    technologies: [
      "TensorFlow",
      "Keras",
      "MobileNetV2",
      "Streamlit",
      "Python",
      "OpenCV"
    ],
    keyAreas: [
      "Deep Learning",
      "Computer Vision",
      "Transfer Learning",
      "Model Deployment"
    ],
    github: "https://github.com/AmirAliAttiaAli/fruit-ai-classifier",
    demo: "",
    type: "Machine Learning / AI"
  }
];

export const experience = [
  {
    id: "depi-mle",
    role: "Machine Learning Engineer",
    org: "Digital Egypt Pioneers Initiative - DEPI",
    period: "Jul 2026 - Present · 2 mos",
    location: "Al Jizah, Egypt · Hybrid",
    type: "Internship",
    priority: "high",
    bullets: [
      "Designing and training machine learning models for real-world predictive applications.",
      "Collaborating in end-to-end ML workflows including feature engineering, hyperparameter tuning, and model evaluation.",
      "Participating in intensive hands-on technical tracks focused on scalable AI engineering."
    ],
    skills: ["Machine Learning", "Python", "Model Evaluation", "Scikit-learn"]
  },
  {
    id: "nti-ai",
    role: "Artificial Intelligence Trainee",
    org: "National Telecommunication Institute (NTI)",
    period: "Aug 2026 - Present · 1 mo",
    location: "Smart Village, Egypt · On-site",
    type: "Internship",
    priority: "high",
    bullets: [
      "Engaging in advanced AI and Machine Learning training at NTI Smart Village facility.",
      "Implementing deep learning architectures, neural network training pipelines, and data preprocessing workflows.",
      "Applying AI concepts to real-world industrial and telecom datasets."
    ],
    skills: ["Artificial Intelligence (AI)", "Machine Learning", "Deep Learning"]
  },
  {
    id: "gdg-instructor",
    role: "Instructor Data Science",
    org: "GDG on Campus Al-Azhar",
    period: "Mar 2026 - Present · 6 mos",
    location: "Egypt",
    type: "Seasonal",
    priority: "high",
    bullets: [
      "Delivered comprehensive data science lectures covering Python, SQL, and Machine Learning fundamentals.",
      "Mentored 50+ students in hands-on projects focused on data analysis, statistical methods, and visualization.",
      "Introduced learners to real-world developer tools and collaborative coding workflows."
    ],
    skills: ["Data Science", "Statistics", "Python", "Mentorship"]
  },
  {
    id: "gdg-python-head",
    role: "Python Vice Head",
    org: "GDG on Campus Al-Azhar",
    period: "Aug 2026 - Present · 1 mo",
    location: "Egypt",
    type: "Seasonal",
    priority: "high",
    bullets: [
      "Co-leading the Python track technical curriculum and hands-on coding workshops.",
      "Organizing code reviews, technical sessions, and student developer hackathons.",
      "Guiding team members in software development best practices and Python ecosystem tools."
    ],
    skills: ["Python", "Technical Leadership", "Curriculum Design"]
  },
  {
    id: "gdg-ds-core",
    role: "Data Science Core Team",
    org: "GDG on Campus Al-Azhar",
    period: "Oct 2025 - Present · 11 mos",
    location: "Egypt",
    type: "Seasonal",
    priority: "high",
    bullets: [
      "Supported the data science student community through technical leadership, collaboration, and knowledge sharing.",
      "Worked on internal initiatives related to curriculum design, study groups, and hackathon organization.",
      "Contributed to community growth and organized interactive learner engagement sessions."
    ],
    skills: ["Data Science", "Statistics", "Community Building"]
  },
  {
    id: "ischool",
    role: "Programming Instructor",
    org: "iSchool",
    period: "Jun 2026 - Present · 3 mos",
    location: "Egypt · On-site",
    type: "Full-time",
    priority: "medium",
    bullets: [
      "Teaching fundamental programming concepts, algorithms, and computational thinking to young innovators.",
      "Designing interactive coding projects in Python and block-based environments.",
      "Evaluating student performance and fostering problem-solving skills."
    ],
    skills: ["Python", "Teaching", "Algorithms"]
  },
  {
    id: "deci",
    role: "Programming Instructor",
    org: "Digital Egypt Cubs Initiative \"DECI\"",
    period: "Jun 2026 - Present · 3 mos",
    location: "Al Jizah, Egypt · On-site",
    type: "Full-time",
    priority: "medium",
    bullets: [
      "Instructing high-achieving Egyptian youth under the presidential initiative DECI in technology & coding.",
      "Guiding students through computer science principles, practical software development, and algorithmic logic.",
      "Building hands-on mini-projects to reinforce programming concepts."
    ],
    skills: ["Python", "Problem Solving", "Computer Science"]
  },
  {
    id: "odc-dl",
    role: "Deep Learning Trainee",
    org: "Orange Digital Center Egypt",
    period: "Feb 2026 - Mar 2026 · 2 mos",
    location: "Egypt · Hybrid",
    type: "Internship",
    priority: "high",
    bullets: [
      "Built and optimized Convolutional Neural Networks (CNNs) for image-based classification tasks.",
      "Utilized TensorFlow, Keras, and OpenCV for computer vision, image processing, and data augmentation.",
      "Applied hyperparameter tuning, transfer learning, and evaluation metrics to ensure high model accuracy."
    ],
    skills: ["Python", "NumPy", "TensorFlow", "Keras", "CNN"]
  },
  {
    id: "iti-genai",
    role: "Generative AI Trainee",
    org: "Information Technology Institute (ITI)",
    period: "Nov 2025 - Dec 2025 · 2 mos",
    location: "Al Jizah, Egypt · Remote",
    type: "Internship (ITI x Nvidia)",
    priority: "high",
    bullets: [
      "Explored Large Language Model (LLM) concepts, prompt engineering strategies, and RAG architectures.",
      "Implemented Retrieval-Augmented Generation pipelines using vector stores to ground model responses.",
      "Built prototype web applications deploying orchestration frameworks to deliver context-aware generation."
    ],
    skills: ["Generative AI", "Artificial Intelligence (AI)", "LLMs", "RAG"]
  },
  {
    id: "nti-da",
    role: "Data Analytics Trainee",
    org: "National Telecommunication Institute (NTI)",
    period: "Sep 2025 · 1 mo",
    location: "Egypt · Remote",
    type: "Internship (NTI x ITIDA)",
    priority: "high",
    bullets: [
      "Acquired deep foundations in data analytics, data warehousing, and structured reporting workflows.",
      "Cleaned, manipulated, and visualized complex datasets using Python, Matplotlib, and SQL.",
      "Extracted actionable business insights and built exploratory reporting models."
    ],
    skills: ["Databases", "SQL", "Python", "Data Visualization"]
  },
  {
    id: "bluecamp",
    role: "Marketing Specialist",
    org: "Blue Camp",
    period: "Jan 2026 - Jun 2026 · 6 mos",
    location: "Egypt · Hybrid",
    type: "Part-time",
    priority: "secondary",
    bullets: [
      "Developed and coordinated digital marketing campaigns, boosting audience engagement and project visibility.",
      "Analyzed content reach and campaign metrics to optimize event outreach and lead generation."
    ],
    skills: ["Marketing", "Social Media Marketing", "Data Analysis"]
  }
];

export const education = [
  {
    degree: "B.Sc. in Computer Science and Information Systems",
    school: "Culture and Science City",
    period: "October 2024 - May 2028",
    location: "Giza, Egypt",
    note: "Specializing in Software Engineering, Data Structures, Algorithms, Machine Learning, and Database Management Systems."
  }
];

export const certifications = [
  {
    id: "huawei-hccda",
    name: "HCCDA-Tech Essentials",
    issuer: "Huawei Cloud",
    issueYear: "2025",
    period: "May 2025 - May 2029",
    description: "Verified cloud computing technical certification covering core cloud architecture, security, database administration, and AI services on Huawei Cloud platform."
  }
];

export const roles = [
  "Data Scientist",
  "Machine Learning Engineer",
  "Deep Learning Developer",
  "Generative AI Engineer",
  "Data Science Instructor"
];
