/* ==========================================================================
   AI VISUALIZERS INTERACTIVE ENGINES
   ========================================================================== */

// 1. NEURAL NETWORK CANVAS SIMULATOR
class NeuralNetSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.learningRate = 0.01;
    this.epochs = 100;
    this.nodesPerLayer = [3, 4, 4, 2];
    this.animFrame = null;
    this.time = 0;
    
    this.initResize();
    this.initControls();
    this.animate();
  }

  initResize() {
    const resize = () => {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);
  }

  initControls() {
    const lrSlider = document.getElementById('lr-slider');
    const lrVal = document.getElementById('lr-val');
    if (lrSlider && lrVal) {
      lrSlider.addEventListener('input', (e) => {
        this.learningRate = parseFloat(e.target.value);
        lrVal.textContent = this.learningRate;
      });
    }

    const trainBtn = document.getElementById('train-model-btn');
    if (trainBtn) {
      trainBtn.addEventListener('click', () => {
        this.triggerPulse();
      });
    }
  }

  triggerPulse() {
    this.pulseTime = 0;
  }

  animate() {
    this.time += 0.03;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const w = this.canvas.width;
    const h = this.canvas.height;
    const layers = this.nodesPerLayer.length;
    const layerSpacing = w / (layers + 1);

    // Calculate node coordinates
    const coords = [];
    for (let l = 0; l < layers; l++) {
      const nodeCount = this.nodesPerLayer[l];
      const nodeSpacing = h / (nodeCount + 1);
      const layerCoords = [];
      for (let n = 0; n < nodeCount; n++) {
        layerCoords.push({
          x: layerSpacing * (l + 1),
          y: nodeSpacing * (n + 1),
          val: Math.sin(this.time + l * 0.8 + n * 0.5) * 0.5 + 0.5
        });
      }
      coords.push(layerCoords);
    }

    // Draw connection lines
    for (let l = 0; l < layers - 1; l++) {
      for (let i = 0; i < coords[l].length; i++) {
        for (let j = 0; j < coords[l + 1].length; j++) {
          const start = coords[l][i];
          const end = coords[l + 1][j];
          
          const pulse = Math.sin(this.time * 2 + i + j) * 0.5 + 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(start.x, start.y);
          this.ctx.lineTo(end.x, end.y);
          this.ctx.strokeStyle = `rgba(37, 99, 235, ${0.15 + pulse * 0.25 * (this.learningRate * 50)})`;
          this.ctx.lineWidth = 1 + pulse * 1.5;
          this.ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (let l = 0; l < layers; l++) {
      for (let n = 0; n < coords[l].length; n++) {
        const node = coords[l][n];
        
        // Glow effect
        const grad = this.ctx.createRadialGradient(node.x, node.y, 4, node.x, node.y, 16);
        grad.addColorStop(0, 'rgba(37, 99, 235, 0.8)');
        grad.addColorStop(1, 'rgba(13, 148, 136, 0.0)');
        
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
        this.ctx.fillStyle = grad;
        this.ctx.fill();

        // Inner Circle
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        this.ctx.fillStyle = l === 0 ? '#0D9488' : (l === layers - 1 ? '#2563EB' : '#334155');
        this.ctx.fill();
        this.ctx.strokeStyle = '#FAF9F6';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      }
    }

    this.animFrame = requestAnimationFrame(() => this.animate());
  }
}

// 2. TOKENIZER & ATTENTION HEATMAP WIDGET
function updateTokenizerPreview(inputText) {
  const container = document.getElementById('token-chips-wrapper');
  const heatmapContainer = document.getElementById('attention-heatmap-wrapper');
  if (!container || !heatmapContainer) return;

  const words = inputText.trim() ? inputText.trim().split(/\s+/) : ["Understanding", "Transformers", "is", "fun"];
  container.innerHTML = '';
  
  words.forEach((word, idx) => {
    const chip = document.createElement('span');
    chip.className = `token-chip token-chip-${idx % 5}`;
    chip.innerHTML = `<code>[${idx}]</code> ${word}`;
    container.appendChild(chip);
  });

  // Generate Attention Heatmap Grid
  const size = words.length;
  heatmapContainer.style.gridTemplateColumns = `repeat(${size}, 38px)`;
  heatmapContainer.innerHTML = '';

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      
      // Simulate attention score
      const score = r === c ? 0.95 : (1 / Math.abs(r - c + 1.5)).toFixed(2);
      const intensity = Math.min(1, Math.max(0.1, score));
      
      cell.style.background = `rgba(37, 99, 235, ${intensity})`;
      cell.textContent = score;
      cell.title = `Attention: "${words[r]}" -> "${words[c]}" = ${score}`;
      heatmapContainer.appendChild(cell);
    }
  }
}

// 3. PROMPT ENGINEERING SANDBOX COMPARISON
function runPromptSandbox() {
  const inputEl = document.getElementById('sandbox-prompt-input');
  const outputZero = document.getElementById('output-zero-shot');
  const outputFew = document.getElementById('output-few-shot');
  const outputCot = document.getElementById('output-cot');
  
  if (!inputEl) return;
  const promptText = inputEl.value.trim() || "Classify the sentiment: 'I love learning AI concepts!'";

  if (outputZero) {
    outputZero.textContent = "Processing Zero-Shot...\n> Sentiment: Positive";
  }
  if (outputFew) {
    outputFew.textContent = "Processing Few-Shot...\n> Input: 'I love learning AI concepts!'\n> Output: Positive (Confidence: 99.4%)";
  }
  if (outputCot) {
    outputCot.textContent = "Processing Chain-of-Thought...\n> Step 1: Detect emotion keywords ('love', 'learning').\n> Step 2: Evaluate context (enthusiastic educational tone).\n> Step 3: Conclude sentiment.\n> (Note: CoT samples intermediate generation steps; true verification requires external rules).\n> Output: Positive";
  }
}
