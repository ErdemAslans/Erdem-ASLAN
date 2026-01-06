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
    metrics: "OCR + LLM + RPA Integration",
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

// Detailed case studies for featured projects
export const projectCaseStudies = [
  {
    projectId: 1,
    overview: "A comprehensive Kubernetes-orchestrated multi-agent architecture designed for enterprise customer service operations. This system handles complex multi-system operations through intelligent workflow orchestration, processing requests across 10+ APIs seamlessly.",
    problemStatement: "Enterprise customer service operations often require interaction with multiple backend systems simultaneously. Traditional approaches result in slow response times, inconsistent data handling, and poor scalability. Organizations needed a solution that could intelligently route requests, maintain context across systems, and scale efficiently.",
    solution: "We designed a multi-agent architecture using Google ADK, where specialized agents handle different aspects of customer service. A central orchestrator coordinates these agents, managing state and ensuring consistent responses. The system is containerized with Docker and orchestrated via Kubernetes for production-grade scalability.",
    architecture: {
      description: "The architecture follows a hub-and-spoke model where the orchestrator agent receives requests and delegates to specialized agents (billing, inventory, support, etc.). Each agent is a microservice with its own scaling policies. Communication happens through a message queue for reliability.",
      diagram: null
    },
    challenges: [
      {
        title: "Agent Coordination Complexity",
        description: "Coordinating multiple agents while maintaining conversation context and handling partial failures was challenging.",
        solution: "Implemented a state machine pattern with persistent context storage and graceful degradation strategies for agent failures."
      },
      {
        title: "Latency Requirements",
        description: "Enterprise SLAs required sub-second response times even when multiple agents were involved.",
        solution: "Introduced parallel agent execution, response caching, and predictive agent warming based on conversation patterns."
      },
      {
        title: "Kubernetes Resource Management",
        description: "Efficiently scaling heterogeneous agent workloads with different resource requirements.",
        solution: "Implemented custom HPA metrics based on agent queue depth and configured pod disruption budgets for zero-downtime updates."
      }
    ],
    impact: {
      metrics: [
        { label: "APIs Orchestrated", value: "10+" },
        { label: "Response Time", value: "<800ms" },
        { label: "Uptime", value: "99.9%" },
        { label: "Cost Reduction", value: "40%" }
      ],
      testimonial: null
    },
    codeSnippets: [
      {
        filename: "orchestrator.py",
        language: "python",
        code: `class AgentOrchestrator:
    def __init__(self, agents: List[BaseAgent]):
        self.agents = {a.name: a for a in agents}
        self.state_manager = StateManager()
    
    async def process_request(self, request: Request) -> Response:
        context = await self.state_manager.get_context(request.session_id)
        
        # Determine which agents are needed
        required_agents = self.route_request(request, context)
        
        # Execute agents in parallel where possible
        results = await asyncio.gather(*[
            self.agents[name].execute(request, context)
            for name in required_agents
        ])
        
        # Aggregate and return response
        return self.aggregate_results(results, context)`
      }
    ]
  },
  {
    projectId: 3,
    overview: "A multi-disease analysis platform leveraging Vision Transformers to achieve 95%+ accuracy in medical imaging diagnostics. The platform supports multiple disease detection models with secure authentication and comprehensive analysis capabilities.",
    problemStatement: "Medical imaging diagnosis is time-consuming and requires specialized expertise. Many regions lack sufficient radiologists, leading to delayed diagnoses. Additionally, existing AI solutions often focus on single diseases, requiring multiple systems for comprehensive patient analysis.",
    solution: "Built a unified platform using PyTorch and Vision Transformers that can analyze medical images for multiple conditions. The system includes a FastAPI backend with JWT authentication, ensuring HIPAA-compliant data handling. Each disease model is fine-tuned from pre-trained ViT weights for optimal accuracy.",
    architecture: {
      description: "Microservices architecture with separate inference services for each disease model. A gateway API handles authentication and routing. Models are served using TorchServe with automatic batching for efficiency.",
      diagram: null
    },
    challenges: [
      {
        title: "Class Imbalance in Medical Data",
        description: "Medical datasets often have severe class imbalance with rare conditions underrepresented.",
        solution: "Applied SMOTE for synthetic sample generation and implemented focal loss to handle imbalanced classes effectively."
      },
      {
        title: "Model Interpretability",
        description: "Clinicians require explanations for AI predictions to trust and validate results.",
        solution: "Integrated Grad-CAM visualizations to highlight regions of interest that influenced the model's decision."
      },
      {
        title: "Inference Latency",
        description: "ViT models are computationally intensive, potentially causing slow inference times.",
        solution: "Implemented model quantization and TensorRT optimization, reducing inference time by 60% while maintaining accuracy."
      }
    ],
    impact: {
      metrics: [
        { label: "Diagnostic Accuracy", value: "95%+" },
        { label: "Diseases Supported", value: "5" },
        { label: "Inference Time", value: "<2s" },
        { label: "Models Deployed", value: "5" }
      ],
      testimonial: null
    },
    codeSnippets: [
      {
        filename: "vit_classifier.py",
        language: "python",
        code: `class MedicalViTClassifier(nn.Module):
    def __init__(self, num_classes: int, pretrained: bool = True):
        super().__init__()
        self.vit = timm.create_model(
            'vit_base_patch16_224',
            pretrained=pretrained,
            num_classes=num_classes
        )
        self.attention_weights = None
        
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # Get attention maps for interpretability
        self.attention_weights = self.vit.blocks[-1].attn.get_attention_map()
        return self.vit(x)
    
    def get_cam(self, x: torch.Tensor) -> np.ndarray:
        """Generate class activation map for interpretability"""
        return grad_cam(self, x, self.attention_weights)`
      }
    ]
  },
  {
    projectId: 2,
    overview: "A production-ready Agentic RAG system built with LangGraph's native features, implementing advanced patterns for multi-agent orchestration and intelligent retrieval with context-aware responses.",
    problemStatement: "Traditional RAG systems struggle with complex queries that require multi-step reasoning, real-time information synthesis, and dynamic context management. Users need accurate, contextual answers that leverage multiple knowledge sources intelligently.",
    solution: "Implemented an Agentic RAG architecture using LangGraph that combines retrieval with reasoning agents. The system uses a supervisor pattern where a planning agent coordinates retrieval, synthesis, and validation agents to produce high-quality responses.",
    architecture: {
      description: "Graph-based architecture where nodes represent different agent capabilities (retrieve, reason, validate). Edges define possible transitions based on query complexity and intermediate results. State is managed through LangGraph's native checkpointing.",
      diagram: null
    },
    challenges: [
      {
        title: "Query Understanding",
        description: "Complex queries often require decomposition into sub-queries for effective retrieval.",
        solution: "Implemented a query planning agent that analyzes intent and generates optimized sub-queries with different retrieval strategies."
      },
      {
        title: "Context Window Management",
        description: "Large document sets can exceed LLM context limits, requiring intelligent selection.",
        solution: "Built a hierarchical summarization pipeline with relevance scoring to fit the most pertinent information within context limits."
      }
    ],
    impact: {
      metrics: [
        { label: "Answer Accuracy", value: "92%" },
        { label: "Retrieval Precision", value: "89%" },
        { label: "Query Types Supported", value: "Multi-hop" },
        { label: "Avg Response Time", value: "3.2s" }
      ],
      testimonial: null
    },
    codeSnippets: [
      {
        filename: "rag_graph.py",
        language: "python",
        code: `from langgraph.graph import StateGraph, END

def create_agentic_rag():
    workflow = StateGraph(AgentState)
    
    # Add nodes for each agent capability
    workflow.add_node("plan", plan_query)
    workflow.add_node("retrieve", retrieve_documents)
    workflow.add_node("reason", synthesize_answer)
    workflow.add_node("validate", validate_response)
    
    # Define conditional edges
    workflow.add_conditional_edges(
        "plan",
        should_retrieve,
        {"retrieve": "retrieve", "direct": "reason"}
    )
    
    workflow.add_edge("retrieve", "reason")
    workflow.add_edge("reason", "validate")
    workflow.add_conditional_edges(
        "validate",
        is_valid,
        {"yes": END, "no": "plan"}
    )
    
    return workflow.compile()`
      }
    ]
  }
];

export const getProjectSlug = (project) => {
  return project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export const getProjectBySlug = (slug) => {
  return projects.find(p => getProjectSlug(p) === slug);
};

export const getCaseStudy = (projectId) => {
  return projectCaseStudies.find(cs => cs.projectId === projectId);
};
