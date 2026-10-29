/* ==========================================================================
   MAIN APPLICATION ROUTER & UI INTERACTION MODULE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initReaderControls();
  renderAIConcepts();
  renderResumeSection();
  renderBlogPosts();
  initVisualizers();
  initLiveAgentScene();
  initScrollRevealAndCounters();
});

/* 1. Scroll Progress Bar */
function initScrollProgressBar() {
  const progressBar = document.getElementById('reading-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
  });
}

/* 2. Reader Controls (Font Size & Focus Mode) */
function initReaderControls() {
  const fontSmall = document.getElementById('btn-font-sm');
  const fontMed = document.getElementById('btn-font-md');
  const fontLg = document.getElementById('btn-font-lg');
  const focusBtn = document.getElementById('btn-focus-mode');

  const setFontSize = (sizeClass) => {
    document.body.classList.remove('font-sm', 'font-md', 'font-lg', 'font-xl');
    document.body.classList.add(sizeClass);
    [fontSmall, fontMed, fontLg].forEach(btn => btn && btn.classList.remove('active'));
    if (sizeClass === 'font-sm' && fontSmall) fontSmall.classList.add('active');
    if (sizeClass === 'font-md' && fontMed) fontMed.classList.add('active');
    if (sizeClass === 'font-lg' && fontLg) fontLg.classList.add('active');
  };

  if (fontSmall) fontSmall.addEventListener('click', () => setFontSize('font-sm'));
  if (fontMed) fontMed.addEventListener('click', () => setFontSize('font-md'));
  if (fontLg) fontLg.addEventListener('click', () => setFontSize('font-lg'));

  if (focusBtn) {
    focusBtn.addEventListener('click', () => {
      document.body.classList.toggle('reader-mode');
      focusBtn.classList.toggle('active');
      focusBtn.innerHTML = document.body.classList.contains('reader-mode')
        ? '<span>🔍 Exit Focus</span>'
        : '<span>🎯 Focus Mode</span>';
    });
  }
}

/* 3. Render AI Concepts Grid */
function renderAIConcepts() {
  const grid = document.getElementById('ai-concepts-grid');
  if (!grid || typeof AI_CONCEPTS_DATA === 'undefined') return;

  grid.innerHTML = AI_CONCEPTS_DATA.map(concept => `
    <div class="card">
      <span class="badge badge-primary" style="margin-bottom: 0.5rem;">${concept.category}</span>
      <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-ink); margin-bottom: 0.5rem;">${concept.title}</h3>
      <p style="font-size: 0.9rem; color: var(--text-body); margin-bottom: 1rem;">${concept.summary}</p>
      
      <div style="font-size: 0.8rem; color: var(--text-muted);">
        ⏱️ ${concept.readTime}
      </div>
    </div>
  `).join('');
}

/* 4. Render Resume & Portfolio */
function renderResumeSection() {
  const expContainer = document.getElementById('resume-experience-list');
  const skillsContainer = document.getElementById('resume-skills-matrix');
  const projectsContainer = document.getElementById('resume-projects-grid');

  if (expContainer && typeof RESUME_DATA !== 'undefined') {
    expContainer.innerHTML = RESUME_DATA.experience.map(exp => `
      <div class="card" style="margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
          <h3 style="font-size: 1.1rem; color: var(--text-ink); font-weight: 700;">${exp.role}</h3>
          <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">${exp.period}</span>
        </div>
        <p style="font-size: 0.9rem; color: var(--accent-primary); font-weight: 600; margin-bottom: 0.5rem;">${exp.company}</p>
        <p style="font-size: 0.95rem; margin-bottom: 0.75rem;">${exp.description}</p>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
          ${exp.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  if (skillsContainer && typeof RESUME_DATA !== 'undefined') {
    skillsContainer.innerHTML = RESUME_DATA.skills.map(group => `
      <div class="card">
        <h4 style="font-size: 1rem; color: var(--text-ink); margin-bottom: 0.75rem;">${group.category}</h4>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
          ${group.items.map(item => `<span class="badge badge-primary">${item}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  if (projectsContainer && typeof RESUME_DATA !== 'undefined') {
    projectsContainer.innerHTML = RESUME_DATA.projects.map(proj => `
      <div class="card reveal-item" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
            <h4 style="font-size: 1.15rem; color: var(--text-ink); font-weight: 700;">${proj.title}</h4>
          </div>
          <p style="font-size: 0.85rem; color: var(--accent-primary); font-weight: 600; margin-bottom: 0.5rem;">${proj.subtitle || ''}</p>
          <p style="font-size: 0.9rem; color: var(--text-body); margin-bottom: 1.25rem;">${proj.description}</p>
        </div>
        
        <div>
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 1rem;">
            ${proj.tags.map(t => `<span class="badge badge-primary">${t}</span>`).join('')}
          </div>
          <a href="${proj.githubUrl || 'https://github.com/tradertanmay'}" target="_blank" class="btn-secondary" style="display: inline-block; padding: 0.4rem 0.85rem; font-size: 0.85rem; text-decoration: none; width: 100%; text-align: center;">${proj.btnLabel || 'View Project / Code ↗'}</a>
        </div>
      </div>
    `).join('');
  }
}

/* 5. Render Blog Posts & Modal Reader */
function renderBlogPosts() {
  const blogContainer = document.getElementById('blog-posts-container');
  if (!blogContainer || typeof BLOG_DATA === 'undefined') return;

  blogContainer.innerHTML = BLOG_DATA.map(post => `
    <div class="card" style="margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span class="badge badge-success">${post.category}</span>
        <span style="font-size: 0.8rem; color: var(--text-muted);">${post.date} &bull; ⏱️ ${post.readTime}</span>
      </div>
      
      <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-ink); margin-bottom: 0.5rem; cursor: pointer;" onclick="openArticleModal('${post.id}')">
        ${post.title}
      </h3>
      
      <p style="font-size: 0.95rem; color: var(--text-body); margin-bottom: 1rem;">${post.excerpt}</p>
      
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <button class="btn-primary" style="padding: 0.4rem 1rem; font-size: 0.85rem;" onclick="openArticleModal('${post.id}')">Read Full Article →</button>
      </div>
    </div>
  `).join('');
}

/* 6. Article Modal Manager */
function openArticleModal(postId) {
  const post = BLOG_DATA.find(p => p.id === postId);
  if (!post) return;

  const modal = document.getElementById('article-modal-overlay');
  const modalContent = document.getElementById('article-modal-body');

  if (modal && modalContent) {
    modalContent.innerHTML = `
      <span class="badge badge-success" style="margin-bottom: 0.5rem;">${post.category}</span>
      <h2 style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--text-ink); margin-bottom: 0.75rem;">${post.title}</h2>
      <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
        Published on ${post.date} &bull; ⏱️ ${post.readTime}
      </div>
      <div class="reading-container">
        ${post.contentHtml}
      </div>
    `;
    modal.classList.add('active');
  }
}

function closeArticleModal() {
  const modal = document.getElementById('article-modal-overlay');
  if (modal) modal.classList.remove('active');
}

/* 7. Code Snippet Copy Button */
function copyCodeSnippet(btnEl) {
  const codeBox = btnEl.nextElementSibling;
  if (!codeBox) return;
  
  navigator.clipboard.writeText(codeBox.textContent).then(() => {
    const orig = btnEl.textContent;
    btnEl.textContent = 'Copied! ✓';
    btnEl.style.background = '#0D9488';
    setTimeout(() => {
      btnEl.textContent = orig;
      btnEl.style.background = '';
    }, 2000);
  });
}

/* 8. Init Canvas Visualizers */
function initVisualizers() {
  if (typeof NeuralNetSimulator !== 'undefined') {
    new NeuralNetSimulator('nn-canvas');
  }
  if (typeof updateTokenizerPreview === 'function') {
    updateTokenizerPreview('AI Agent Verification and Cascade Routing Networks');
  }
}

/* 9. Theme Toggle (Gold Animation Dark <-> Paper Light) */
function toggleSiteTheme() {
  const isGold = document.body.classList.toggle('theme-gold');
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.textContent = isGold ? '☀️ Light Mode' : '✨ Gold Animation Theme';
  }
}

/* 10. Native Live Agent Recovery Animation */
function initLiveAgentScene() {
  const scene = document.getElementById('evo-scene');
  const status = document.getElementById('evo-status');
  const stage = document.getElementById('evo-stage-text');
  const result = document.getElementById('evo-result-text');
  const fixed = document.getElementById('evo-fixed');
  const scan = document.getElementById('evo-scan');
  const file = document.getElementById('evo-file-state');
  const progress = document.getElementById('evo-progress-bar');
  const motion = document.getElementById('evo-motion');
  const replay = document.getElementById('evo-replay');
  const undo = document.getElementById('evo-undo-now');

  if (!scene || !status || !stage || !result || !fixed || !scan || !file || !progress) return;

  let running = true;
  let clock = 0;
  let last = 0;
  const duration = 16500;
  const undoStart = 9500;
  const undoEnd = 13700;

  function render() {
    const t = clock;
    let mode = '';
    let cut = 0;

    if (t < 2200) {
      mode = 'working';
      status.textContent = 'AGENT CODING';
      stage.textContent = 'CAPTURE ORIGINAL STATE';
      result.textContent = 'WITNESS SAVED';
      file.textContent = 'WORKING TREE';
    } else if (t < 5000) {
      mode = 'mess';
      status.textContent = 'MUTATION FAILED';
      stage.textContent = 'BAD CHANGE COMMITTED';
      result.textContent = 'SYSTEM STATE BROKEN';
      file.textContent = '3 REGRESSIONS';
    } else if (t < 7600) {
      mode = 'needs-undo';
      status.textContent = 'RECOVERY NEEDED';
      stage.textContent = 'THE AGENT CANNOT REVERSE ITS CHANGE';
      result.textContent = 'I NEED AN UNDO BUTTON!';
      file.textContent = 'CHANGES STILL BROKEN';
    } else if (t < undoStart) {
      mode = 'button-ready';
      status.textContent = 'UNDO AVAILABLE';
      stage.textContent = 'WITNESSED UNDO PRIMITIVE READY';
      result.textContent = 'PRESS ↶ UNDO TO RECOVER';
      file.textContent = 'AWAITING UNDO';
    } else if (t < undoEnd) {
      mode = 'undoing';
      status.textContent = 'UNDO IN PROGRESS';
      stage.textContent = 'RESTORING FROM STATE WITNESS';
      result.textContent = 'REVERSING THE MESS…';
      file.textContent = 'RECOVERY ACTIVE';
      cut = Math.min(100, Math.max(0, ((t - undoStart) / (undoEnd - undoStart)) * 100));
    } else if (t < 15000) {
      mode = 'restored';
      status.textContent = 'RESTORED';
      stage.textContent = 'CHECKING RESTORED STATE';
      result.textContent = 'ORIGINAL CODE RESTORED';
      file.textContent = 'RECOVERED';
    } else {
      mode = 'verified';
      status.textContent = 'RECOVERY VERIFIED';
      stage.textContent = 'INDEPENDENT STATE CHECK';
      result.textContent = 'RECOVERY VERIFIED ✓';
      file.textContent = 'VERIFIED';
    }

    scene.className = 'evo-scene ' + mode;
    fixed.style.clipPath = 'inset(0 0 ' + (100 - cut) + '% 0)';
    scan.style.top = cut + '%';
    progress.style.width = ((100 * t) / duration) + '%';
  }

  function frame(now) {
    if (!last) last = now;
    const delta = now - last;
    last = now;
    if (running) {
      clock = (clock + delta) % duration;
      render();
    }
    requestAnimationFrame(frame);
  }

  if (undo) {
    undo.addEventListener('click', () => {
      if (clock >= 7600 && clock < undoStart) {
        clock = undoStart;
        render();
      }
    });
  }

  if (replay) {
    replay.addEventListener('click', () => {
      clock = 0;
      running = true;
      last = 0;
      if (motion) motion.textContent = '⏸ PAUSE';
      render();
    });
  }

  if (motion) {
    motion.addEventListener('click', () => {
      running = !running;
      motion.textContent = running ? '⏸ PAUSE' : '▶ PLAY';
    });
  }

  render();
  requestAnimationFrame(frame);
}

/* 11. Staggered Scroll-Reveal & Animated Counters */
function initScrollRevealAndCounters() {
  const allCards = document.querySelectorAll('#conferences .card, #research .card');
  allCards.forEach((c, idx) => {
    c.classList.add('reveal-item');
    c.style.setProperty('--reveal-delay', `${(idx % 4) * 85}ms`);
  });

  const revealItems = document.querySelectorAll('.reveal-item');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-count]').forEach(el => {
    const target = Number(el.dataset.count || 0);
    const suf = el.dataset.suf || '';
    const useSep = el.dataset.sep === 'true';
    const start = performance.now();
    const duration = 1250;

    function tick(now) {
      const k = Math.min(1, (now - start) / duration);
      const val = Math.round(target * (1 - Math.pow(1 - k, 3)));
      const formatted = useSep ? val.toLocaleString('en-US') : String(val);
      el.textContent = formatted + suf;
      if (k < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}
