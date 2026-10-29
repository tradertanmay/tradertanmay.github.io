/* ==========================================================================
   RESUME & PORTFOLIO DATA MODULE - TANMAY SAH, PhD
   ========================================================================== */

const RESUME_DATA = {
  profile: {
    name: "Tanmay Sah, PhD",
    title: "AI Researcher | Senior Quantitative Modeler | Machine Learning Practitioner",
    bio: "AI researcher and quantitative modeler with 14+ years of industry experience and a PhD in Data Science. My work focuses on machine learning, model validation, large language models, AI agents, verification, and building reliable and evaluable AI systems.",
    location: "Salt Lake City, UT / Remote",
    github: "https://github.com/tradertanmay",
    linkedin: "https://www.linkedin.com/in/tanmay-sah/",
    scholar: "https://scholar.google.com/citations?hl=en&user=zKhoa-QAAAAJ",
    dblp: "https://dblp.org",
    email: ""
  },
  
  stats: {
    yearsExperience: "14+",
    phdDegree: "PhD Data Science",
    keynoteVenues: "ACM CAIS, SciPy, ODSC",
    githubRepo: "tradertanmay"
  },

  experience: [
    {
      role: "Senior Quantitative Modeler",
      company: "Zions Bancorporation",
      period: "Senior Modeler & AI Researcher",
      description: "Spearhead quantitative modeling, model validation, machine learning pipelines, and AI agent reliability frameworks. Lead research initiatives in evaluable AI systems, risk assessment, and statistical modeling.",
      tags: ["Quantitative Modeling", "Model Validation", "AI Agents", "Python", "Risk Assessment"]
    },
    {
      role: "PhD Researcher & Data Scientist",
      company: "Harrisburg University",
      period: "PhD in Data Science",
      description: "Conducted advanced PhD research in Machine Learning, Statistical Modeling, AI Agent Verification, and Neural Architectures. Author and speaker at major venues including ACM CAIS, AI Engineer World's Fair, SciPy, and ODSC AI West.",
      tags: ["Data Science PhD", "LLM Verification", "Machine Learning", "Research"]
    },
    {
      role: "Quantitative & ML Practitioner",
      company: "Financial & Tech Enterprises",
      period: "14+ Years Industry Experience",
      description: "Over 14 years of end-to-end expertise spanning quantitative analysis, predictive modeling, automated validation toolkits, and machine learning infrastructure.",
      tags: ["14+ Yrs Exp", "Machine Learning", "Statistical Modeling", "PyTorch", "Scikit-Learn"]
    }
  ],

  speakingEngagements: [
    "ACM CAIS (Conference on AI and Agentic Systems)",
    "AI Engineer World's Fair",
    "SciPy Conference",
    "ODSC AI West (Open Data Science Conference)"
  ],

  skills: [
    { category: "AI & Agent Research", items: ["Large Language Models", "AI Agents", "Agent Verification", "World Models", "Model Evaluation", "Model Validation"] },
    { category: "Quantitative & ML", items: ["Quantitative Modeling", "Statistical Modeling", "Machine Learning", "Deep Learning", "Predictive Analytics"] },
    { category: "Core Tech & Frameworks", items: ["Python", "PyTorch", "Scikit-Learn", "TanML", "Git / Open Source"] }
  ],

  projects: [
    {
      title: "EvoUndo",
      subtitle: "Recoverability-Constrained Self-Evolution for LLM Agent Harnesses",
      description: "Research framework and runtime establishing recoverability invariants across self-evolving LLM agent harnesses, guaranteeing reversal across counterfactual execution states.",
      tags: ["arXiv:2608.28363", "AI Agents", "Self-Evolution", "Python"],
      githubUrl: "https://github.com/evoundo/evoundo",
      btnLabel: "View on GitHub ↗"
    },
    {
      title: "The Verifier Tax",
      subtitle: "Safety–Success Tradeoffs in Tool-Using LLM Agents",
      description: "Empirical research examining safety–success tradeoffs in tool-using LLM agent execution, introducing formal verifier tax metrics to quantify computational and latency costs.",
      tags: ["ACM CAIS 2026", "LLM Agents", "Verification", "AI Safety"],
      githubUrl: "https://dl.acm.org/doi/full/10.1145/3786335.3813160",
      btnLabel: "View ACM Publication ↗"
    },
    {
      title: "TanML",
      subtitle: "Automated Validation Toolkit for Tabular Machine Learning Models",
      description: "Open-source automated model validation toolkit published in the Journal of Open Source Software (JOSS) and peer-reviewed by pyOpenSci for regulatory model governance (SR 11-7).",
      tags: ["JOSS 2024", "pyOpenSci", "Model Validation", "PyPI"],
      githubUrl: "https://github.com/tdlabs-ai/tanml",
      btnLabel: "View Repository (GitHub) ↗"
    },
    {
      title: "AI Agents: Zero to Hero",
      subtitle: "From First Principles to Multi-Step Autonomous Agents",
      description: "Zero-dependency educational repository and workshop series explaining what makes an agent an agent in vanilla Python without framework abstractions.",
      tags: ["Vanilla Python", "AI Agents", "Education", "Open Source"],
      githubUrl: "https://github.com/tradertanmay/ai-agents-zero-to-hero",
      btnLabel: "View Repository (GitHub) ↗"
    },
    {
      title: "Decoding Reddit Memes Virality",
      subtitle: "Multimodal Machine Learning Virality Prediction",
      description: "Machine-learning research analyzing multimodal signals and social network metrics to predict meme virality, published in Springer Nature.",
      tags: ["Springer 2025", "Machine Learning", "Social Data", "Research"],
      githubUrl: "https://link.springer.com/article/10.1007/s41060-025-00772-5",
      btnLabel: "View Springer Publication ↗"
    }
  ]
};
