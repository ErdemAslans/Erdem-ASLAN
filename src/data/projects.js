export const projects = [
  {
    id: 1,
    title: "Enterprise Multi-Agent Platform",
    category: "agent-systems",
    description: "Kubernetes-orchestrated multi-agent architecture for enterprise customer service. Production-ready system with intelligent workflow orchestration handling complex multi-system operations.",
    tech: ["Google ADK", "Kubernetes", "Python", "Docker"],
    metrics: "10+ APIs Orchestrated",
    link: "https://github.com/ErdemAslans/Kubernetes-Orchestrated-Multi-Agent-Intelligence-Enterprise-Customer-Service-Architecture"
  },
  {
    id: 2,
    title: "Agentic RAG System",
    category: "agent-systems",
    description: "Production-ready Agentic RAG system built with LangGraph's native features, implementing advanced patterns for multi-agent orchestration and intelligent retrieval.",
    tech: ["LangGraph", "RAG", "Python", "Vector DB"],
    metrics: "Multi-Agent Orchestration",
    link: "https://github.com/ErdemAslans/Agentic-Rag-With-LangGraph"
  },
  {
    id: 3,
    title: "Medical AI Diagnostics",
    category: "medical-ai",
    description: "Multi-disease analysis platform leveraging Vision Transformers achieving 95%+ accuracy in medical imaging diagnostics. Secure authentication and comprehensive analysis capabilities.",
    tech: ["Vision Transformers", "PyTorch", "Python", "FastAPI"],
    metrics: "95%+ Accuracy",
    link: "https://github.com/ErdemAslans/MultiDisease-Analysis-Platform"
  },
  {
    id: 4,
    title: "Pulmonary Hypertension Detection",
    category: "medical-ai",
    description: "Automated detection system using Vision Transformers and SMOTE for early diagnosis of pulmonary hypertension from CT imaging. Published research with 95.40% accuracy.",
    tech: ["ViT", "SMOTE", "CT Imaging", "Deep Learning"],
    metrics: "Published Research",
    link: "https://github.com/ErdemAslans/Automated-Pulmonary-Hypertension-Detection-Model-Based-on-ViT"
  },
  {
    id: 5,
    title: "DocFlow RPA Pipeline",
    category: "enterprise",
    description: "End-to-end document processing and classification pipeline integrating OCR, LLM analysis, and Robot Framework automation for enterprise document workflows.",
    tech: ["PyTorch", "Transformers", "RPA", "OCR"],
    metrics: "10,000+ Daily Documents",
    link: "https://github.com/ErdemAslans/DocFlow-RPA"
  },
  {
    id: 6,
    title: "Business Intelligence Platform",
    category: "enterprise",
    description: "Comprehensive BI system providing real-time analytics, strategic insights, and automated decision support across retail operations with natural language interface.",
    tech: ["OpenAI SDK", "Python", "Analytics", "SQL"],
    metrics: "Real-time Analytics",
    link: "https://github.com/ErdemAslans/OpenAI-SDK-Analytics-AI-Platform"
  },
  {
    id: 7,
    title: "Autonomous Driving Segmentation",
    category: "autonomous",
    description: "Deep learning approach for color map segmentation using Vision Transformer and SegFormer models with CARLA simulator integration for autonomous vehicle systems.",
    tech: ["ViT", "SegFormer", "CARLA", "Computer Vision"],
    metrics: "Real-time Segmentation",
    link: "https://github.com/ErdemAslans/Autonomous_Driving_Segmentation_Using_ViT_and_SegFormer_with_CARLA"
  },
  {
    id: 8,
    title: "IoT Fleet Management",
    category: "enterprise",
    description: "Microservices-based IoT fleet management system with real-time tracking, analytics, and intelligent routing capabilities for enterprise logistics operations.",
    tech: ["TypeScript", "Microservices", "IoT", "Node.js"],
    metrics: "Enterprise Scale",
    link: "https://github.com/ErdemAslans/iot-fleet-management-microservices"
  },
  {
    id: 9,
    title: "Credit Risk Prediction",
    category: "fintech",
    description: "Advanced ML pipeline using XGBoost, LightGBM, and CatBoost for credit default risk assessment with sophisticated feature engineering and class imbalance handling.",
    tech: ["XGBoost", "LightGBM", "CatBoost", "Feature Engineering"],
    metrics: "Advanced ML Pipeline",
    link: "https://github.com/ErdemAslans/Home-Credit-Risk-Prediction-with-XGBoost-LightGBM-and-CatBoost-Analysis-Credit-Default-Risk-Dataset"
  },
  {
    id: 10,
    title: "AI Banking Platform",
    category: "fintech",
    description: "AI-powered banking platform consolidating multiple intelligent solutions for streamlined banking processes including fraud detection, risk assessment, and customer analytics.",
    tech: ["Python", "ML Models", "Banking APIs", "Analytics"],
    metrics: "Multi-Model System",
    link: "https://github.com/ErdemAslans/ALL-IN-BANKER"
  },
  {
    id: 11,
    title: "Whisper RAG QA System",
    category: "agent-systems",
    description: "Transcription and question-answering system combining Whisper audio transcription with RAG-based retrieval for intelligent document querying.",
    tech: ["Whisper", "RAG", "Python", "NLP"],
    metrics: "Audio + Text Intelligence",
    link: "https://github.com/ErdemAslans/Whisper-Transcription-RAG-and-QA-System"
  },
  {
    id: 12,
    title: "TSP Route Optimization",
    category: "autonomous",
    description: "Innovative solution for optimizing routes in autonomous systems by solving the Traveling Salesman Problem using advanced algorithms with interactive visualizations.",
    tech: ["Algorithms", "Python", "Optimization", "Visualization"],
    metrics: "Hackathon Project",
    link: "https://github.com/ErdemAslans/CityCoordinatesAlgorithm-for-Autonomous-Systems-Hackathon-Challenge"
  }
];

export const projectFilters = [
  { id: 'all', label: 'All Projects' },
  { id: 'agent-systems', label: 'Agent Systems' },
  { id: 'medical-ai', label: 'Medical AI' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'autonomous', label: 'Autonomous' },
  { id: 'fintech', label: 'FinTech' }
];

export const filterProjects = (projects, filter) => {
  if (filter === 'all') return projects;
  return projects.filter(p => p.category === filter);
};
