/**
 * Apple Design System Portfolio App
 * Profile: Hai Nguyen (@hhai0z)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavScrollSpy();
  initMobileMenu();
  initProjectFilter();
  initTerminal();
  initCopyEmail();
  initModals();
  fetchGitHubData();
});

/* --------------------------------------------------------------------------
   THEME TOGGLE (Derived Dark & Light Support)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check stored theme or system preference
  const savedTheme = localStorage.getItem('apple-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('apple-theme', newTheme);
    });
  }

  // Listen to OS system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('apple-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    if (theme === 'dark') {
      // Sun icon for switching back to light
      themeIcon.innerHTML = `<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
    } else {
      // Moon icon for switching to dark
      themeIcon.innerHTML = `<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
    }
  }
}

/* --------------------------------------------------------------------------
   NAVIGATION & SCROLLSPY
   -------------------------------------------------------------------------- */
function initNavScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 80;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !mobileDrawer) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
   PROJECT FILTERING (Bento Cards)
   -------------------------------------------------------------------------- */
function initProjectFilter() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.bento-card[data-category]');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const selectedCategory = pill.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (selectedCategory === 'all' || categories.includes(selectedCategory)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   INTERACTIVE MACOS/APPLE STYLE TERMINAL
   -------------------------------------------------------------------------- */
const terminalData = {
  about: `Hai Nguyen (@hhai0z)
Role: Systems & Fullstack Engineer
Location: Vietnam
Focus: Low-latency backends, distributed systems, clean interface architecture
Email: hainguyen56211@gmail.com
GitHub: https://github.com/hhai0z`,

  skills: `=== TECHNICAL STACK ===
Core Languages : Go, TypeScript, Rust, Python, SQL
Frontend       : Next.js, React, Apple Design Tokens, WebGL, Tailwind
Backend        : gRPC, Node.js, Echo/Gin, Actix, Redis, PostgreSQL
Architecture   : Microservices, Event-Driven, CRDTs, Raft Consensus
Tooling        : Docker, Kubernetes, Linux, GitHub Actions, AWS`,

  projects: `=== NOTABLE REPOSITORIES ===
1. OmniEngine   : Distributed event orchestration runtime (Go, gRPC)
2. Aura UI      : Token-driven zero-dependency UI system (Apple specs)
3. PulseKV      : Embedded Raft-based distributed key-value store
4. NeuralStream : Low-latency WebRTC & multi-modal processing`,

  stats: `=== SYSTEM METRICS ===
Target Availability : 99.99%
P99 API Latency    : 12.4ms
Code Coverage      : 94.6%
Type Safety        : 100% Strict TypeScript / Go type checks`,

  help: `Available commands:
  about     - View background and biography
  skills    - List programming languages & architecture skills
  projects  - Show featured engineering repositories
  stats     - View engineering & latency benchmarks
  clear     - Clear the terminal screen
  theme     - Toggle light/dark appearance
  github    - Open GitHub profile (@hhai0z)`
};

function initTerminal() {
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');
  const output = document.getElementById('terminal-output');
  const shortcuts = document.querySelectorAll('.shortcut-btn');

  if (!input || !body || !output) return;

  function handleCommand(cmd) {
    const rawCmd = cmd.trim().toLowerCase();
    
    // Add command echo
    const echoLine = document.createElement('div');
    echoLine.innerHTML = `<span style="color:var(--colors-accent)">hhai0z@cli:~$</span> ${escapeHtml(cmd)}`;
    output.appendChild(echoLine);

    if (rawCmd === 'clear') {
      output.innerHTML = '';
      input.value = '';
      return;
    }

    if (rawCmd === 'theme') {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      setTheme(next);
      localStorage.setItem('apple-theme', next);
      appendResponse(`Theme switched to ${next} mode.`);
    } else if (rawCmd === 'github') {
      appendResponse(`Opening https://github.com/hhai0z ...`);
      window.open('https://github.com/hhai0z', '_blank');
    } else if (terminalData[rawCmd]) {
      appendResponse(terminalData[rawCmd]);
    } else if (rawCmd === '') {
      // Empty enter
    } else {
      appendResponse(`Command not found: "${escapeHtml(rawCmd)}". Type "help" for a list of available commands.`);
    }

    input.value = '';
    body.scrollTop = body.scrollHeight;
  }

  function appendResponse(text) {
    const res = document.createElement('div');
    res.style.marginTop = '4px';
    res.style.marginBottom = '8px';
    res.style.color = 'rgba(255, 255, 255, 0.85)';
    res.textContent = text;
    output.appendChild(res);
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleCommand(input.value);
    }
  });

  shortcuts.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      handleCommand(cmd);
      input.focus();
    });
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

/* --------------------------------------------------------------------------
   COPY EMAIL TO CLIPBOARD WITH APPLE TOAST (Z-Index 10000)
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-email') || 'hainguyen56211@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Copied ${email} to clipboard`);
      } catch (err) {
        showToast(`Email: ${email}`);
      }
    });
  });

  window.showToast = function(msg) {
    if (!toast) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  };
}

/* --------------------------------------------------------------------------
   MODALS (Architecture Deep-Dive)
   -------------------------------------------------------------------------- */
const projectDetails = {
  omniflow: {
    title: "OmniFlow • Distributed Workflow Engine",
    eyebrow: "Systems Engineering & Distributed Runtime",
    body: `
      <p style="margin-bottom: 16px;">OmniFlow is an event-driven workflow execution engine built in Go. It allows stateful multi-step pipelines to execute deterministically across asynchronous distributed workers with automated replay, checkpointing, and fault recovery.</p>
      <h4 style="font-size: 16px; margin: 12px 0 6px 0; color: var(--colors-ink);">Core Architecture:</h4>
      <ul style="padding-left: 20px; margin-bottom: 16px; line-height: 1.6;">
        <li><strong>Deterministic Event Sourcing:</strong> Every state change is journaled to append-only logs for zero-data-loss failover.</li>
        <li><strong>Wasm Sandboxing:</strong> Custom user transformations execute inside lightweight WebAssembly containers.</li>
        <li><strong>High-Throughput gRPC:</strong> Sub-5ms internal consensus loop utilizing raft clustering.</li>
      </ul>
      <div style="background-color: var(--colors-surface); padding: 14px; font-family: var(--font-mono); font-size: 12px; margin-bottom: 16px;">
// OmniFlow Pipeline Definition Sample
engine.RegisterPipeline("telemetry-drain", []Step{
  { Name: "ingest", Timeout: 15 * time.Millisecond },
  { Name: "wasm-sanitize", Runtime: WasmRuntimeV2 },
  { Name: "parquet-sink", BatchSize: 5000 },
})
      </div>
      <a href="https://github.com/hhai0z" target="_blank" class="btn-primary" style="margin-top: 8px;">Explore on GitHub →</a>
    `
  },
  auraui: {
    title: "Aura UI • Apple Design Token System",
    eyebrow: "Design Systems & Web Performance",
    body: `
      <p style="margin-bottom: 16px;">A zero-dependency UI token system and component architecture modeled strictly after Apple's design principles. Zero drop-shadows, pure color-blocking, sharp 0px card borders, and responsive 3-column layouts.</p>
      <h4 style="font-size: 16px; margin: 12px 0 6px 0; color: var(--colors-ink);">Key Highlights:</h4>
      <ul style="padding-left: 20px; margin-bottom: 16px; line-height: 1.6;">
        <li><strong>WCAG AAA Compliance:</strong> Color contrast ratios and 2px visible focus rings for keyboard navigation.</li>
        <li><strong>Pure Color Blocking:</strong> Eliminates GPU shadow compositing for 60fps scrolling and instant paint times.</li>
        <li><strong>CSS Variables Ramp:</strong> Instant dark mode switching with zero layout recalculation.</li>
      </ul>
      <a href="https://github.com/hhai0z" target="_blank" class="btn-primary">View Repository →</a>
    `
  },
  pulsekv: {
    title: "PulseKV • In-Memory Storage Engine",
    eyebrow: "Database Internals & Storage",
    body: `
      <p style="margin-bottom: 16px;">PulseKV is an in-memory key-value database built with Go. Features an LSM-tree persistent storage engine, write-ahead logging (WAL), and concurrent skip-lists for read-heavy workloads.</p>
      <h4 style="font-size: 16px; margin: 12px 0 6px 0; color: var(--colors-ink);">Performance Specs:</h4>
      <ul style="padding-left: 20px; margin-bottom: 16px; line-height: 1.6;">
        <li>Over 180,000 requests/sec on single-node benchmarking.</li>
        <li>Crash resilience via atomic write-ahead log replay.</li>
        <li>Zero lock-contention via fine-grained sharded hash tables.</li>
      </ul>
      <a href="https://github.com/hhai0z" target="_blank" class="btn-primary">View on GitHub →</a>
    `
  }
};

function initModals() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close');
  const openButtons = document.querySelectorAll('.open-modal-btn');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const details = projectDetails[projectId];
      if (details) {
        modalTitle.textContent = details.title;
        modalBody.innerHTML = `
          <div class="eyebrow" style="margin-bottom: 8px;">${details.eyebrow}</div>
          ${details.body}
        `;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   GITHUB PROFILE DATA INTEGRATION
   -------------------------------------------------------------------------- */
async function fetchGitHubData() {
  const username = 'hhai0z';
  const repoCountEl = document.getElementById('gh-repo-count');
  const followersEl = document.getElementById('gh-followers');

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (res.ok) {
      const data = await res.json();
      if (repoCountEl && data.public_repos !== undefined) {
        repoCountEl.textContent = data.public_repos;
      }
      if (followersEl && data.followers !== undefined) {
        followersEl.textContent = data.followers;
      }
    }
  } catch (err) {
    // Graceful fallback to static verified metrics
    console.log('GitHub API offline or rate-limited; using fallback metrics.');
  }
}
