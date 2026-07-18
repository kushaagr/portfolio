import { html } from "../core/html.js";

class PortfolioProjects extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Isolated system dataset
    // (Note: You can omit or pass an empty string to sourceUrl or inspectUrl to hide them)
    this.projects = [
      {
        title: "Stable Diffusion + ControlNet Pipeline",
        stack: ["Python", "Diffusers", "ControlNet", "W&B", "Accelerate"],
        description: "Engineered a color-guided generative image pipeline by training ControlNet architectures. Optimized multi-GPU acceleration schedules and validated structural color distribution fidelity using Mean ΔE, Earth Mover’s Distance (EMD), and CLIP alignment scoring arrays.",
        inspectUrl: "https://colab.research.google.com/drive/18ieCcmu9dZzbMnaH6c5ZJDC50O5iEvQR?usp=sharing" // Both links provided -> Shows both
      },
      {
        title: "LoRA Fine-Tuning ViLT (VQA)",
        stack: ["PyTorch", "Hugging Face", "PEFT", "LoRA", "Gemini API"],
        description: "Synthesized a custom 3K image-question-answer training set using Gemini 1.5 Flash over foundational engine objects. Executed parameter-efficient fine-tuning (PEFT) on TPU clusters under strict system memory limits, yielding massive performance gains over baseline models.",
        sourceUrl: "",
        inspectUrl: "" // Empty string -> Hides the 'Inspect' button
      },
      {
        title: "Search Everywhere Aggregator",
        stack: ["Node.js", "Express.js", "JavaScript", "REST APIs"],
        description: "Developed a low-latency data aggregation framework pulling real-time metrics across diverse remote nodes into a single, highly accessible interface optimized for keyboard-driven focus tracking.",
        sourceUrl: "https://github.com/kushaagr/search-everywhere", // Empty string -> Hides the 'Source' button
        inspectUrl: "#" 
      },
      {
        title: "Event Timeline Engine",
        stack: ["Next.js", "TypeScript", "React", "MongoDB"],
        description: "Built a structural vector timeline application featuring an interactive rendering pipeline, isolated component architecture, and optimized server-side query persistence.",
        sourceUrl: "", // Both empty -> Entire action-row container stays hidden
        inspectUrl: ""
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
        
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-l);
        }
        
        @media (min-width: 48rem) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .project-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          padding: var(--space-l);
          display: flex;
          flex-direction: column;
          gap: var(--space-m);
          transition: border-color var(--transition-fast);
        }
        
        .project-card:hover {
          border-color: var(--color-accent);
        }
        
        .module-index {
          font-family: var(--font-mono);
          font-size: var(--step--2);
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .project-title {
          font-family: var(--font-display);
          font-size: var(--step-2);
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.2;
        }
        
        .project-desc {
          font-family: var(--font-body);
          font-size: var(--step--1);
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        
        .badge-list {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-xs);
          margin-top: auto; /* Aligns footer metrics perfectly */
        }
        
        .badge {
          font-family: var(--font-mono);
          font-size: var(--step--2);
          padding: 6px 10px;
          background-color: rgba(235, 240, 245, 0.3);
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          border-radius: 4px;
        }
        
        @media (prefers-color-scheme: dark) {
          .badge {
            background-color: rgba(255, 255, 255, 0.03);
          }
        }
        
        .action-row {
          display: flex;
          gap: var(--space-m);
          padding-top: var(--space-xs);
        }
        
        .action-link {
          font-family: var(--font-body);
          font-size: var(--step--1);
          font-weight: 500;
          color: var(--color-text-primary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        
        .action-link:hover {
          color: var(--color-accent);
        }
      </style>

      <section id="work" aria-labelledby="projects-heading">
        <h2 class="section-title" id="projects-heading">Projects</h2>
        <div class="projects-grid">
          ${this.projects.map((proj, index) => html`
            <article class="project-card">
              <div class="module-index">
                MODULE // ${String(index + 1).padStart(2, '0')}
              </div>
              
              <h3 class="project-title">${proj.title}</h3>
              
              <p class="project-desc">${proj.description}</p>
              
              <div class="badge-list" role="list" aria-label="Technology architecture items">
                ${proj.stack.map(tech => html`
                  <span class="badge" role="listitem">${tech}</span>
                `).join('')}
              </div>
              
              <!-- Conditional check: Only renders the row if at least one link layout exists -->
              ${proj.sourceUrl || proj.inspectUrl ? html`
                <div class="action-row">
                  ${proj.sourceUrl ? html`<a href="${proj.sourceUrl}" class="action-link" target="_blank" rel="noopener noreferrer">Source ↗</a>` : ''}
                  ${proj.inspectUrl ? html`<a href="${proj.inspectUrl}" class="action-link">Inspect Demo →</a>` : ''}
                </div>
              ` : ''}
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }
}

customElements.define('portfolio-projects', PortfolioProjects);