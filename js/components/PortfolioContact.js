import { html } from "../core/html.js";

const template = document.createElement('template');
template.innerHTML = html`
  <style>
    :host {
      display: block;
      width: 100%;
    }

    /* Section Architecture Header */
    .section-header {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      margin-bottom: var(--space-xl);
    }

    .meta-tag {
      font-family: var(--font-mono);
      font-size: var(--step--1);
      color: var(--color-accent);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    h2 {
      font-family: var(--font-display);
      font-size: var(--step-3);
      font-weight: 700;
      color: var(--color-text-primary);
      letter-spacing: -0.01em;
    }

    /* Form Layout - Optimized for readability and structure */
    .contact-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);
    }

    @media (min-width: 60rem) {
      .contact-container {
        grid-template-columns: 1fr 1.5fr;
        align-items: start;
      }
    }

    .intro-text {
      font-family: var(--font-body);
      font-size: var(--step-0);
      color: var(--color-text-secondary);
      line-height: 1.6;
      max-width: 30rem;
    }

    /* Interactive Interface Elements (Form Fields) */
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-m);
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      padding: var(--space-xl);
      border-radius: 6px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    label {
      font-family: var(--font-mono);
      font-size: var(--step--1);
      color: var(--color-text-primary);
      font-weight: 500;
    }

    /* Standardized Input Styling representing high-quality UI architecture */
    input, textarea {
      font-family: var(--font-body);
      font-size: var(--step-0);
      padding: var(--space-s);
      background-color: var(--color-bg);
      border: 1px solid var(--color-border);
      color: var(--color-text-primary);
      border-radius: 4px;
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    }

    /* Critical A11y & Design Focus States */
    input:focus, textarea:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px var(--color-accent-alpha);
    }

    textarea {
      resize: vertical;
      min-height: 10rem;
    }

    /* Submit Button (Consistency with Primary style from Hero) */
    .submit-btn {
      font-family: var(--font-body);
      font-size: var(--step-0);
      font-weight: 600;
      color: #ffffff;
      background-color: var(--color-accent);
      border: 1px solid transparent;
      padding: var(--space-s) var(--space-l);
      border-radius: 4px;
      cursor: pointer;
      transition: background-color var(--transition-fast), transform var(--transition-fast);
      align-self: flex-start;
      margin-top: var(--space-s);
    }

    .submit-btn:hover {
      background-color: var(--color-accent-hover);
    }

    .submit-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(104, 159, 56, 0.5);
    }

    /* High-Performance Micro-interaction feedback layer */
    .submit-btn:active {
      transform: translateY(1px);
    }

    /* Accessible Form Status (ARIA-Live region) */
    .status-area {
      font-family: var(--font-mono);
      font-size: var(--step--1);
      margin-top: var(--space-s);
      min-height: 1.5em;
    }

    .status-success {
      color: var(--color-accent);
    }

    .status-error {
      color: #ef5350; /* Specific vibrant red for errors */
    }
  </style>

  <div class="section-header">
    <span class="meta-tag" aria-hidden="true">input // open_communication_line</span>
    <h2>Initiate Data Transfer</h2>
  </div>

  <div class="contact-container">
    <div class="intro-text">
      <p>
        Currently seeking opportunities to architect complex systems, enhance interface accessibility, and streamline UI build pipelines. Whether you have a project requiring specialized engineering input or just want to discuss advanced CSS layout techniques, my network handlers are active.
      </p>
    </div>

    <form class="contact-form" id="networkForm">
      <div class="form-group">
        <label for="callerName">Origin_Identity (Name)</label>
        <input type="text" id="callerName" name="name" required autocomplete="name" aria-required="true" placeholder="Enter identification">
      </div>

      <div class="form-group">
        <label for="callerEmail">Return_Endpoint (Email)</label>
        <input type="email" id="callerEmail" name="email" required autocomplete="email" aria-required="true" placeholder="endpoint@domain.com">
      </div>

      <div class="form-group">
        <label for="messagePayload">Message_Payload</label>
        <textarea id="messagePayload" name="message" required aria-required="true" placeholder="Transmission details..."></textarea>
      </div>

      <button type="submit" class="submit-btn" id="submitBtn">
        Execute Transmission
      </button>
      
      <!-- Critical WAI-ARIA status reporter -->
      <div class="status-area" id="statusArea" aria-live="polite"></div>
    </form>
  </div>
`;

class PortfolioContact extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    this.form = this.shadowRoot.getElementById('networkForm');
    this.submitBtn = this.shadowRoot.getElementById('submitBtn');
    this.statusArea = this.shadowRoot.getElementById('statusArea');
  }

  connectedCallback() {
    // Handling form interactions within the isolated Shadow DOM
    this.form.addEventListener('submit', (e) => this.handleSubmission(e));
  }

  /**
   * Safe interaction handler representing robust engineering principles.
   * Simulates transmission acknowledgment (Focusing on UI flow, not backend integration yet).
   */
  handleSubmission(event) {
    event.preventDefault();
    
    // Replace this placeholder string with the Web App URL copied during Phase 2
    const GOOGLE_SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbw02UN3G8vJ4O5WOHSaECd1_uhvhllaLKhl80Q61_IFmhkr-lqgHgDtwhkuHGPupk4/exec';
    
    const formData = new FormData(this.form);
    const payloadData = Object.fromEntries(formData.entries());

    // Reset visual alert frames before transport execution
    this.statusArea.textContent = '';
    this.statusArea.className = 'status-area';
    this.submitBtn.disabled = true;
    this.submitBtn.textContent = 'Transmitting Data...';

    // Executing the fetch loop matching strict cross-origin optimization rules
    fetch(GOOGLE_SCRIPT_ENDPOINT, {
      method: 'POST',
      mode: 'cors', // Follow redirect pipelines cleanly
      headers: {
        // CRITICAL: Using text/plain prevents the browser from firing an OPTIONS preflight check
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payloadData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Endpoint rejected processing sequence.');
      }
      return response.json();
    })
    .then(result => {
      console.log(">> RAW_RESPONSE_FROM_GOOGLE:", result);

      if (result.status === 'success') {
        // UI feedback execution matching standard WAI-ARIA updates
        this.statusArea.textContent = '>> DATA_LOGGED // Transmission successfully appended to database.';
        this.statusArea.className = 'status-area status-success';
        this.form.reset();
      } else {
        throw new Error(result.message || 'Remote data processing error.');
      }
    })
    .catch(error => {
      console.error('Data pipeline exception:', error);
      this.statusArea.textContent = '>> CRITICAL_ERROR // Secure routing layer fault.';
      this.statusArea.className = 'status-area status-error';
    })
    .finally(() => {
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = 'Execute Transmission';
    });
  }
}
customElements.define('portfolio-contact', PortfolioContact);