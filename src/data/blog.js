export const blogCategories = [
  { id: 'ai-ml', label: 'AI/ML' },
  { id: 'web-dev', label: 'Web Development' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'tutorials', label: 'Tutorials' },
];

export const blogPosts = [
  {
    slug: 'building-multi-agent-systems-with-langgraph',
    title: 'Building Production-Ready Multi-Agent Systems with LangGraph',
    excerpt: 'A comprehensive guide to architecting and deploying multi-agent AI systems using LangGraph, covering orchestration patterns, state management, and production considerations.',
    category: 'ai-ml',
    tags: ['LangGraph', 'Multi-Agent', 'LLMs', 'Python'],
    date: '2024-12-15',
    readingTime: 12,
    coverImage: null,
    content: `Multi-agent systems represent the next evolution in AI applications. In this article, we explore how to build production-ready multi-agent architectures using LangGraph.

## Why Multi-Agent Systems?

Traditional single-agent LLM applications have limitations when it comes to complex tasks that require different expertise or parallel processing. Multi-agent systems solve this by allowing specialized agents to collaborate.

## Key Components

1. **Agent Orchestration**: How agents communicate and coordinate
2. **State Management**: Maintaining context across agent interactions
3. **Error Handling**: Graceful degradation and recovery strategies
4. **Monitoring**: Observability in distributed agent systems

## Implementation Patterns

When building multi-agent systems, consider these proven patterns...`,
    contentHtml: `<p>Multi-agent systems represent the next evolution in AI applications. In this article, we explore how to build production-ready multi-agent architectures using LangGraph.</p>

<h2 id="why-multi-agent">Why Multi-Agent Systems?</h2>
<p>Traditional single-agent LLM applications have limitations when it comes to complex tasks that require different expertise or parallel processing. Multi-agent systems solve this by allowing specialized agents to collaborate.</p>

<h2 id="key-components">Key Components</h2>
<ol>
<li><strong>Agent Orchestration</strong>: How agents communicate and coordinate</li>
<li><strong>State Management</strong>: Maintaining context across agent interactions</li>
<li><strong>Error Handling</strong>: Graceful degradation and recovery strategies</li>
<li><strong>Monitoring</strong>: Observability in distributed agent systems</li>
</ol>

<h2 id="implementation">Implementation Patterns</h2>
<p>When building multi-agent systems, consider these proven patterns for reliable production deployments. The key is to start simple and add complexity only as needed.</p>

<pre><code class="language-python">from langgraph.graph import StateGraph, END

# Define your agent state
class AgentState(TypedDict):
    messages: list
    current_agent: str
    task_complete: bool

# Create the graph
workflow = StateGraph(AgentState)
</code></pre>

<p>This foundation allows you to build sophisticated agent interactions while maintaining clean, testable code.</p>`,
    headings: [
      { id: 'why-multi-agent', text: 'Why Multi-Agent Systems?', level: 2 },
      { id: 'key-components', text: 'Key Components', level: 2 },
      { id: 'implementation', text: 'Implementation Patterns', level: 2 },
    ],
  },
  {
    slug: 'vision-transformers-medical-imaging',
    title: 'Applying Vision Transformers to Medical Imaging: Lessons from Research',
    excerpt: 'Insights from my published research on using Vision Transformers for pulmonary hypertension detection, including challenges, solutions, and practical applications.',
    category: 'ai-ml',
    tags: ['Vision Transformers', 'Medical AI', 'Deep Learning', 'Research'],
    date: '2024-11-20',
    readingTime: 15,
    coverImage: null,
    content: `Drawing from my published research on Vision Transformer and SMOTE Based Model for Automated Detection of Pulmonary Hypertension, this article shares practical insights for applying deep learning to medical imaging.

## The Challenge

Medical imaging analysis presents unique challenges: class imbalance, limited data, and the critical need for high accuracy. Our research addressed these through innovative techniques.

## Our Approach

We combined Vision Transformers with SMOTE (Synthetic Minority Over-sampling Technique) to achieve 95.40% accuracy in detecting pulmonary hypertension from CT scans.`,
    contentHtml: `<p>Drawing from my published research on Vision Transformer and SMOTE Based Model for Automated Detection of Pulmonary Hypertension, this article shares practical insights for applying deep learning to medical imaging.</p>

<h2 id="the-challenge">The Challenge</h2>
<p>Medical imaging analysis presents unique challenges: class imbalance, limited data, and the critical need for high accuracy. Our research addressed these through innovative techniques.</p>

<h2 id="our-approach">Our Approach</h2>
<p>We combined Vision Transformers with SMOTE (Synthetic Minority Over-sampling Technique) to achieve 95.40% accuracy in detecting pulmonary hypertension from CT scans.</p>

<blockquote>The key insight was that transformer architectures, originally designed for NLP, could capture spatial relationships in medical images more effectively than traditional CNNs for certain diagnostic tasks.</blockquote>

<h2 id="key-learnings">Key Learnings</h2>
<ul>
<li>Data augmentation is crucial but must be medically valid</li>
<li>Ensemble methods significantly improve robustness</li>
<li>Explainability is essential for clinical adoption</li>
</ul>`,
    headings: [
      { id: 'the-challenge', text: 'The Challenge', level: 2 },
      { id: 'our-approach', text: 'Our Approach', level: 2 },
      { id: 'key-learnings', text: 'Key Learnings', level: 2 },
    ],
  },
  {
    slug: 'rag-systems-enterprise-scale',
    title: 'Scaling RAG Systems for Enterprise: Architecture and Best Practices',
    excerpt: 'How to design and implement Retrieval-Augmented Generation systems that can handle enterprise workloads with high accuracy and low latency.',
    category: 'architecture',
    tags: ['RAG', 'LLMs', 'Vector DB', 'Enterprise'],
    date: '2024-10-10',
    readingTime: 10,
    coverImage: null,
    content: `Enterprise RAG systems require careful architecture to balance accuracy, latency, and cost. This guide covers the key considerations and patterns I've learned from building production RAG systems.

## Architecture Overview

A well-designed RAG system consists of several key components working together seamlessly.

## Retrieval Strategies

Not all retrieval methods are created equal. The choice depends on your specific use case and data characteristics.`,
    contentHtml: `<p>Enterprise RAG systems require careful architecture to balance accuracy, latency, and cost. This guide covers the key considerations and patterns I've learned from building production RAG systems.</p>

<h2 id="architecture-overview">Architecture Overview</h2>
<p>A well-designed RAG system consists of several key components working together seamlessly: document processing, embedding generation, vector storage, retrieval, and generation.</p>

<h2 id="retrieval-strategies">Retrieval Strategies</h2>
<p>Not all retrieval methods are created equal. The choice depends on your specific use case and data characteristics:</p>
<ul>
<li><strong>Semantic Search</strong>: Best for conceptual queries</li>
<li><strong>Hybrid Search</strong>: Combines semantic and keyword matching</li>
<li><strong>Re-ranking</strong>: Improves precision at the cost of latency</li>
</ul>

<h2 id="production-tips">Production Tips</h2>
<p>When deploying RAG systems at scale, consider caching strategies, fallback mechanisms, and continuous evaluation pipelines to maintain quality over time.</p>`,
    headings: [
      { id: 'architecture-overview', text: 'Architecture Overview', level: 2 },
      { id: 'retrieval-strategies', text: 'Retrieval Strategies', level: 2 },
      { id: 'production-tips', text: 'Production Tips', level: 2 },
    ],
  },
  {
    slug: 'kubernetes-ml-workloads',
    title: 'Orchestrating ML Workloads with Kubernetes: A Practical Guide',
    excerpt: 'Learn how to deploy, scale, and manage machine learning workloads on Kubernetes, from model serving to distributed training.',
    category: 'tutorials',
    tags: ['Kubernetes', 'MLOps', 'Docker', 'DevOps'],
    date: '2024-09-25',
    readingTime: 8,
    coverImage: null,
    content: `Kubernetes has become the de facto platform for running ML workloads at scale. This tutorial walks through the essentials of deploying ML systems on K8s.

## Why Kubernetes for ML?

Kubernetes provides the orchestration capabilities needed for complex ML workflows: auto-scaling, resource management, and fault tolerance.

## Getting Started

First, let's set up a basic ML serving infrastructure...`,
    contentHtml: `<p>Kubernetes has become the de facto platform for running ML workloads at scale. This tutorial walks through the essentials of deploying ML systems on K8s.</p>

<h2 id="why-kubernetes">Why Kubernetes for ML?</h2>
<p>Kubernetes provides the orchestration capabilities needed for complex ML workflows: auto-scaling, resource management, and fault tolerance.</p>

<h2 id="getting-started">Getting Started</h2>
<p>First, let's set up a basic ML serving infrastructure with a model deployment:</p>

<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: model-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: model-server
  template:
    spec:
      containers:
      - name: model
        image: my-model:v1
        resources:
          limits:
            nvidia.com/gpu: 1
</code></pre>

<h2 id="scaling-strategies">Scaling Strategies</h2>
<p>Use Horizontal Pod Autoscaler with custom metrics based on inference latency or queue depth for optimal scaling behavior.</p>`,
    headings: [
      { id: 'why-kubernetes', text: 'Why Kubernetes for ML?', level: 2 },
      { id: 'getting-started', text: 'Getting Started', level: 2 },
      { id: 'scaling-strategies', text: 'Scaling Strategies', level: 2 },
    ],
  },
];

export const getBlogPost = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (slug, limit = 3) => {
  const currentPost = getBlogPost(slug);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => post.slug !== slug && post.category === currentPost.category)
    .slice(0, limit);
};