import { html } from "../core/html.js";

class PortfolioExperience extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Isolated experience dataset
    this.experiences = [
      {
        role: "Frontend Developer Intern",
        company: "Vivada Tech",
        duration: "May 2024 – Nov 2024",
        location: "Remote",
        stack: ["React Native", "GraphQL", "Zustand"],
        details: [
          "Engineered modular, reusable mobile application architectures for peer-to-peer video streaming platforms consuming unified GraphQL endpoints.",
          "Shipped clean layout implementations supporting complex asynchronous data layers, device-level push notification handlers, and runtime multilingual localization matrices.",
          "Eliminated redundant client-side re-rendering cycles by refactoring global state contexts into optimized Zustand stores, boosting UI fluid responsiveness under multi-stream loads."
        ]
      }
    ];

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = html`
      <style>
        :host {
          display: block;
          padding: var(--space-xl) 0;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: var(--step-3);
          color: var(--color-text-primary);
          margin-bottom: var(--space-l);
          letter-spacing: -0.02em;
        }
        .timeline-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-l);
          position: relative;
        }
        .timeline-list::before {
          content: '';
          position: absolute;
          left: 8px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background-color: var(--color-border);
        }
        .timeline-item {
          position: relative;
          padding-left: var(--space-l);
        }
        .timeline-node {
          position: absolute;
          left: 4px;
          top: 6px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background-color: var(--color-surface);
          border: 2px solid var(--color-accent);
        }
        .timeline-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: baseline;
          gap: var(--space-xs);
          margin-bottom: var(--space-xs);
        }
        .role-title {
          font-family: var(--font-display);
          font-size: var(--step-1);
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0;
        }
        .company-name {
          font-family: var(--font-body);
          color: var(--color-accent);
          font-weight: 500;
        }
        .duration {
          font-family: var(--font-mono);
          font-size: var(--step--1);
          color: var(--color-text-muted);
        }
        .architecture-strip {
          font-family: var(--font-mono);
          font-size: var(--step--2);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-s);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .details-list {
          margin: 0;
          padding-left: var(--space-m);
          font-family: var(--font-body);
          font-size: var(--step--1);
          color: var(--color-text-secondary);
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          line-height: 1.6;
        }
      </style>

      <section id="experience" aria-labelledby="experience-heading">
        <h2 class="section-title" id="experience-heading">Experience</h2>
        
        <ol class="timeline-list">
          ${this.experiences.map(exp => html`
            <li class="timeline-item">
              <div class="timeline-node"></div>
              <div class="timeline-content">
                <div class="timeline-meta">
                  <h3 class="role-title">${exp.role} <span class="company-name">@ ${exp.company}</span></h3>
                  <span class="duration">${exp.duration} // ${exp.location}</span>
                </div>
                
                <div class="architecture-strip">
                  Stack: ${exp.stack.join(' // ')}
                </div>
                
                <ul class="details-list">
                  ${exp.details.map(detail => html`<li>${detail}</li>`).join('')}
                </ul>
              </div>
            </li>
          `).join('')}
        </ol>
      </section>
    `;
  }
}

customElements.define('portfolio-experience', PortfolioExperience);