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
      margin-bottom: var(--space-2xl);
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

    /* Chronological Timeline Track */
    .timeline-container {
      position: relative;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    /* Central Spine Track Line */
    .timeline-container::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0.5rem;
      width: 1px;
      background-color: var(--color-border);
    }

    @media (min-width: 48rem) {
      .timeline-container::before {
        left: 11.5rem; /* Center/Shift line between layout columns on desktop */
      }
    }

    /* Timeline Event Entry Block */
    .timeline-item {
      position: relative;
      margin-bottom: var(--space-2xl);
      padding-left: var(--space-xl);
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-s);
    }

    .timeline-item:last-child {
      margin-bottom: 0;
    }

    @media (min-width: 48rem) {
      .timeline-item {
        grid-template-columns: 10rem 1fr;
        gap: var(--space-xl);
        padding-left: 0;
      }
    }

    /* Node Dot Indicator Marker */
    .timeline-marker {
      position: absolute;
      left: 0.25rem;
      top: 0.5rem;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      background-color: var(--color-bg);
      border: 2px solid var(--color-accent);
      z-index: 2;
      transition: background-color var(--transition-fast);
    }

    @media (min-width: 48rem) {
      .timeline-marker {
        left: 11.2rem;
      }
    }

    .timeline-item:hover .timeline-marker {
      background-color: var(--color-accent);
    }

    /* Time Block Typographic Shell */
    .time-frame {
      font-family: var(--font-mono);
      font-size: var(--step--1);
      color: var(--color-text-muted);
      font-weight: 500;
      margin-top: 2px;
    }

    @media (min-width: 48rem) {
      .time-frame {
        text-align: right;
      }
    }

    /* Accomplishments Block Context */
    .experience-details {
      background-color: transparent;
      transition: transform var(--transition-fast);
    }

    .role-header {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-bottom: var(--space-s);
    }

    h3 {
      font-family: var(--font-display);
      font-size: var(--step-1);
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 0;
    }

    .company-specification {
      font-family: var(--font-body);
      font-size: var(--step-0);
      color: var(--color-text-secondary);
      font-weight: 600;
    }

    .company-specification ::before {
      content: '// ';
      color: var(--color-accent);
      font-family: var(--font-mono);
    }

    /* Accomplishments Sub-list Rules */
    .accomplishments-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .accomplishments-list li {
      font-family: var(--font-body);
      font-size: var(--step--1);
      color: var(--color-text-secondary);
      position: relative;
      padding-left: var(--space-m);
      line-height: 1.5;
    }

    .accomplishments-list li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--color-accent);
      font-family: var(--font-mono);
    }
  </style>

  <div class="section-header">
    <span class="meta-tag" aria-hidden="true">runtime // historical_contributions</span>
    <h2>Career Architecture Matrix</h2>
  </div>

  <ol class="timeline-container" id="timelineList">
    <!-- Dynamic Timeline items will be injected here -->
  </ol>
`;

class PortfolioExperience extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Structured production achievements tracking technical focus metrics
    this.experienceData = [
      {
        time: "2024 — Present",
        role: "Principal UI Architect",
        company: "Nexus Design Systems",
        achievements: [
          "Engineered a multi-platform runtime token distribution mechanism serving 40+ engineering product platforms.",
          "Reduced core layout Cumulative Layout Shift (CLS) metrics by 32% across complex analytical dashboard ecosystems.",
          "Authored core web component specification documentation standardizing accessibility compliance baselines."
        ]
      },
      {
        time: "2022 — 2024",
        role: "Senior UI Design Engineer",
        company: "Quantum Interfaces",
        achievements: [
          "Developed high-performance UI components with native Shadow DOM architectures processing rapid data streaming workloads.",
          "Implemented full keyboard focus-trap systems and accessible routing structures satisfying strict WCAG 2.2 AA protocols.",
          "Optimized runtime layout paint executions using modern CSS layout approaches, dropping style budget processing times by 40ms."
        ]
      }
    ];
  }

  connectedCallback() {
    this.renderTimeline();
  }

  renderTimeline() {
    const listContainer = this.shadowRoot.getElementById('timelineList');
    listContainer.innerHTML = ''; // Clean injection target

    this.experienceData.forEach(item => {
      const entry = document.createElement('li');
      entry.classList.add('timeline-item');

      entry.innerHTML = `
        <div class="timeline-marker" aria-hidden="true"></div>
        <time class="time-frame">${item.time}</time>
        <div class="experience-details">
          <div class="role-header">
            <h3>${item.role}</h3>
            <span class="company-specification"><span>${item.company}</span></span>
          </div>
          <ul class="accomplishments-list" aria-label="Key accomplishments for ${item.role} at ${item.company}">
            ${item.achievements.map(task => `<li>${task}</li>`).join('')}
          </ul>
        </div>
      `;

      listContainer.appendChild(entry);
    });
  }
}

customElements.define('portfolio-experience', PortfolioExperience);