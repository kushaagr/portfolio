const template = document.createElement('template');
template.innerHTML = `
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

    /* High-Performance Fluid Layout Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
      gap: var(--space-l);
    }

    /* Semantic Card Element with Custom Property Animation Layer */
    .project-card {
      /* Declaring internal layout anim variable defaults */
      --card-translate-y: 0px;
      --card-glow-opacity: 0;
      --card-border: var(--color-border);
      
      background-color: var(--color-surface);
      border: 1px solid var(--card-border);
      border-radius: 6px;
      padding: var(--space-l);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: var(--space-m);
      position: relative;
      
      /* Composite transform layer isolates processing to GPU layer */
      transform: translateY(var(--card-translate-y)) translateZ(0);
      transition: transform var(--transition-normal), 
                  border-color var(--transition-fast),
                  box-shadow var(--transition-normal);
    }

    /* Dynamic Custom Property Mutations on Interaction */
    .project-card:hover {
      --card-translate-y: -6px;
      --card-border: var(--color-accent);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);
    }

    /* Code Metrics Badge Container */
    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .repo-spec {
      font-family: var(--font-mono);
      font-size: var(--step--2);
      color: var(--color-text-muted);
    }

    /* Typographic Stack inside the Card */
    .card-body {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    h3 {
      font-family: var(--font-display);
      font-size: var(--step-1);
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .description {
      font-family: var(--font-body);
      font-size: var(--step--1);
      color: var(--color-text-secondary);
      line-height: 1.5;
    }

    /* Technical Token Tags List */
    .token-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .token-badge {
      font-family: var(--font-mono);
      font-size: var(--step--2);
      background-color: var(--color-surface-hover);
      border: 1px solid var(--color-border);
      color: var(--color-text-secondary);
      padding: 2px 8px;
      border-radius: 4px;
    }

    /* Clean Accessible Action Triggers */
    .card-links {
      display: flex;
      gap: var(--space-m);
      margin-top: var(--space-xs);
    }

    .action-link {
      font-family: var(--font-body);
      font-size: var(--step--1);
      font-weight: 600;
      color: var(--color-text-primary);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: color var(--transition-fast);
    }

    .action-link:hover {
      color: var(--color-accent);
    }

    .action-link aria-hidden {
      font-family: var(--font-mono);
    }
  </style>

  <div class="section-header">
    <span class="meta-tag" aria-hidden="true">stdout // primary_compilations</span>
    <h2>Selected Engineering Modules</h2>
  </div>

  <div class="projects-grid" id="gridContainer">
    <!-- Dynamic Component Engine will inject card entities here -->
  </div>
`;

class PortfolioProjects extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    // Explicit production-grade mock data reflecting system UI architecture work
    this.projects = [
      {
        id: "01",
        title: "Fluid Token Orchestrator",
        description: "An open-source design token synchronization script compiling system variables across CSS, Figma tokens, and platform native distributions dynamically.",
        tokens: ["CSS Custom Properties", "Style Dictionary", "Node.js"],
        repoUrl: "#",
        liveUrl: "#"
      },
      {
        id: "02",
        title: "Resilient Forms Core Engine",
        description: "A headless, highly accessible custom element suite guaranteeing keyboard traps control and strict screen-reader compliance out-of-the-box.",
        tokens: ["Web Components", "WAI-ARIA", "Vanilla JS"],
        repoUrl: "#",
        liveUrl: "#"
      },
      {
        id: "03",
        title: "CSS Houdini Paint Matrix",
        description: "A localized Worklet plugin drawing mathematical technical wireframe canvas grids seamlessly directly on background layout repaints.",
        tokens: ["Houdini API", "Canvas Rendering", "Performance Layer"],
        repoUrl: "#",
        liveUrl: "#"
      }
    ];
  }

  connectedCallback() {
    this.renderCollection();
  }

  renderCollection() {
    const gridContainer = this.shadowRoot.getElementById('gridContainer');
    gridContainer.innerHTML = ''; // Sanitize container inner markup

    this.projects.forEach(project => {
      const card = document.createElement('article');
      card.classList.add('project-card');
      card.setAttribute('aria-labelledby', `title-${project.id}`);
      
      card.innerHTML = `
        <div class="card-meta">
          <span class="repo-spec">MODULE // ${project.id}</span>
        </div>
        
        <div class="card-body">
          <h3 id="title-${project.id}">${project.title}</h3>
          <p class="description">${project.description}</p>
        </div>

        <ul class="token-list" aria-label="Technology architecture tokens used">
          ${project.tokens.map(token => `<li class="token-badge">${token}</li>`).join('')}
        </ul>

        <div class="card-links">
          <a href="${project.repoUrl}" class="action-link" aria-label="View source code repository for ${project.title}">
            Source <span aria-hidden="true">↗</span>
          </a>
          <a href="${project.liveUrl}" class="action-link" aria-label="Inspect functional live layout build for ${project.title}">
            Inspect <span aria-hidden="true">→</span>
          </a>
        </div>
      `;
      
      gridContainer.appendChild(card);
    });
  }
}

customElements.define('portfolio-projects', PortfolioProjects);