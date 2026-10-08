/**
 * Data store for Kacho Zuhaib Hassan's Portfolio
 * Contains accurate, truthful project information and published module details.
 * No confidential client data or fake statistics are included.
 */

const portfolioData = {
  profile: {
    name: "Kacho Zuhaib Hassan",
    title: "Odoo Developer | ERP Developer",
    email: "zuhaibkacho12@gmail.com",
    phone: "+92 311 406 9952",
    whatsappUrl: "https://wa.me/923114069952?text=Hello%20Kacho%20Zuhaib,%20I%20would%20like%20to%20discuss%20an%20Odoo%20opportunity.",
    linkedinUrl: "https://www.linkedin.com/in/kacho-zuhaib/",
    githubUrl: "https://github.com/zuhaibkacho14",
    companyAppsUrl: "https://apps.odoo.com/apps/modules/browse?search=flibtech",
    currentCompany: "Werpsol",
    currentRole: "Odoo Developer",
    startDate: "April 2025",
    education: {
      degree: "Bachelor of Science in Computer Science",
      institution: "Iqra University",
      completionYear: "2024"
    }
  },

  projects: [
    {
      id: "fuel-management",
      title: "Fuel Management System",
      category: "Custom ERP Workflows",
      subtitle: "Comprehensive fuel station operations & settlement management in Odoo",
      shortDescription: "An end-to-end Odoo-based fuel management solution managing meter readings, daily pump settlements, fuel pricing, tank inventories, and automated billing workflows.",
      problem: "Fuel station businesses handle high-volume transactions with daily meter variances, fluctuating fuel prices, shift-based pump attendant handovers, and complex inventory reconciliation between underground storage tanks and dispenser nozzles.",
      solution: "Engineered a custom Odoo ERP module streamlining daily meter readings, automated volume-to-sales calculations, shift settlements, price updates, and multi-tank inventory adjustments with full auditability.",
      myContribution: "Architected custom Odoo models for fuel tanks, pumps, nozzles, and shifts. Implemented business logic for shift meter readings reconciliation, automated journal entries, and automated stock moves from storage tanks.",
      technologies: ["Python", "Odoo ORM", "XML Views", "PostgreSQL", "Odoo Workflows", "QWeb Reports"],
      keyFeatures: [
        "Tank & Dispenser hierarchy (Tanks -> Pumps -> Nozzles)",
        "Daily shift opening/closing meter reading workflows",
        "Automated volume calculation and price reconciliation",
        "Inventory adjustments for underground fuel storage",
        "Attendant settlement tracking and cash handover audits",
        "Comprehensive QWeb daily sales & shift reconciliation reports"
      ],
      badge: "ERP Solution",
      isConfidential: true,
      confidentialityNote: "Developed as part of professional ERP client implementations. Architecture presented conceptually without exposing client data."
    },
    {
      id: "asana-odoo-integration",
      title: "Asana–Odoo Integration",
      category: "Integrations & APIs",
      subtitle: "Two-way automated task & project synchronization engine",
      shortDescription: "A robust integration connector synchronizing Asana projects, sections, tasks, attachments, and user comments with Odoo Project & Task workflows via OAuth.",
      problem: "Cross-functional teams using Asana for agile sprint tracking while managing project accounting, timesheets, and invoicing inside Odoo faced duplicated data entry and inconsistent milestone tracking.",
      solution: "Developed an asynchronous integration service connecting Odoo with Asana REST API using secure OAuth authentication, mapping hierarchical data models and maintaining bidirectional status synchronizations.",
      myContribution: "Built OAuth 2.0 handshake handling, webhook listeners, rate-limit throttlers, and custom Odoo background scheduled actions (cron) for reliable delta syncing of tasks, comments, and attachments.",
      technologies: ["Python", "Odoo API", "OAuth 2.0", "REST APIs", "JSON", "Scheduled Actions", "PostgreSQL"],
      keyFeatures: [
        "Secure OAuth 2.0 connection and token refresh handling",
        "Bi-directional workspace, project, and section mapping",
        "Delta synchronization for task status, due dates, and assignees",
        "Comment & attachment mirror between Odoo and Asana",
        "Rate-limiting protection and synchronization log audits",
        "Configurable field-level mapping rules"
      ],
      badge: "API Integration",
      isConfidential: true,
      confidentialityNote: "Built for company workflow automation. Proprietary credentials and private endpoints are protected."
    },
    {
      id: "real-estate-management",
      title: "Real Estate Management",
      category: "Custom ERP Modules",
      subtitle: "Property lifecycle, unit booking, and lease management platform",
      shortDescription: "A tailored Odoo real estate solution featuring property unit hierarchies, installment schedules, contract lifecycle management, and custom analytical dashboard views.",
      problem: "Real estate operators struggle with fragmented tracking of unit availability, multi-stage installment agreements, commission payouts, and maintenance requests across various property portfolios.",
      solution: "Built a consolidated Odoo real estate management platform that tracks properties from acquisition and construction stage to booking, leasing, deed handovers, and installment billing.",
      myContribution: "Designed normalized data structures for properties, floors, and individual units. Developed custom Kanban/list views, automated installment payment generation, and interactive property availability matrix.",
      technologies: ["Python", "Odoo ORM", "XML Views", "OWL / JavaScript", "PostgreSQL", "Odoo Accounting Integration"],
      keyFeatures: [
        "Multi-tiered property portfolio hierarchy (Projects, Buildings, Units)",
        "Dynamic unit availability status (Available, Reserved, Sold, Leased)",
        "Automated installment schedules with penalty and discount logic",
        "Customer booking contracts linked with Odoo Invoicing",
        "Interactive dashboard for occupancy rates and payment collections",
        "Tenant maintenance ticketing integration"
      ],
      badge: "Custom Module",
      isConfidential: true,
      confidentialityNote: "Developed as part of professional work at Werpsol."
    },
    {
      id: "customer-access-control",
      title: "Customer Access Control",
      category: "Security & Record Rules",
      subtitle: "Multi-tier record security & salesperson visibility governance",
      shortDescription: "A fine-grained security module enforcing user-based customer visibility, segregating client accounts into 'Own', 'Assigned', and 'All' permissions with portal access control.",
      problem: "In competitive sales organizations, sales agents and external partners should only view customer accounts and quotations explicitly assigned to them or their department, avoiding unauthorized account poaching.",
      solution: "Implemented strict Odoo Record Rules (ir.rule) and Access Rights (ir.model.access) ensuring absolute data isolation at the ORM level without breaking standard Odoo sales and quotation workflows.",
      myContribution: "Authored robust domain filters and record rules that govern partner visibility across Sales, CRM, Invoicing, and Customer Portal without introducing database performance bottlenecks.",
      technologies: ["Python", "Odoo Security", "Record Rules (ir.rule)", "Access Rights", "XML", "Odoo Portal"],
      keyFeatures: [
        "Three-tier visibility model: Own Customers, Assigned Team Customers, All",
        "Dynamic ORM domain rules evaluating user department and team hierarchy",
        "Seamless compatibility with standard CRM leads and Sales orders",
        "Portal-safe access rules preventing partner exposure",
        "Zero-leak record isolation validated with multi-role unit testing",
        "Easy administrator configuration via user profile checkboxes"
      ],
      badge: "Security & Rules",
      isPublishedApp: true,
      appStoreUrl: "https://apps.odoo.com/apps/modules/browse?search=flibtech",
      confidentialityNote: "Developed as part of professional work at Werpsol and published through the company's Odoo Apps store."
    },
    {
      id: "laboratory-management",
      title: "Laboratory Management System",
      category: "Enterprise Healthcare ERP",
      subtitle: "Clinical diagnostics, sample lifecycle, and test result workflows",
      shortDescription: "An advanced diagnostic laboratory ERP covering patient intake, test sample custody, automated parameter evaluation, diagnostic reporting, and portal result retrieval.",
      problem: "Clinical laboratories require rigorous tracking of patient requests, sample accessioning, multi-parameter test protocols, physician approvals, reagent inventory consumption, and HIPAA-level patient data privacy.",
      solution: "Created an extensive medical laboratory solution within Odoo that tracks clinical workflows from sample collection through instrument analysis, medical director sign-off, and automated patient portal reporting.",
      myContribution: "Engineered core laboratory models (Lab Requests, Test Templates, Parameter Rules, Sample Batches). Implemented dynamic result entry forms with normal range flag indicators and automated PDF diagnostic report generation.",
      technologies: ["Python", "Odoo ORM", "XML Views", "QWeb Reports", "PostgreSQL", "Odoo Portal", "Inventory Integration"],
      keyFeatures: [
        "Patient master records with medical history and doctor references",
        "Multi-test diagnostic request bundling with barcoded sample tracking",
        "Dynamic parameter entry with auto-flagging of out-of-range values",
        "Doctor sign-off workflow with digital verification stamps",
        "Automated lab reagent inventory consumption on test execution",
        "Patient portal for secure online report downloads"
      ],
      badge: "Healthcare ERP",
      isPublishedApp: true,
      appStoreUrl: "https://apps.odoo.com/apps/modules/browse?search=flibtech",
      confidentialityNote: "Developed as part of professional work at Werpsol and published through the company's Odoo Apps store."
    },
    {
      id: "tender-management",
      title: "Tender Management System",
      category: "Procurement & Bidding",
      subtitle: "Multi-stage procurement bidding, vendor evaluation & award workflow",
      shortDescription: "An advanced public & corporate procurement system managing RFQ publication, multi-vendor bids, technical & commercial scoring matrices, and PO conversions.",
      problem: "Organizations conducting large-scale procurement lack structured transparency when collecting vendor bids, comparing competitive commercial quotes, recording evaluator scores, and finalizing contract awards.",
      solution: "Built a comprehensive tender lifecycle engine in Odoo featuring staged RFP workflows, automated vendor invitation portals, weighted score ranking, and audit-proof purchase order generation.",
      myContribution: "Implemented tender lifecycle state machines, vendor portal submission forms, multi-criteria bid comparison logic with rank calculators, and automated purchase requisition handoffs.",
      technologies: ["Python", "Odoo ORM", "XML Views", "Odoo Portal", "Website Publishing", "Odoo Purchases", "Activity Management"],
      keyFeatures: [
        "Structured tender lifecycle (Draft, Published, Bidding Open, Under Evaluation, Awarded)",
        "Vendor portal allowing external bidders to submit documents and pricing",
        "Automated quote ranking matrix based on technical and financial scoring",
        "Single-click winning bidder conversion into standard Odoo Purchase Order",
        "Integrated activity management for evaluator reminders and deadline alerts",
        "Comprehensive tender summary report for procurement audit committees"
      ],
      badge: "Procurement Workflow",
      isPublishedApp: true,
      appStoreUrl: "https://apps.odoo.com/apps/modules/browse?search=flibtech",
      confidentialityNote: "Developed as part of professional work at Werpsol and published through the company's Odoo Apps store."
    }
  ],

  publishedModules: [
    {
      id: "mod-lab",
      name: "Laboratory Management System",
      version: "Odoo 17 / 16",
      category: "Medical & Healthcare",
      tagline: "End-to-end diagnostic workflow from patient request to verified report",
      keyHighlights: [
        "Patient management and diagnostic request intake",
        "Sample tracking with barcode integration",
        "Customizable test templates with multi-parameter limits",
        "Reagent stock consumption connected to Odoo Inventory",
        "Automated PDF medical reports and patient portal downloads"
      ],
      contribution: "Designed models, workflow states, parameter validation logic, and QWeb report formatting."
    },
    {
      id: "mod-access",
      name: "Customer Access Control & Visibility",
      version: "Odoo 17 / 16",
      category: "Security & Sales Management",
      tagline: "User-based client visibility segregation with record rules",
      keyHighlights: [
        "Granular 'Own / Assigned / All' customer visibility levels",
        "Department and sales team boundary protection",
        "Record-level security rules without ORM slowdown",
        "Portal user segregation for confidential records"
      ],
      contribution: "Authored security groups, XML access rights, and performance-tuned record rule domain filters."
    },
    {
      id: "mod-tender",
      name: "Tender & Bid Evaluation Management",
      version: "Odoo 17 / 16",
      category: "Procurement & Purchasing",
      tagline: "Comprehensive competitive bidding and vendor quote ranking system",
      keyHighlights: [
        "Multi-stage tender publishing and portal bidding",
        "Technical & commercial bid comparison matrix",
        "Automated winning quote selection and Purchase Order creation",
        "Activity reminders and procurement committee sign-offs"
      ],
      contribution: "Developed procurement state machine, quote comparison engine, and portal integration."
    }
  ],

  skills: {
    primaryOdoo: [
      { name: "Odoo Development", level: "Core", desc: "Building scalable ERP modules from scratch" },
      { name: "Custom Modules", level: "Core", desc: "Clean module architecture & manifest configs" },
      { name: "Odoo ORM", level: "Core", desc: "Data manipulation, search domains, compute methods" },
      { name: "Models & Fields", level: "Core", desc: "Relational modeling (Many2one, One2many, Many2many)" },
      { name: "XML Views", level: "Core", desc: "Form, tree/list, kanban, search, and graph views" },
      { name: "QWeb Reports", level: "Core", desc: "Custom PDF printout design & dynamic layouts" },
      { name: "Controllers & Routing", level: "Core", desc: "Handling web HTTP/JSON requests & endpoints" },
      { name: "Portal Development", level: "Core", desc: "Customer & vendor facing portal web pages" },
      { name: "Access Rights & Security", level: "Core", desc: "ir.model.access.csv, groups & permission tiers" },
      { name: "Record Rules", level: "Core", desc: "Fine-grained ORM row-level security domains" },
      { name: "Business Workflows", level: "Core", desc: "State machine logic, approvals & automated handoffs" },
      { name: "Scheduled Actions", level: "Core", desc: "Automated cron jobs & background processing" },
      { name: "Odoo Customization", level: "Core", desc: "Inheriting existing models & overriding views" },
      { name: "Module Debugging", level: "Core", desc: "Log analysis, shell debugging, and issue resolution" }
    ],
    backendProgramming: [
      { name: "Python", desc: "Primary backend language for Odoo logic, OOP, and scripts" },
      { name: "C#", desc: "Object-oriented desktop & enterprise application development" },
      { name: ".NET Framework", desc: "Desktop application lifecycle & Windows components" },
      { name: "SQL", desc: "Relational queries, query optimization, indexing & joins" }
    ],
    databases: [
      { name: "PostgreSQL", desc: "Primary Odoo database: schemas, indexing, vacuuming & tuning" },
      { name: "SQL Server", desc: "Relational database used in .NET enterprise applications" }
    ],
    frontendOdooUI: [
      { name: "XML", desc: "Declaring Odoo views, menus, actions, and security rules" },
      { name: "HTML5 & CSS3", desc: "Modern styling, responsive layouts & QWeb markup" },
      { name: "JavaScript", desc: "Client-side scripting & Odoo web client behavior" },
      { name: "OWL (Odoo Web Library)", desc: "Modern reactive component framework for Odoo 16+" }
    ],
    toolsEnvironment: [
      { name: "Git", desc: "Branching, committing, rebasing & clean version control" },
      { name: "GitHub", desc: "Repository management, pull requests, code reviews" },
      { name: "PyCharm", desc: "Dedicated IDE for Python & Odoo source debugging" },
      { name: "VS Code", desc: "Full-stack code editing & web client development" },
      { name: "Odoo Dev Environment", desc: "Multi-instance configurations, filestore & virtualenvs" }
    ]
  },

  developmentProcess: [
    {
      step: "01",
      title: "Understand",
      subtitle: "Analyze Business Requirements",
      description: "Thoroughly dissect the customer's operational requirement, existing Odoo workflows, pain points, and target business outcome before writing any code."
    },
    {
      step: "02",
      title: "Plan",
      subtitle: "Architect Models & Architecture",
      description: "Break requirements down into clean relational models, field definitions, view hierarchies, security groups, state transitions, and integration touchpoints."
    },
    {
      step: "03",
      title: "Develop",
      subtitle: "Implement Clean Code",
      description: "Code custom modules strictly following Odoo development guidelines, utilizing Odoo ORM methods, Python best practices, and clean XML view inheritance."
    },
    {
      step: "04",
      title: "Test",
      subtitle: "Verify Functional Integrity",
      description: "Validate the module in a dedicated local development database with mock data, checking business constraints, permissions, and edge cases."
    },
    {
      step: "05",
      title: "Debug",
      subtitle: "Resolve Issues & Edge Cases",
      description: "Trace server logs, inspect database queries, and systematically resolve any functional hiccups, workflow bottlenecks, or validation errors."
    },
    {
      step: "06",
      title: "Improve",
      subtitle: "Refactor & Optimize",
      description: "Optimize database domain searches, eliminate redundant compute triggers, refactor code readability, and verify UI responsiveness."
    },
    {
      step: "07",
      title: "Deliver",
      subtitle: "Prepare Staging & Handover",
      description: "Package the module cleanly with proper manifest versioning, dependencies, upgrade scripts, and documentation ready for team review and deployment."
    }
  ]
};

// Expose globally for browser usage
window.portfolioData = portfolioData;
