/**
 * Apple Design System Portfolio App
 * Profile: Nguyễn Ngọc Hải (@hai0z)
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
      themeIcon.innerHTML = `<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
    } else {
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
  about: `Nguyễn Ngọc Hải (@hai0z)
Role: Fullstack & Mobile Engineer
Location: Vietnam (VN)
Profile: https://github.com/hai0z
Public Repositories: 50+
Key Interests: React Native, Next.js, Electron, Audio streaming & Modern UI/UX`,

  skills: `=== TECHNICAL CAPABILITIES ===
Mobile Dev    : React Native, TrackPlayer, NativeWind, Flutter, Dart
Web & Frontend: Next.js, React, Vue.js, TypeScript, JavaScript, TailwindCSS, DaisyUI
Desktop       : Electron.js, Vite
State & APIs  : Zustand, Pinia, Firebase, ZingMP3 API, RESTful APIs
Platforms     : Vercel, Netlify, GitHub, Linux, Windows`,

  projects: `=== FEATURED REPOSITORIES (@hai0z) ===
1. Harmonify       : Full music streaming app like Spotify (React Native, TrackPlayer, Zustand)
2. hzphim          : Next.js cinema & movie streaming platform (https://hzphim.vercel.app)
3. Dear Diary 📔   : End-to-end encrypted desktop diary app (Tauri 2, Rust, React, AES-256)
4. electron_movie  : Cross-platform desktop cinema app (Electron, React, Vite)
5. first-vue       : Instagram clone with Vue.js, Pinia & Firebase`,

  stats: `=== GITHUB METRICS ===
Username         : hai0z (Nguyễn Ngọc Hải)
Public Repos     : 50
Member Since     : March 2020
Primary Language : TypeScript & JavaScript
Focus Areas      : Mobile Apps, Modern Web & Desktop Tools`,

  help: `Available commands:
  about     - View developer profile & background
  skills    - List technologies, frameworks & runtimes
  projects  - Show real repositories & live demos
  stats     - View GitHub statistics & account information
  clear     - Clear the terminal screen
  theme     - Toggle light/dark appearance
  github    - Open https://github.com/hai0z in browser`
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
    echoLine.innerHTML = `<span style="color:var(--colors-accent)">hai0z@cli:~$</span> ${escapeHtml(cmd)}`;
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
      appendResponse(`Opening https://github.com/hai0z ...`);
      window.open('https://github.com/hai0z', '_blank');
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
  harmonify: {
    title: "Harmonify • Music Streaming Application",
    eyebrow: "Mobile Architecture & Audio Processing",
    body: `
      <p style="margin-bottom: 16px;">Harmonify is a rich mobile audio experience modeled after Spotify. Designed for smooth background playback and synchronized real-time lyrics.</p>
      <h4 style="font-size: 16px; margin: 12px 0 6px 0; color: var(--colors-ink);">Technical Implementation:</h4>
      <ul style="padding-left: 20px; margin-bottom: 16px; line-height: 1.6;">
        <li><strong>Native TrackPlayer:</strong> Background playback capability with lockscreen audio controls and remote notification handlers.</li>
        <li><strong>Zustand State Engine:</strong> Minimalist, reactive global player state without Redux boilerplate.</li>
        <li><strong>ZingMP3 & Lyrics Sync:</strong> Parsing LRC timestamps to render fluid karaoke-style animated lyrics.</li>
        <li><strong>NativeWind:</strong> Tailwind CSS utility classes inside React Native for consistent styling.</li>
      </ul>
      <a href="https://github.com/hai0z/Harmonify" target="_blank" class="btn-primary" style="margin-top: 8px;">View Harmonify on GitHub →</a>
    `
  },
  electron_movie: {
    title: "Electron Cinema • Desktop Movie Player",
    eyebrow: "Desktop Engineering & Native Integration",
    body: `
      <p style="margin-bottom: 16px;">A dedicated desktop cinema streaming application that integrates modern web technologies with native desktop performance.</p>
      <h4 style="font-size: 16px; margin: 12px 0 6px 0; color: var(--colors-ink);">Key Highlights:</h4>
      <ul style="padding-left: 20px; margin-bottom: 16px; line-height: 1.6;">
        <li><strong>Vite + React:</strong> Instant hot module reloading and optimized bundle size.</li>
        <li><strong>Frameless Window Controls:</strong> Custom macOS and Windows title bars with native drag regions.</li>
        <li><strong>DaisyUI & Tailwind:</strong> Sleek dark-mode aesthetic with zero runtime styling overhead.</li>
      </ul>
      <a href="https://github.com/hai0z/electron_movie" target="_blank" class="btn-primary">View Electron Movie on GitHub →</a>
    `
  },
  diary: {
    title: "Dear Diary 📔 • Encrypted Desktop Journal",
    eyebrow: "Desktop Engineering & Cryptography • Tauri 2 + Rust",
    body: `
      <p style="margin-bottom: 16px;">Dear Diary is a privacy-first personal diary application built with Tauri 2, Rust 1.75, and React 18. Designed with zero-knowledge architecture and end-to-end AES-256 encryption.</p>
      <h4 style="font-size: 16px; margin: 12px 0 6px 0; color: var(--colors-ink);">Core Architecture:</h4>
      <ul style="padding-left: 20px; margin-bottom: 16px; line-height: 1.6;">
        <li><strong>AES-256-CBC & PBKDF2:</strong> All diary content is encrypted locally before persistence using keys derived via 100,000 PBKDF2 iterations.</li>
        <li><strong>Offline-First & Cloud Sync:</strong> Instant reads/writes on local SQLite with background synchronization to MongoDB Atlas.</li>
        <li><strong>Gemini AI Assistant:</strong> Contextual writing assistance, mood tracking, and habit analytics.</li>
        <li><strong>Native Desktop Performance:</strong> Rust backend with TipTap rich-text editor and Ant Design / Tailwind UI.</li>
      </ul>
      <a href="https://github.com/hai0z/diary" target="_blank" class="btn-primary" style="margin-top: 8px;">View Dear Diary on GitHub →</a>
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
  const username = 'hai0z';
  const repoCountEl = document.getElementById('gh-repo-count');
  const followersEl = document.getElementById('gh-followers');

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (res.ok) {
      const data = await res.json();
      if (repoCountEl && data.public_repos !== undefined) {
        repoCountEl.textContent = `${data.public_repos}+`;
      }
    }
  } catch (err) {
    console.log('GitHub API offline or rate-limited; using cached metrics.');
  }
}
