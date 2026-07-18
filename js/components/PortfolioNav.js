import { html } from "../../core/html.js";

const template = document.createElement('template');
template.innerHTML = html`
  <style>
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
      width: 100%;
    }

    /* Base Navigation Bar Shell */
    .nav-wrapper {
      background-color: transparent;
      border-bottom: 1px solid transparent;
      transition: background-color var(--transition-normal), 
                  border-color var(--transition-normal), 
                  box-shadow var(--transition-normal);
      padding: var(--space-s) 0;
    }

    /* Dynamic Scroll State (Elevated Depth Layer) */
    .nav-wrapper.is-scrolled {
      background-color: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
      padding: var(--space-xs) 0;
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 var(--space-m);
    }

    /* Logo / Identity Group */
    .nav-brand {
      font-family: var(--font-display);
      font-size: var(--step-0);
      font-weight: 700;
      color: var(--color-text-primary);
      text-decoration: none;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }

    .brand-terminal {
      color: var(--color-accent);
      font-family: var(--font-mono);
    }

    /* Accessible Navigation Menu */
    .nav-menu {
      display: flex;
      align-items: center;
      gap: var(--space-l);
    }

    .nav-list {
      display: flex;
      gap: var(--space-m);
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-link {
      font-family: var(--font-body);
      font-size: var(--step--1);
      font-weight: 500;
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: color var(--transition-fast);
      position: relative;
    }

    .nav-link:hover {
      color: var(--color-text-primary);
    }

    /* Interactive Interface Actions */
    .action-controls {
      display: flex;
      align-items: center;
      gap: var(--space-s);
      border-left: 1px solid var(--color-border);
      padding-inline: var(--space-l);
    }

    .theme-toggle {
      background: transparent;
      border: 1px solid var(--color-border);
      color: var(--color-text-primary);
      padding: var(--space-xs);
      border-radius: 4px;
      cursor: pointer;
      font-family: var(--font-mono);
      font-size: var(--step--2);
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 2.5rem;
      min-height: 2.5rem;
      transition: background-color var(--transition-fast), border-color var(--transition-fast);
    }

    .theme-toggle:hover {
      background-color: var(--color-surface-hover);
      border-color: var(--color-accent);
    }

    /* Responsive Mobile Overrides */
    @media (max-width: 40rem) {
      .nav-list {
        display: none; /* Can be enhanced with an accessible mobile disclosure menu later */
      }
    }
  </style>

  <div class="nav-wrapper" id="navShell">
    <nav class="nav-container" aria-label="Main System Navigation">
      <a href="#" class="nav-brand" aria-label="Portfolio Home">
        <span class="brand-terminal">KUSHAGRA</span> MEHROTRA // Dev
      </a>

      <div class="nav-menu">
        <ul class="nav-list">
          <!-- <li><a href="#work" class="nav-link">Research & Work</a></li> -->
          <li><a href="#work" class="nav-link">Work</a></li>
          <li><a href="#experience" class="nav-link">Timeline</a></li>
          <li><a href="#contact" class="nav-link">Connect</a></li>
        </ul>

        <div class="action-controls">
          <button class="theme-toggle" id="themeBtn" aria-label="Toggle structural color mode" aria-live="polite">
            ☉
          </button>
        </div>
      </div>
    </nav>
  </div>
`;

class PortfolioNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    this.navShell = this.shadowRoot.getElementById('navShell');
    this.themeBtn = this.shadowRoot.getElementById('themeBtn');
  }

  connectedCallback() {
    // 1. Initialize High-Performance Scroll Monitoring
    this.initScrollObserver();

    // 2. Initialize Color Engine Integration
    this.initThemeEngine();
    this.themeBtn.addEventListener('click', () => this.toggleTheme());
  }

  /**
   * Performance Architecture Strategy: Instead of binding a heavy scroll window layout listener, 
   * we use an IntersectionObserver tracking scroll positions natively without causing layout thrashing.
   */
  initScrollObserver() {
    // Create a zero-height sentinel anchor at the root level if not present
    let sentinel = document.getElementById('nav-sentinel');
    if (!sentinel) {
      sentinel = document.createElement('div');
      sentinel.id = 'nav-sentinel';
      sentinel.style.position = 'absolute';
      sentinel.style.top = '0';
      sentinel.style.height = '1px';
      sentinel.style.width = '100%';
      sentinel.style.pointerEvents = 'none';
      document.body.prepend(sentinel);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When the top element drops out of view, user has scrolled past 0px
        if (!entry.isIntersecting) {
          this.navShell.classList.add('is-scrolled');
        } else {
          this.navShell.classList.remove('is-scrolled');
        }
      });
    }, { rootMargin: '20px 0px 0px 0px' });

    observer.observe(sentinel);
  }

  /* --- Color Theme Operations Engine --- */
  initThemeEngine() {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 
                        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    this.applyThemeState(activeTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 
                         (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyThemeState(targetTheme);
  }

  applyThemeState(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Render technical icon variants based on selection
    // this.themeBtn.textContent = theme === 'dark' ? '☾' : '☼';
    // this.themeBtn.textContent = theme === 'dark' ? '🌚' : '☀️';
    this.themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
    this.themeBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

customElements.define('portfolio-nav', PortfolioNav);