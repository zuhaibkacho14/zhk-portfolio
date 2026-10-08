/**
 * Main Application Script for Kacho Zuhaib Hassan's Portfolio
 * Handles UI interactions, project modal, filters, scroll spying, and contact utilities.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderWhatIBuild();
    renderSkills();
    renderProjects();
    renderPublishedModules();
    renderProcessSteps();
    initProjectModal();
    initContactUtilities();
    initReducedMotionToggle();
  });

  /* ==========================================================================
     1. NAVIGATION & SCROLL SPY
     ========================================================================== */
  function initNavigation() {
    const navbar = document.getElementById('main-navbar');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Navbar compact on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }

      // Scroll Spy for active navigation link
      let currentSectionId = '';
      const scrollPos = window.scrollY + 120;

      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
      }
    }, { passive: true });

    // Mobile menu toggle
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('drawer-open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close mobile menu when clicking any mobile nav link
      mobileDrawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('drawer-open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }
  }

  /* ==========================================================================
     2. WHAT I BUILD (Section 20)
     ========================================================================== */
  function renderWhatIBuild() {
    const container = document.getElementById('what-i-build-grid');
    if (!container) return;

    const pillars = [
      {
        num: "01",
        title: "Custom Odoo Modules",
        description: "Business-specific ERP functionality designed around real workflows, from data models to custom user interfaces.",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
      },
      {
        num: "02",
        title: "ERP Customization",
        description: "Extending core Odoo models, overriding XML views, refining business logic, and tailoring workflows to organizational rules.",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`
      },
      {
        num: "03",
        title: "Integrations & APIs",
        description: "Connecting Odoo with external platforms (such as Asana, third-party portals, and payment gateways) via secure OAuth and REST APIs.",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`
      },
      {
        num: "04",
        title: "Business Automation",
        description: "Turning repetitive manual operational tasks into reliable automated ERP workflows, scheduled cron actions, and rule checks.",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>`
      }
    ];

    container.innerHTML = pillars.map(p => `
      <div class="pillar-card group">
        <div class="pillar-header">
          <span class="pillar-number">${p.num}</span>
          <div class="pillar-icon">${p.icon}</div>
        </div>
        <h3 class="pillar-title">${p.title}</h3>
        <p class="pillar-desc">${p.description}</p>
        <div class="pillar-corner-accent"></div>
      </div>
    `).join('');
  }

  /* ==========================================================================
     3. SKILLS SECTION (Requirement 12 - No fake percentages)
     ========================================================================== */
  function renderSkills() {
    const odooSkillsContainer = document.getElementById('odoo-skills-grid');
    const supportingSkillsContainer = document.getElementById('supporting-skills-grid');
    if (!odooSkillsContainer || !window.portfolioData) return;

    const data = window.portfolioData.skills;

    // Primary Odoo Skills
    odooSkillsContainer.innerHTML = data.primaryOdoo.map(s => `
      <div class="skill-tag skill-odoo-tag">
        <span class="skill-dot"></span>
        <span class="skill-name">${s.name}</span>
        <span class="skill-tooltip">${s.desc}</span>
      </div>
    `).join('');

    // Supporting categories: Backend, Databases, Frontend, Tools
    const supportingGroups = [
      {
        category: "Backend & Programming",
        items: data.backendProgramming
      },
      {
        category: "Databases",
        items: data.databases
      },
      {
        category: "Frontend & Odoo UI",
        items: data.frontendOdooUI
      },
      {
        category: "Tools & Environment",
        items: data.toolsEnvironment
      }
    ];

    supportingSkillsContainer.innerHTML = supportingGroups.map(group => `
      <div class="supporting-skill-card">
        <h4 class="supporting-category-title">${group.category}</h4>
        <div class="supporting-tags-wrap">
          ${group.items.map(item => `
            <div class="skill-tag skill-general-tag">
              <span class="skill-name">${item.name}</span>
              ${item.desc ? `<span class="skill-tooltip">${item.desc}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  /* ==========================================================================
     4. FEATURED PROJECTS SECTION (Requirement 13 & 14)
     ========================================================================== */
  function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid || !window.portfolioData) return;

    const projects = window.portfolioData.projects;

    grid.innerHTML = projects.map(proj => `
      <div class="project-card" data-project-id="${proj.id}">
        <div class="project-media-wrapper">
          <div class="project-preview-graphic">
            <div class="blueprint-overlay"></div>
            <div class="blueprint-badge">${proj.badge}</div>
            <div class="blueprint-icon-center">
              ${getProjectIcon(proj.id)}
            </div>
            <div class="blueprint-caption">[Project Architecture Preview]</div>
          </div>
        </div>

        <div class="project-content">
          <div class="project-meta-row">
            <span class="project-category-badge">${proj.category}</span>
          </div>

          <h3 class="project-card-title">${proj.title}</h3>
          <p class="project-subtitle">${proj.subtitle}</p>
          <p class="project-card-desc">${proj.shortDescription}</p>

          <div class="project-tech-pills">
            ${proj.technologies.slice(0, 4).map(tech => `<span class="tech-pill">${tech}</span>`).join('')}
            ${proj.technologies.length > 4 ? `<span class="tech-pill-more">+${proj.technologies.length - 4}</span>` : ''}
          </div>

          <div class="project-card-footer">
            <button type="button" class="btn-project-details" data-project-id="${proj.id}">
              <span>View Full Details</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
            ${proj.appStoreUrl ? `
              <a href="${proj.appStoreUrl}" target="_blank" rel="noopener noreferrer" class="link-app-badge" title="Published on Company Odoo Apps">
                <span>Company App</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // Attach click handlers to open modal
    grid.querySelectorAll('.project-card, .btn-project-details').forEach(elem => {
      elem.addEventListener('click', (e) => {
        // Prevent anchor clicks inside from triggering modal
        if (e.target.closest('.link-app-badge')) return;
        const id = elem.dataset.projectId || elem.closest('.project-card')?.dataset.projectId;
        if (id) openProjectModal(id);
      });
    });
  }

  function getProjectIcon(id) {
    switch (id) {
      case 'fuel-management':
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.7"><path d="M3 22V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v18"></path><path d="M14 13h4a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0"></path><line x1="7" y1="7" x2="13" y2="7"></line></svg>`;
      case 'asana-odoo-integration':
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.7"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline><path d="M16 2v4"></path><path d="M8 2v4"></path></svg>`;
      case 'real-estate-management':
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.7"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="16" y2="14"></line></svg>`;
      case 'customer-access-control':
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.7"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
      case 'laboratory-management':
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.7"><path d="M14.5 2v6.5L19 17.5a2.5 2.5 0 0 1-2.2 3.5H7.2A2.5 2.5 0 0 1 5 17.5L9.5 8.5V2"></path><line x1="8" y1="2" x2="16" y2="2"></line></svg>`;
      case 'tender-management':
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.7"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
      default:
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.7"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
    }
  }

  /* ==========================================================================
     5. ODOO MODULES / PUBLISHED APPS (Requirements 15 & 16)
     ========================================================================== */
  function renderPublishedModules() {
    const container = document.getElementById('published-modules-grid');
    if (!container || !window.portfolioData) return;

    const modules = window.portfolioData.publishedModules;

    container.innerHTML = modules.map(mod => `
      <div class="module-card">
        <div class="module-card-header">
          <div class="module-version-badge">${mod.version}</div>
          <span class="module-category-pill">${mod.category}</span>
        </div>

        <h3 class="module-title">${mod.name}</h3>
        <p class="module-tagline">${mod.tagline}</p>

        <div class="module-features-box">
          <h4 class="features-label">Core Implementation:</h4>
          <ul class="module-features-list">
            ${mod.keyHighlights.map(h => `
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>${h}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="module-contribution-box">
          <strong>My Contribution:</strong> ${mod.contribution}
        </div>

        <div class="module-footer">
          <a href="${window.portfolioData.profile.companyAppsUrl}" target="_blank" rel="noopener noreferrer" class="btn-view-app-store">
            <span>View on Company Apps</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      </div>
    `).join('');
  }

  /* ==========================================================================
     6. "HOW I WORK" PROCESS (Requirement 17)
     ========================================================================== */
  function renderProcessSteps() {
    const container = document.getElementById('process-pipeline');
    if (!container || !window.portfolioData) return;

    const steps = window.portfolioData.developmentProcess;

    container.innerHTML = steps.map((s, idx) => `
      <div class="process-card">
        <div class="process-step-indicator">${s.step}</div>
        <div class="process-card-body">
          <h3 class="process-title">${s.title}</h3>
          <p class="process-subtitle">${s.subtitle}</p>
          <p class="process-description">${s.description}</p>
        </div>
        ${idx < steps.length - 1 ? `<div class="process-connector-arrow"></div>` : ''}
      </div>
    `).join('');
  }

  /* ==========================================================================
     7. INTERACTIVE PROJECT DETAILS MODAL (Requirement 36)
     ========================================================================== */
  let activeModalProject = null;

  function initProjectModal() {
    const modalBackdrop = document.getElementById('project-modal-backdrop');
    const closeBtn = document.getElementById('modal-close-btn');

    if (!modalBackdrop) return;

    // Close on backdrop click
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });

    // Close on button click
    if (closeBtn) {
      closeBtn.addEventListener('click', closeProjectModal);
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modalBackdrop.classList.contains('hidden')) {
        closeProjectModal();
      }
    });
  }

  function openProjectModal(projectId) {
    if (!window.portfolioData) return;
    const project = window.portfolioData.projects.find(p => p.id === projectId);
    if (!project) return;

    activeModalProject = project;

    const modalBackdrop = document.getElementById('project-modal-backdrop');
    const modalBody = document.getElementById('modal-dynamic-content');

    if (!modalBackdrop || !modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-project-header">
        <div class="modal-tag-row">
          <span class="project-category-badge">${project.category}</span>
          <span class="blueprint-badge">${project.badge}</span>
        </div>
        <h2 class="modal-project-title">${project.title}</h2>
        <p class="modal-project-subtitle">${project.subtitle}</p>
      </div>

      <div class="modal-grid-layout">
        <!-- Left Column: Problem & Solution -->
        <div class="modal-col-main">
          <div class="modal-section-block">
            <h4 class="modal-block-heading">Business Problem & Purpose</h4>
            <p class="modal-block-text">${project.problem}</p>
          </div>

          <div class="modal-section-block">
            <h4 class="modal-block-heading">Engineered Solution</h4>
            <p class="modal-block-text">${project.solution}</p>
          </div>

          <div class="modal-section-block modal-highlight-block">
            <h4 class="modal-block-heading">My Contribution</h4>
            <p class="modal-block-text">${project.myContribution}</p>
          </div>

          <div class="modal-section-block">
            <h4 class="modal-block-heading">Key Features & Modules</h4>
            <ul class="modal-features-list">
              ${project.keyFeatures.map(f => `
                <li>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Right Column: Tech & Confidentiality -->
        <div class="modal-col-sidebar">
          <div class="modal-sidebar-card">
            <h4 class="sidebar-heading">Technologies Used</h4>
            <div class="sidebar-tech-wrap">
              ${project.technologies.map(t => `<span class="tech-pill">${t}</span>`).join('')}
            </div>
          </div>

          <div class="modal-sidebar-card">
            <h4 class="sidebar-heading">Professional Context</h4>
            <p class="context-note">
              ${project.confidentialityNote}
            </p>
          </div>

          ${project.appStoreUrl ? `
            <div class="modal-sidebar-card">
              <h4 class="sidebar-heading">Company App Store</h4>
              <a href="${project.appStoreUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary-action w-full text-center">
                <span>View Company Odoo Apps</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    modalBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    const modalBackdrop = document.getElementById('project-modal-backdrop');
    if (!modalBackdrop) return;

    modalBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
    activeModalProject = null;
  }

  /* ==========================================================================
     8. CONTACT UTILITIES & CLIPBOARD (Requirement 21)
     ========================================================================== */
  function initContactUtilities() {
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailTooltip = document.getElementById('copy-email-tooltip');

    if (copyEmailBtn && emailTooltip) {
      copyEmailBtn.addEventListener('click', () => {
        const email = 'zuhaibkacho12@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          emailTooltip.classList.add('tooltip-visible');
          setTimeout(() => {
            emailTooltip.classList.remove('tooltip-visible');
          }, 2400);
        }).catch(() => {
          // Fallback if clipboard API fails
          window.location.href = `mailto:${email}`;
        });
      });
    }

    // Interactive message composer
    const composeBtn = document.getElementById('compose-send-btn');
    if (composeBtn) {
      composeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');
        
        const subject = encodeURIComponent(subjectInput?.value.trim() || 'Odoo Development Opportunity');
        const body = encodeURIComponent(messageInput?.value.trim() || 'Hello Kacho Zuhaib, I would like to discuss an Odoo project.');
        
        window.location.href = `mailto:zuhaibkacho12@gmail.com?subject=${subject}&body=${body}`;
      });
    }
  }

  /* ==========================================================================
     9. ACCESSIBILITY: REDUCED MOTION TOGGLE (Requirement 31)
     ========================================================================== */
  function initReducedMotionToggle() {
    const motionToggleBtn = document.getElementById('motion-toggle-btn');
    if (!motionToggleBtn) return;

    function updateMotionState(isReduced) {
      if (isReduced) {
        document.documentElement.classList.add('reduced-motion');
        motionToggleBtn.setAttribute('aria-pressed', 'true');
        motionToggleBtn.title = "Enable Road Animation";
        motionToggleBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
          <span class="sr-only">Animation: Off</span>
        `;
      } else {
        document.documentElement.classList.remove('reduced-motion');
        motionToggleBtn.setAttribute('aria-pressed', 'false');
        motionToggleBtn.title = "Reduce Animation";
        motionToggleBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          <span class="sr-only">Animation: On</span>
        `;
      }

      if (window.odooJourney) {
        window.odooJourney.reducedMotion = isReduced;
      }
    }

    // Initial check
    const isInitiallyReduced = localStorage.getItem('kzh-reduced-motion') === 'true' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    updateMotionState(isInitiallyReduced);

    motionToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.classList.contains('reduced-motion');
      const next = !current;
      localStorage.setItem('kzh-reduced-motion', next);
      updateMotionState(next);
    });
  }

})();
