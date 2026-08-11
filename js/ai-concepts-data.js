/* ==========================================================================
   AI CONCEPTS & ACADEMY DATA
   ========================================================================== */

const AI_CONCEPTS_DATA = [
  {
    id: "rag",
    title: "Retrieval-Augmented Generation (RAG)",
    category: "LLM Systems",
    summary: "Enhancing AI responses with real-time private document retrieval.",
    readTime: "6 min read",
    ratingCount: 142,
    avgRating: 4.9,
    description: "RAG connects Large Language Models to external knowledge bases. Instead of relying solely on pre-trained memory, the model retrieves relevant document chunks from a Vector Database using cosine similarity and injects them directly into the context window.",
    keyPoints: [
      "Vector Embeddings transform text into high-dimensional semantic vectors.",
      "Cosine Similarity finds the top-k most relevant document chunks.",
      "Grounding eliminates hallucination by providing verified facts."
    ],
    mathFormula: "Similarity(A, B) = (A · B) / (||A|| ||B||)",
    codeExample: `def retrieve_and_generate(query, vector_db, llm_model):\n    query_embedding = embed(query)\n    context_chunks = vector_db.search_similarity(query_embedding, top_k=3)\n    augmented_prompt = f"Context: {context_chunks}\\n\\nQuestion: {query}"\n    return llm_model.generate(augmented_prompt)`
  },
  {
    id: "transformers",
    title: "Transformer Architecture & Self-Attention",
    category: "Deep Learning",
    summary: "The revolutionary neural mechanism behind modern AI models.",
    readTime: "8 min read",
    ratingCount: 218,
    avgRating: 5.0,
    description: "Introduced in 'Attention Is All You Need' (2017), Transformers replace sequential recurrence (RNNs) with parallelizable self-attention mechanisms, allowing models to weigh the contextual relationship between every word in a sequence simultaneously.",
    keyPoints: [
      "Query (Q), Key (K), and Value (V) projections map token vectors.",
      "Scaled Dot-Product computes attention weights across the entire sequence.",
      "Multi-Head Attention enables capturing diverse relational patterns."
    ],
    mathFormula: "Attention(Q, K, V) = Softmax( (Q K^T) / sqrt(d_k) ) V",
    codeExample: `import torch\nimport torch.nn.functional as F\n\ndef scaled_dot_product_attention(Q, K, V):\n    d_k = Q.size(-1)\n    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)\n    attention_weights = F.softmax(scores, dim=-1)\n    return torch.matmul(attention_weights, V), attention_weights`
  },
  {
    id: "fine-tuning",
    title: "LoRA & Efficient Fine-Tuning (PEFT)",
    category: "Model Optimization",
    summary: "Adapting foundation models with 99% fewer trainable parameters.",
    readTime: "7 min read",
    ratingCount: 98,
    avgRating: 4.8,
    description: "Low-Rank Adaptation (LoRA) freezes the original model weights and injects trainable rank-decomposition matrices into Transformer layers. This reduces GPU VRAM requirements by up to 80% while matching full fine-tuning performance.",
    keyPoints: [
      "Weight updates are decomposed into W = W0 + (A x B).",
      "Rank 'r' typically ranges between 8 and 64.",
      "Zero latency overhead during inference via matrix merging."
    ],
    mathFormula: "h = W0 * x + (BA) * x",
    codeExample: `from peft import LoraConfig, get_peft_model\n\nlora_config = LoraConfig(\n    r=16,\n    lora_alpha=32,\n    target_modules=["q_proj", "v_proj"],\n    lora_dropout=0.05\n)\nmodel = get_peft_model(base_model, lora_config)`
  },
  {
    id: "embeddings",
    title: "Vector Embeddings & Semantic Search",
    category: "Machine Learning",
    summary: "Mapping human concepts into high-dimensional vector spaces.",
    readTime: "5 min read",
    ratingCount: 85,
    avgRating: 4.9,
    description: "Vector embeddings translate text, images, or audio into dense arrays of numbers where distance represents conceptual similarity. Words with similar meanings (e.g. 'king' and 'queen') sit close together in vector space.",
    keyPoints: [
      "Dense vectors capture deep contextual semantics.",
      "HNSW & IVF algorithms enable sub-millisecond similarity search.",
      "Powers search engines, recommendation systems, and RAG."
    ],
    mathFormula: "d_Euclidean(u, v) = sqrt( sum( (u_i - v_i)^2 ) )",
    codeExample: `from sentence_transformers import SentenceTransformer\n\nmodel = SentenceTransformer('all-MiniLM-L6-v2')\nsentences = ["Artificial intelligence is fascinating", "Machine learning powers modern AI"]\nembeddings = model.encode(sentences)`
  }
];
