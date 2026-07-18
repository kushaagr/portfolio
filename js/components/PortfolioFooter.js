const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
      border-top: 1px solid var(--color-border);
      background-color: var(--color-bg);
      margin-top: var(--space-2xl);
    }

    /* Outer structural framework layout */
    .footer-wrapper {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: var(--space-xl) var(--space-m);
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);
    }

    @media (min-width: 48rem) {
      .footer-wrapper {
        grid-template-columns: 1.5fr 1fr 1fr;
        align-items: start;
      }
    }

    /* Block Column Stack Rules */
    .footer-block {
      display: flex;
      flex-direction: column;
      gap: var(--space-s);
    }

    .block-heading {
      font-family: var(--font-mono);
      font-size: var(--step--2);
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Identity Section Typography */
    .brand-signature {
      font-family: var(--font-display);
      font-size: var(--step-0);
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .license-notice {
      font-family: var(--font-body);
      font-size: var(--step--1);
      color: var(--color-text-secondary);
      line-height: 1.5;
    }

    /* Technical Action Links */
    .link-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .network-link {
      font-family: var(--font-body);
      font-size: var(--step--1);
      font-weight: 500;
      color: var(--color-text-secondary);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: color var(--transition-fast);
    }

    .network-link:hover {
      color: var(--color-text-primary);
    }

    /* Machine Telemetry Matrix / Diagnostics Block */
    .telemetry-grid {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 4px var(--space-m);
      font-family: var(--font-mono);
      font-size: var(--step--2);
      color: var(--color-text-secondary);
    }

    .telemetry-label {
      color: var(--color-text-muted);
    }

    .status-active {
      color: var(--color-accent);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .status-pulse {
      width: 6px;
      height: 6px;
      background-color: var(--color-accent);
      border-radius: 50%;
      display: inline-block;
    }

    @media (prefers-reduced-motion: no-preference) {
      .status-pulse {
        animation: pulse-glow 2s infinite ease-in-out;
      }
    }

    @keyframes pulse-glow {
      0%, 100% { opacity: 0.4; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.1); }
    }
  </style>

  <div class="footer-wrapper">
    <!-- Block 1: Architecture Core & Licensing -->
    <div class="footer-block">
      <div class="brand-signature">&lt;KUSHAAGR /&gt;</div>
      <p class="license-notice">
        Built completely with standardized modular custom elements. System conceptualization © 2026.
      </p>
    </div>

    <!-- Block 2: Accessible Interconnection Registry -->
    <nav class="footer-block" aria-label="External Network Directory">
      <div class="block-heading">network_endpoints</div>
      <ul class="link-list">
        <li>
          <a href="https://github.com/kushaagr" class="network-link" target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li>
          <a href="https://linkedin.com/in/kushaagr" class="network-link" target="_blank" rel="noopener noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li>
          <a href="mailto:kushagra210@outlook.com" class="network-link">
            Email <span aria-hidden="true">→</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Block 3: Machine Systems Telemetry -->
    <div class="footer-block">
      <div class="block-heading">system_telemetry</div>
      <div class="telemetry-grid">
        <span class="telemetry-label">STATUS</span>
        <span class="status-active"><span class="status-pulse" aria-hidden="true"></span>OPERATIONAL</span>

        <span class="telemetry-label">ENV</span>
        <span>PRODUCTION_BUILD</span>

        <span class="telemetry-label">COMPLIANCE</span>
        <span>WCAG_2.2_AA</span>
        
        <span class="telemetry-label">ENGINE</span>
        <span id="engine-spec">V8 // SHADOW_DOM</span>
      </div>
    </div>
  </div>
`;

class PortfolioFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.sniffExecutionEnvironment();
  }

  /**
   * Technical Polish: Dynamically inspects the modern browser execution runtime 
   * engine to update the telemetry layout block parameters automatically.
   */
  sniffExecutionEnvironment() {
    const specField = this.shadowRoot.getElementById('engine-spec');
    if (!specField) return;

    if (window.chrome || (window.navigator && window.navigator.userAgent.includes('Chrome'))) {
      specField.textContent = 'BLINK // SHADOW_V2';
    } else if (typeof InstallTrigger !== 'undefined' || navigator.userAgent.includes('Firefox')) {
      specField.textContent = 'GECKO // SHADOW_V2';
    } else if (/constructor/i.test(window.HTMLElement) || navigator.userAgent.includes('Safari')) {
      specField.textContent = 'WEBKIT // SHADOW_V2';
    }
  }
}

customElements.define('portfolio-footer', PortfolioFooter);