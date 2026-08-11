/* ==========================================================================
   RESEARCH & PUBLICATIONS DATA MODULE - TANMAY SAH, PhD
   ========================================================================== */

const BLOG_DATA = [
  {
    id: "verifier-tax",
    title: "The Verifier Tax: Horizon Dependent Safety-Success Tradeoffs in Tool Using LLM Agents",
    date: "ACM CAIS 2026",
    readTime: "8 min read",
    category: "ACM Conference Paper",
    tags: ["#ACM-CAIS", "#AIAgents", "#Verification", "#LLMs"],
    ratingCount: 156,
    avgRating: 5.0,
    excerpt: "Research presented at the inaugural ACM Conference on AI and Agentic Systems (CAIS 2026). Authors: T. Sah, V. Srivastava, D. Sah, K. Jordan.",
    contentHtml: `
      <p class="lead">As autonomous AI agents are entrusted with tool usage—from executing API calls to database updates—verifying agent outputs becomes critical. Our research introduces the concept of <strong>The Verifier Tax</strong>.</p>

      <h3>1. Defining the Verifier Tax</h3>
      <p>Adding verification layers (such as formal checking, double-check LLMs, or rule-based validators) increases safety but introduces latency and compute overhead:</p>
      <ul>
        <li><strong>Safety Gain:</strong> Reduces catastrophic tool execution errors by up to 92%.</li>
        <li><strong>Compute Tax:</strong> Adds 1.3x to 2.1x token overhead per trajectory step.</li>
      </ul>

      <div class="math-block">
        Efficiency_Score = (Success_Rate * Safety_Weight) / (Total_Tokens * Latency_Penalty)
      </div>

      <h3>2. Verifier Integration Code Pattern</h3>
      <div class="code-snippet-box">
        <button class="code-copy-btn" onclick="copyCodeSnippet(this)">Copy Code</button>
        <pre><code>class VerifierAgent:
    def __init__(self, agent_model, validator_rules):
        self.agent = agent_model
        self.rules = validator_rules

    def execute_tool_with_verification(self, task, tool_call):
        # Pre-execution safety check
        if not self.rules.verify_tool_safety(tool_call):
            raise SecurityException("Tool call failed pre-execution verification")

        # Execute tool safely
        result = self.agent.execute_tool(tool_call)

        # Post-execution outcome verification
        verified = self.rules.verify_output_correctness(task, result)
        return {"result": result, "verified": verified}</code></pre>
      </div>
    `
  },
  {
    id: "reddit-memes-virality",
    title: "Decoding Reddit Memes Virality: Machine Learning & NLP Analytics",
    date: "Int'l Journal of Data Science & Analytics (2025)",
    readTime: "9 min read",
    category: "Journal Publication",
    tags: ["#DataScience", "#MachineLearning", "#NLP", "#Journal"],
    ratingCount: 142,
    avgRating: 4.9,
    excerpt: "Published in the International Journal of Data Science and Analytics. Authors: T. Sah, K. Jordan. Applying ML and sentiment dynamics to predict online engagement.",
    contentHtml: `
      <p class="lead">Multimodal machine learning study predicting online post virality using textual, structural, and network features from large-scale Reddit communities.</p>

      <h3>1. Core Insights</h3>
      <p>Early velocity metrics combined with text sentiment intensity provide a 91.2% accuracy in predicting top 1% viral reach.</p>
    `
  },
  {
    id: "automation-risk-bayesian",
    title: "Quantifying Automation Risk in High-Automation AI Systems: A Bayesian Framework",
    date: "arXiv Preprint (2026)",
    readTime: "7 min read",
    category: "arXiv Preprint",
    tags: ["#Bayesian", "#AIRisk", "#Automation", "#Research"],
    ratingCount: 98,
    avgRating: 4.9,
    excerpt: "Bayesian framework for modeling failure propagation and optimal oversight in high-automation AI environments. Authors: V. Srivastava, T. Sah.",
    contentHtml: `
      <p class="lead">Mathematical framework for modeling cascade failure risks in autonomous AI pipelines with optimal human-in-the-loop oversight triggers.</p>
    `
  },
  {
    id: "ai-evaluability-gap",
    title: "The AI Evaluability Gap: The Missing Layer for Managing Risk & Sustaining Value",
    date: "arXiv Preprint (2026)",
    readTime: "6 min read",
    category: "arXiv Preprint",
    tags: ["#Evaluability", "#ModelValidation", "#AIRisk"],
    ratingCount: 110,
    avgRating: 4.8,
    excerpt: "Research analyzing the structural challenges of evaluating generative AI and agentic systems in enterprise risk environments. Authors: V. Srivastava, T. Sah.",
    contentHtml: `
      <p class="lead">Bridging the gap between empirical model evaluation, continuous monitoring, and regulatory model validation standards.</p>
    `
  }
];
