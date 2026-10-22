export interface ProjectDossier {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: string;
  status: string;
  stage: 'Production Prototype' | 'Hackathon Build' | 'Civic Tech Concept' | 'Personal Experiment';
  team: string;
  overview: string;
  details: string[];
  techStack: string[];
  screenshots: {
    url: string;
    localUrl: string;
    caption: string;
  }[];
  githubUrl?: string;
  demoUrl?: string;
  disclaimer?: string;
  metrics?: { label: string; value: string }[];
}

export interface ResearchPaper {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  status: 'Unpublished Research' | 'Conceptual Research' | 'Frontend Prototype';
  authors: string[];
  role: string;
  abstract: string;
  proposedFramework: string;
  actualImplementation: string;
  logo: string;
  logoFallback: string;
  githubUrl?: string;
  manuscriptAvailable: boolean;
  notes: string;
}

export interface WorkInProgress {
  id: string;
  code: string;
  title: string;
  stage: string;
  description: string;
  logo: string;
  logoFallback: string;
  statusNotes: string;
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  type: 'Venture' | 'Practical Operations Intern';
  period: string;
  location: string;
  description: string;
  highlights: string[];
  links?: { label: string; url: string }[];
  tags: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score?: string;
  details: string;
  type: 'University' | 'Higher Secondary' | 'Secondary';
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const PORTFOLIO_DATA = {
  hero: {
    name: 'Rophe Angel',
    callsign: 'NIGHT_CITY_NETRUNNER',
    title: 'Computer Science & Engineering Student',
    institution: "St. Joseph's Institute of Technology",
    tagline: 'Computer Science student building software, testing AI workflows, and figuring things out by actually writing the code.',
    mission: 'Exploring practical software engineering, modern AI integration pipelines, experimental research architectures, and civic tech solutions from the terminal up.',
    characterImage: {
      url: 'https://plain-apac-prod-public.komododecks.com/202610/22/8hSwzZ0wtKywQSeB2xdm/image.png',
      localUrl: '/assets/character.png',
      title: 'Neon Night City Mercenary',
      sourceRef: 'https://kommodo.ai/i/8hSwzZ0wtKywQSeB2xdm'
    },
    audio: {
      title: 'I Really Want to Stay at Your House',
      artist: 'Rosa Walton & Hallie Coggins (Cyberpunk: Edgerunners)',
      url: 'https://www.image2url.com/r2/default/audio/1792668946074-844dd506-6596-4868-b965-fcf48adec352.mp3',
      localFallback: '/assets/bgm.mp3'
    }
  },

  about: {
    photo: {
      url: 'https://cdn.phototourl.com/member/2026-10-20-376efeb6-5a53-4297-bb6b-0e252403f924.jpg',
      localUrl: '/assets/profile/rophe_profile.jpg',
      alt: 'Rophe Angel - Portrait'
    },
    bio: [
      "I am an undergraduate Computer Science & Engineering student at St. Joseph's Institute of Technology (2025–2029). Rather than relying on passive theory, I learn by building real interfaces, tinkering with authentication systems, running diagnostics on developer workflows, and shipping tangible software.",
      "My work spans civic data transparency concepts, collaborative hackathon prototypes, localized web audio playback, and proposed research in MSME performance verification and government tender document extraction.",
      "Beyond code, I run GradEarn—an early initiative helping students develop freelancing, communication, and hackathon capabilities—and maintain a disciplined hands-on approach to technical problem solving."
    ],
    accolades: [
      {
        title: 'NPTEL Data Science for Python',
        badge: 'Score: 68%',
        note: 'Official certification received upon course completion.'
      },
      {
        title: 'V-Vortex Hackathon at VIT',
        badge: 'Honorable Mention',
        note: 'Recognized for collaborative innovation and technical execution under rapid hackathon constraints.'
      }
    ]
  },

  projects: [
    {
      id: 'hush',
      code: 'GIG-01',
      title: 'HUSH',
      subtitle: 'Private Spotify-Inspired Web Audio Client',
      category: 'Web Audio / API Integration',
      status: 'Private / Local Preview Only',
      stage: 'Personal Experiment',
      team: 'Solo Developer',
      overview: 'A private, local and preview-only personal music web application inspired by the Spotify experience. Built to dive deep into OAuth 2.0 PKCE authentication handshakes, Spotify Web Playback SDK streaming, browser audio state machines, and real-time UI synchronization.',
      details: [
        'Implemented PKCE (Proof Key for Code Exchange) authorization flow for safe client-side token acquisition without leaking backend client secrets.',
        'Integrated Spotify Web Playback SDK for seamless active device streaming, playback control, seek events, and volume normalization.',
        'Designed high-fidelity reactive playback controls, queuing mechanics, album art color extraction, and playback state listeners.',
        'Rigorous debugging of token refresh cycles, CORS restrictions, browser autoplay policies, and cross-tab session syncing.'
      ],
      techStack: ['React', 'TypeScript', 'Spotify Web API', 'Web Playback SDK', 'PKCE Auth', 'Tailwind CSS'],
      screenshots: [
        {
          url: 'https://cdn.phototourl.com/member/2026-10-20-1f881889-0f38-4ff2-8a60-30e1cace00bd.png',
          localUrl: '/assets/projects/hush_1.png',
          caption: 'Hush main player interface showing active song playback, playlist queue, and waveform display.'
        },
        {
          url: 'https://cdn.phototourl.com/member/2026-10-20-a7557783-5319-4c35-b1ac-f5d74da5a9f4.png',
          localUrl: '/assets/projects/hush_2.png',
          caption: 'Album explorer and library navigation views with dynamic responsive UI.'
        }
      ],
      disclaimer: 'Notice: This is a private, local/preview-only personal research application. It is not a public commercial product, and no external repository or live demo is currently published.',
      metrics: [
        { label: 'Auth Protocol', value: 'OAuth 2.0 PKCE' },
        { label: 'Environment', value: 'Private / Local' },
        { label: 'Audio Engine', value: 'Spotify Playback SDK' }
      ]
    },
    {
      id: 'thadam',
      code: 'GIG-02',
      title: 'THADAM',
      subtitle: 'AI-Assisted Civic Monitoring Concept',
      category: 'Civic Tech & AI Audit',
      status: 'Active Prototype & Space Demo',
      stage: 'Civic Tech Concept',
      team: 'Team Project',
      overview: 'An AI-assisted civic monitoring concept and prototype focused on identifying potential irregularities in Member of Parliament Local Area Development Scheme (MPLAD) public spending, including duplicate sanctions, cost overruns, and timeline delays.',
      details: [
        'Explores automated data extraction and pattern analysis across public development fund expenditures.',
        'Conceptualizes anomaly detection filters to spot possible duplicate allocations and anomalous cost inflations.',
        'Deployed interactive Hugging Face Space prototype visualizing analytical queries and project sanction timelines.',
        'Collaborative team effort combining open data exploration with AI-assisted audit heuristics.'
      ],
      techStack: ['Python', 'Streamlit', 'Hugging Face Spaces', 'Data Analysis', 'Civic Open Data'],
      githubUrl: 'https://github.com/SomeNobody21112/Thadam',
      demoUrl: 'https://kannanyuvaraj-mplads.hf.space/',
      screenshots: [
        {
          url: 'https://cdn.phototourl.com/member/2026-10-20-1a66bf57-00f3-4490-8e79-1315626ba6ed.png',
          localUrl: '/assets/projects/thadam_1.png',
          caption: 'Thadam analytical dashboard displaying MPLAD spending breakdowns and anomaly flags.'
        },
        {
          url: 'https://cdn.phototourl.com/member/2026-10-20-7f77e496-1603-4179-827c-dc7e29718134.png',
          localUrl: '/assets/projects/thadam_2.png',
          caption: 'Sanction tracking table and expenditure verification interface.'
        }
      ],
      disclaimer: 'Notice: THADAM is an academic/civic research concept and prototype, not an officially deployed government monitoring infrastructure.',
      metrics: [
        { label: 'Domain', value: 'Civic Fund Transparency' },
        { label: 'Platform', value: 'Hugging Face Space' },
        { label: 'Team', value: 'Collaborative Project' }
      ]
    },
    {
      id: 'ichnova',
      code: 'GIG-03',
      title: 'ICHNOVA',
      subtitle: 'Collaborative Hackathon Solution',
      category: 'Web Engineering / Hackathon',
      status: 'Deployed on Render',
      stage: 'Hackathon Build',
      team: 'Hackathon Team',
      overview: 'A collaborative project engineered during an intensive hackathon sprint. Designed and deployed to tackle fast-paced problem statements with rapid full-stack iteration and responsive interface delivery.',
      details: [
        'Developed end-to-end interface flows and state handling under strict hackathon time limits.',
        'Integrated responsive layout components, user session workflows, and deployed the live instance on Render.',
        'Facilitated team source control, component modularity, and rapid feature turnaround.'
      ],
      techStack: ['JavaScript', 'Node.js', 'Express', 'Render Cloud', 'Git & GitHub'],
      githubUrl: 'https://github.com/SomeNobody21112/ICHNOVA',
      demoUrl: 'https://ichnova.onrender.com/',
      screenshots: [
        {
          url: 'https://cdn.phototourl.com/member/2026-10-20-f010881f-97b6-4900-bbec-91c085eea512.png',
          localUrl: '/assets/projects/ichnova_1.png',
          caption: 'ICHNOVA landing experience and core interface portal.'
        },
        {
          url: 'https://cdn.phototourl.com/member/2026-10-20-727e22d6-c4ad-478a-8f69-77fbe0e70965.png',
          localUrl: '/assets/projects/ichnova_2.png',
          caption: 'Interactive features dashboard and submission workspace.'
        }
      ],
      metrics: [
        { label: 'Sprint', value: 'Hackathon Deployment' },
        { label: 'Hosting', value: 'Render Cloud' },
        { label: 'Codebase', value: 'Public GitHub Repo' }
      ]
    },
    {
      id: 'jana-nayagan-project',
      code: 'GIG-04',
      title: 'JANA NAYAGAN',
      subtitle: 'AI-Assisted Civic Complaint Management Prototype',
      category: 'Civic Tech & UI Prototype',
      status: 'Frontend Prototype / WIP',
      stage: 'Production Prototype',
      team: 'Solo Developer',
      overview: 'An AI-assisted civic complaint management research and frontend prototype. Provides structured interface workflows, map-based grievance routing, and demo data for municipal issue reporting.',
      details: [
        'Constructed intuitive multi-step complaint filing workflows including geolocation pinning and media attachments.',
        'Exploratory AI-assisted complaint categorization and urgency scoring prototypes tested on sample grievances.',
        'Grounded status: The interface, mock routing, and frontend workflows are operational; full backend API integration and automated multi-department routing remain incomplete WIP.'
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Map Coordinates UI', 'Exploratory AI'],
      githubUrl: 'https://github.com/ropheangel1312-design/Jana-Nayagan',
      screenshots: [
        {
          url: 'https://cdn.phototourl.com/member/2026-10-20-376efeb6-5a53-4297-bb6b-0e252403f924.jpg',
          localUrl: '/assets/logos/jana_nayagan.png',
          caption: 'Jana Nayagan system emblem and civic complaint workflow model.'
        }
      ],
      disclaimer: 'Notice: Jana Nayagan is an experimental frontend prototype and research concept. It has not been deployed to production, AI classification is exploratory and unvalidated, and backend integration is incomplete.',
      metrics: [
        { label: 'Nature', value: 'Frontend Prototype' },
        { label: 'AI Status', value: 'Exploratory / Unvalidated' },
        { label: 'Backend', value: 'Integration Incomplete' }
      ]
    }
  ] as ProjectDossier[],

  research: [
    {
      id: 'assure',
      code: 'ARCHIVE-01',
      title: 'ASSURE: A Proposed Framework for Intelligent Tender Document Simplification and Requirement Extraction',
      subtitle: 'Intelligent Tender Document Simplification Framework',
      status: 'Unpublished Research',
      authors: ['Rophe Angel'],
      role: 'Lead Concept & Demo Prototyper',
      abstract: 'Public procurement tenders and institutional RFP documents are frequently dense, legally opaque, and arduous for small enterprises to parse accurately. ASSURE proposes an intelligent multi-stage framework combining document decomposition, domain-specific NLP parsing, and automated requirement matrix extraction to help contractors extract mandatory eligibility, bond requisites, and submission checklists.',
      proposedFramework: 'The theoretical framework proposes parsing multi-page PDF tenders via hierarchical chunking, extracting compliance clauses, and generating automated risk/requirement matrix tables for bidding teams.',
      actualImplementation: 'The companion demo showcases frontend workflows and simulated requirement extraction interfaces for tender files.',
      logo: '/assets/logos/assure.png',
      logoFallback: 'https://plain-apac-prod-public.komododecks.com/202610/21/16j9p2UuioTEchXIDJfZ/image.png',
      githubUrl: 'https://github.com/ropheangel1312-design/Assure---Demo',
      manuscriptAvailable: false,
      notes: 'Unpublished conceptual research. Manuscript URL not currently released.'
    },
    {
      id: 'jana-nayagan-paper',
      code: 'ARCHIVE-02',
      title: 'Jana Nayagan: Design and Prototype Development of an AI-Assisted Civic Complaint Management System',
      subtitle: 'Civic Grievance Routing and Triage Research',
      status: 'Frontend Prototype',
      authors: ['Rophe Angel'],
      role: 'Research & UI Prototype Author',
      abstract: 'Municipal grievance management faces persistent bottlenecks in manual categorization, duplicate grievance identification, and department routing. This paper explores the design criteria and prototype development of an AI-assisted citizen interface that captures structured grievance parameters, suggests category taxonomies, and provides transparency dashboards for civic oversight.',
      proposedFramework: 'Outlines a holistic pipeline from citizen mobile submission to computer-vision verification of civic defects (e.g. potholes, garbage dumps) and automated dispatch.',
      actualImplementation: 'Frontend interface prototype with sample grievance data and mock routing workflows. Backend API connection and ML model validation remain exploratory and incomplete.',
      logo: '/assets/logos/jana_nayagan.png',
      logoFallback: 'https://plain-apac-prod-public.komododecks.com/202610/21/mA2JNZwjOy7nxFbAUUa9/image.png',
      githubUrl: 'https://github.com/ropheangel1312-design/Jana-Nayagan',
      manuscriptAvailable: false,
      notes: 'Unpublished paper. Demonstrates prototype UI and research concept. AI classification is exploratory.'
    },
    {
      id: 'samay-saakshi',
      code: 'ARCHIVE-03',
      title: 'SAMAY & SAAKSHI: A Novel Multi-Source Operational-Performance Proof Engine for MSME Receivables Recovery and Legal Enforcement',
      subtitle: 'Multi-Source Operational Proof Engine for MSME Protection',
      status: 'Conceptual Research',
      authors: ['Sri Raamanuja Dasan', 'Kannan Y', 'Rophe Angel', 'Joyce Blessy'],
      role: 'Research Contributor',
      abstract: 'Micro, Small, and Medium Enterprises (MSMEs) continually suffer catastrophic liquidity crises due to delayed payments and contested proof of service delivery. SAMAY & SAAKSHI proposes a multi-source operational-performance proof engine aggregating verified timestamps, delivery receipts, communication trails, and contractual milestones into legally evidentiary dossiers for expedited debt recovery and formal tribunal enforcement.',
      proposedFramework: 'Proposes multi-source evidence synthesis: immutable operational logs, cross-verified client acknowledgments, and statutory compliance trails to satisfy Insolvency & Bankruptcy Code (IBC) and MSMED Act evidentiary bars.',
      actualImplementation: 'Collaborative architectural formulation and conceptual research. The complete software engine has not yet been implemented or experimentally validated.',
      logo: '/assets/logos/samay_saakshi.png',
      logoFallback: 'https://plain-apac-prod-public.komododecks.com/202610/21/ZncxHiVFIF5JU72N4VfD/image.png',
      manuscriptAvailable: false,
      notes: 'Unpublished research proposal. Collaborative work with Sri Raamanuja Dasan, Kannan Y, and Joyce Blessy.'
    }
  ] as ResearchPaper[],

  wips: [
    {
      id: 'asta-novara',
      code: 'OPS-01',
      title: 'ASTA-NOVARA',
      stage: 'Concept Scoping',
      description: 'An exploratory project currently in early conceptual research and requirement scoping. Focuses on structured data organization and workflow architecture.',
      logo: '/assets/logos/asta_novara.png',
      logoFallback: 'https://plain-apac-prod-public.komododecks.com/202610/21/hTLqmC3ahmU6KO0Gp8YL/image.png',
      statusNotes: 'Active exploratory phase. No public repository or live demo currently published.',
      tags: ['Concept', 'Research Scoping', 'Architecture Planning']
    },
    {
      id: 'lock-in',
      code: 'OPS-02',
      title: 'LOCK IN',
      stage: 'MVP Planning',
      description: 'Productivity and accountability execution framework in the MVP roadmap and functional architecture phase.',
      logo: '/assets/logos/lock_in.png',
      logoFallback: 'https://plain-apac-prod-public.komododecks.com/202610/21/XAlrRG3xXwvmAPURJDoR/image.png',
      statusNotes: 'MVP planning underway. Workflow blueprints and feature specifications in development.',
      tags: ['MVP Planning', 'Execution Framework', 'Workflow Design']
    }
  ] as WorkInProgress[],

  experience: [
    {
      id: 'gradearn',
      role: 'Founder',
      organization: 'GradEarn',
      type: 'Venture',
      period: 'October 2026 – Present',
      location: 'Chennai, India',
      description: 'An early-stage student empowerment initiative dedicated to equipping engineering and college students with actionable freelancing strategies, client communication instincts, and hackathon execution skills.',
      highlights: [
        'Student freelancing guidance: helping peers identify high-demand technical skill sets and package them for client work.',
        'Performance-based student support and portfolio readiness coaching.',
        'Client communication and project negotiation fundamentals.',
        'School and college technical outreach programs.',
        'Innovation and hackathon preparation coaching for collegiate competitive hackathons.'
      ],
      links: [
        { label: 'LinkedIn Page', url: 'https://www.linkedin.com/company/gradearn/' },
        { label: 'Instagram Profile', url: 'https://www.instagram.com/gradearn.in/' }
      ],
      tags: ['Venture', 'Student Mentorship', 'Hackathon Coaching', 'Freelancing Guidance']
    },
    {
      id: 'nissi-fresh',
      role: 'Retail Operations & POS Intern',
      organization: 'Nissi Fresh Supermarket',
      type: 'Practical Operations Intern',
      period: 'June 2026 – July 2026 (30 Days)',
      location: 'Chennai, India',
      description: 'Hands-on practical commercial retail operations experience managing point-of-sale systems, inventory tracking, and consumer logistics.',
      highlights: [
        'Hands-on operation with GoFrugal Point-of-Sale (POS) system for checkout billing and retail inventory tracking.',
        'Handled high-volume barcode scanning, SKU lookup, and cash/card transaction reconciliations.',
        'Utilized Microsoft Excel and Google Sheets for daily stock reconciliation and inventory audit updates.',
        'Maintained front-line shelf organization, product replenishment, and direct customer assistance.'
      ],
      tags: ['POS Systems', 'GoFrugal', 'Inventory Reconciliation', 'Commercial Operations', 'Excel / Sheets']
    }
  ] as ExperienceItem[],

  education: [
    {
      degree: 'B.E. Computer Science & Engineering',
      institution: "St. Joseph's Institute of Technology",
      period: '2025 – 2029',
      details: 'Undergraduate engineering studies focusing on computer architecture, algorithms, software engineering, and artificial intelligence.',
      type: 'University'
    },
    {
      degree: '12th Grade (Higher Secondary)',
      institution: 'SBOA Matriculation Higher Secondary School',
      period: '2025',
      score: '70%',
      details: 'Higher secondary coursework with mathematics, computer science, physics, and chemistry.',
      type: 'Higher Secondary'
    },
    {
      degree: '10th Grade (Secondary School)',
      institution: 'Spartan Matriculation Higher Secondary School',
      period: '2023',
      score: '69%',
      details: 'Secondary school education foundational certificate.',
      type: 'Secondary'
    }
  ] as EducationItem[],

  skills: [
    {
      category: 'Languages',
      skills: ['Python', 'Java', 'JavaScript']
    },
    {
      category: 'Core Disciplines',
      skills: ['Web Development', 'Software Development', 'Artificial Intelligence']
    },
    {
      category: 'Engineering & Workflow',
      skills: ['Prompt Engineering', 'Data Analysis', 'API Integration', 'Git and GitHub']
    }
  ] as SkillCategory[],

  resume: {
    filename: 'Rophe_Angel_Resume.pdf',
    downloadPath: '/Rophe_Angel_Resume.pdf',
    sourceRepo: 'https://github.com/ropheangel1312-design/Rophe-Angel---Portfolio',
    available: true
  },

  contact: {
    email: 'ropheangel1312@gmail.com',
    linkedin: 'https://www.linkedin.com/in/rophe-angel-b8a051370/',
    github: 'https://github.com/ropheangel1312-design',
    instagram: 'https://www.instagram.com/rophe.sys/',
    location: 'Chennai, Tamil Nadu, India'
  }
};
