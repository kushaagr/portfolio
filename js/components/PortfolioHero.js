import { html } from "../core/html.js";

const template = document.createElement('template');
template.innerHTML = html`
  <style>
    :host {
      display: block;
      width: 100%;
    }

    /* Base Grid System */
    .hero-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);
      align-items: center;
      padding: var(--space-xl) 0;
      position: relative;
    }

    @media (min-width: 48rem) {
      .hero-container {
        grid-template-columns: 1.2fr 0.8fr;
      }
    }

    /* Left Column: Typographic Stack */
    .hero-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-m);
    }

    .meta-tag {
      font-family: var(--font-mono);
      font-size: var(--step--1);
      color: var(--color-accent);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    h1 {
      font-family: var(--font-display);
      font-size: var(--step-4);
      font-weight: 700;
      line-height: 1.1;
      color: var(--color-text-primary);
      letter-spacing: -0.02em;
    }

    .subtitle {
      font-family: var(--font-body);
      font-size: var(--step-1);
      color: var(--color-text-secondary);
      max-width: 38rem;
    }

    /* Interactive Blueprint Actions */
    .action-group {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-s);
      margin-top: var(--space-s);
    }

    .btn {
      font-family: var(--font-body);
      font-size: var(--step--1);
      font-weight: 600;
      text-decoration: none;
      padding: var(--space-xs) var(--space-m);
      border-radius: 4px;
      transition: background-color var(--transition-fast), transform var(--transition-fast);
      cursor: pointer;
      border: 1px solid transparent;
    }

    .btn-primary {
      background-color: var(--color-accent);
      color: #ffffff;
    }

    .btn-primary:hover {
      background-color: var(--color-accent-hover);
    }

    .btn-secondary {
      background-color: transparent;
      border-color: var(--color-border);
      color: var(--color-text-primary);
    }

    .btn-secondary:hover {
      background-color: var(--color-surface-hover);
    }

    /* Right Column: Interactive Blueprint Canvas */
    .blueprint-panel {
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 6px;
      padding: var(--space-m);
      font-family: var(--font-mono);
      font-size: var(--step--2);
      color: var(--color-text-muted);
      position: relative;
      overflow: hidden;
      min-height: 14rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .dom-node {
      border: 1px dashed var(--color-border);
      padding: var(--space-xs);
      border-radius: 4px;
      margin-top: var(--space-xs);
      background: rgba(0,0,0,0.02);
    }

    /* --- UI Engineer "Blueprint Mode" Toggles --- */
    .hero-container.blueprint-active * {
      outline: 1px dashed rgba(104, 159, 56, 0.4) !important;
      background-color: rgba(104, 159, 56, 0.02) !important;
    }
    
    .hero-container.blueprint-active .meta-tag, 
    .hero-container.blueprint-active .btn {
      outline: none !important;
    }
  </style>

  <div class="hero-container" id="container">
    <div class="hero-content">
      <span class="meta-tag" aria-hidden="true">&lt;system-architecture&gt;</span>
      <h1>Crafting resilient design systems & web interfaces.</h1>
      <p class="subtitle">
        I bridge the gap between heavy engineering requirements and pixel-perfect design accuracy. Specializing in advanced CSS architectures, standard Web Components, and automated performance profiles.
      </p>
      <div class="action-group">
        <a href="#work" class="btn btn-primary">Inspect My Work</a>
        <button class="btn btn-secondary" id="blueprint-toggle" aria-pressed="false">
          Toggle Inspector Dev Mode
        </button>
      </div>
    </div>

    <div class="blueprint-panel" role="img" aria-label="Graphic representation of Web Component node layout mapping">
      <div>
        <div>// Autonomous Component Registry Matrix</div>
        <div class="dom-node">
          &lt;portfolio-hero shadow="open"&gt;
          <div class="dom-node" style="color: var(--color-accent);">&lt;h1&gt; Space Grotesk (700) &lt;/h1&gt;</div>
          <div class="dom-node">&lt;p&gt; Plus Jakarta Sans (400) &lt;/p&gt;</div>
          &lt;/portfolio-hero&gt;
        </div>
      </div>
      <div style="text-align: right; margin-top: var(--space-s);">
        <span id="viewport-display">W: --px | H: --px</span>
      </div>
    </div>
  </div>
`;

class PortfolioHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    this.container = this.shadowRoot.getElementById('container');
    this.toggleBtn = this.shadowRoot.getElementById('blueprint-toggle');
    this.viewportDisplay = this.shadowRoot.getElementById('viewport-display');
  }

  connectedCallback() {
    // Interactivity: Blueprint Dev Mode Toggle
    this.toggleBtn.addEventListener('click', () => this.handleToggle());
    
    // Technical Utility: Real-time layout metrics tracker
    this.updateViewportMetrics();
    window.addEventListener('resize', this.debounce(() => this.updateViewportMetrics(), 100));
  }

  handleToggle() {
    const isActive = this.container.classList.toggle('blueprint-active');
    this.toggleBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    this.toggleBtn.textContent = isActive ? 'Exit Inspector Dev Mode' : 'Toggle Inspector Dev Mode';
  }

  updateViewportMetrics() {
    if (this.viewportDisplay) {
      this.viewportDisplay.textContent = `V_PORT // W: ${window.innerWidth}px | H: ${window.innerHeight}px`;
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

customElements.define('portfolio-hero', PortfolioHero);