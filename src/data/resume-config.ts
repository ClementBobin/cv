import type { AppLabels, ResumeConfig } from './types'

/**
 * This is an example configuration file.
 * Copy this file to `resume-config.ts` and fill in your own information.
 *
 * All text fields that support multiple languages use the `LocalizedString` format:
 * { en: "English text", fr: "Texte français" }
 *
 * Add as many languages as you need — just make sure to list them in `languages.available`.
 */
export const resumeConfig: ResumeConfig = {
  // ===== PERSONAL INFO =====
  personal: {
    name: 'Jane Doe',
    photo: '/images/photo.jpg', // Place your photo in public/images/
    photoBackEmoji: '👩‍💻', // Shown when clicking the photo (3D flip)
    title: {
      en: 'Fullstack Developer',
      fr: 'Développeuse Fullstack',
    },
    subtitle: {
      en: '6 years of experience',
      fr: '6 ans d\'expérience',
    },
    location: 'Paris, France',
  },

  // ===== SEO (used in <head> meta tags) =====
  seo: {
    title: 'Jane Doe — Fullstack Developer',
    description: 'Interactive resume of Jane Doe, Fullstack Developer specializing in React and TypeScript.',
  },

  // ===== LANGUAGES =====
  languages: {
    default: 'en',
    available: ['en', 'fr'],
    labels: {
      en: 'EN',
      fr: 'FR',
    },
  },

  // ===== CONTACT =====
  contact: [
    { type: 'github', label: 'janedoe', href: 'https://github.com/janedoe' },
    { type: 'linkedin', label: 'Jane Doe', href: 'https://linkedin.com/in/janedoe' },
    { type: 'email', label: 'jane@example.com' },
    { type: 'phone', label: '+33 6 12 34 56 78' },
    { type: 'location', label: 'Paris, France' },
  ],

  // ===== SKILLS =====
  skills: [
    {
      title: { en: 'Languages', fr: 'Langues' },
      type: 'languages',
      items: [
        { name: { en: 'French', fr: 'Français' }, level: { en: 'Native', fr: 'Natif' } },
        { name: { en: 'English', fr: 'Anglais' }, level: { en: 'Professional', fr: 'Professionnel' }, details: 'TOEIC 910' },
      ],
    },
    {
      title: { en: 'Frontend', fr: 'Frontend' },
      type: 'badges',
      // Items can be plain strings OR objects with optional href / tooltip
      items: [
        'React',                                                  // plain string
        'TypeScript',
        { name: 'Angular', href: 'https://angular.io' },         // with link
      ],
    },
    {
      title: { en: 'Backend', fr: 'Backend' },
      type: 'badges',
      items: ['Node.js', 'Python'],
    },
    {
      title: { en: 'Database', fr: 'Base de données' },
      type: 'badges',
      items: ['PostgreSQL', 'MongoDB'],
    },
    {
      title: { en: 'DevOps', fr: 'DevOps' },
      type: 'badges',
      items: [
        'Docker',
        { name: 'Kubernetes', href: 'https://kubernetes.io' },
        { name: 'AWS', href: 'https://aws.amazon.com', tooltip: 'Amazon Web Services' },
        { name: 'GitHub Actions' },
      ],
    },
    {
      title: { en: 'Methodologies', fr: 'Méthodologies' },
      type: 'text',
      items: [
        { name: { en: 'Agile/Scrum, TDD, Code Review, CI/CD', fr: 'Agile/Scrum, TDD, Code Review, CI/CD' } }
      ]
    }
  ],

  // ===== PROFESSIONAL EXPERIENCES =====
  experiences: [
    {
      id: 'company-a',
      company: { en: 'TechCorp', fr: 'TechCorp' },
      role: { en: 'Senior Fullstack Developer', fr: 'Développeuse Fullstack Senior' },
      type: { en: 'Permanent', fr: 'CDI' },
      workType: 'work',                // 'work' (blue badge) | 'experience' (violet badge)
      period: { en: '2022 - Present', fr: '2022 - Présent' },
      description: {
        en: 'Led the development of a SaaS platform used by 10k+ users. Built microservices architecture and modern React frontend.',
        fr: 'Direction du développement d\'une plateforme SaaS utilisée par 10k+ utilisateurs. Architecture microservices et frontend React moderne.',
      },
      // techs: plain strings OR objects with optional href / tooltip
      techs: [
        'React',
        'TypeScript',
        'Node.js',
        { name: 'pg', tooltip: 'PostgreSQL' },           // tooltip used as display text + color key
        { name: 'Docker', href: 'https://docker.com' }, // badge links out on click
        'AWS',
      ],
      isHighlighted: true,
      details: {
        context: {
          en: 'Team of 8 developers within a 50-person product company. Agile/Scrum methodology with 2-week sprints, CI/CD pipeline with GitHub Actions, code reviews on every PR.',
          fr: 'Équipe de 8 développeurs au sein d\'une société produit de 50 personnes. Méthodologie Agile/Scrum avec sprints de 2 semaines, pipeline CI/CD avec GitHub Actions, code review sur chaque PR.',
        },
        tasks: {
          en: [
            'Designed and implemented the frontend architecture (monorepo, shared component library)',
            'Built a real-time notification system using WebSockets and Redis pub/sub',
            'Migrated legacy codebase from JavaScript to TypeScript (200+ files)',
            'Implemented role-based access control (RBAC) across the entire platform',
            'Set up automated testing with 85% code coverage (unit, integration, E2E)',
            'Led the migration from REST to GraphQL for the main API',
            'Built a dashboard analytics module with interactive charts and export features',
            'Mentored 3 junior developers through pair programming and weekly 1-on-1s',
          ],
          fr: [
            'Conception et implémentation de l\'architecture frontend (monorepo, bibliothèque de composants partagés)',
            'Création d\'un système de notifications temps réel via WebSockets et Redis pub/sub',
            'Migration du code legacy de JavaScript vers TypeScript (200+ fichiers)',
            'Implémentation d\'un contrôle d\'accès basé sur les rôles (RBAC) sur toute la plateforme',
            'Mise en place de tests automatisés avec 85% de couverture (unitaires, intégration, E2E)',
            'Pilotage de la migration de REST vers GraphQL pour l\'API principale',
            'Développement d\'un module de tableau de bord analytique avec graphiques interactifs et export',
            'Mentorat de 3 développeurs juniors via pair programming et 1-on-1 hebdomadaires',
          ],
        },
        training: {
          en: [
            'AWS Solutions Architect certification',
            'Internal training on Kubernetes orchestration',
          ],
          fr: [
            'Certification AWS Solutions Architect',
            'Formation interne sur l\'orchestration Kubernetes',
          ],
        },
        env: {
          en: 'React / TypeScript / Node.js / PostgreSQL / GraphQL / Redis / Docker / AWS / GitHub Actions / Datadog',
          fr: 'React / TypeScript / Node.js / PostgreSQL / GraphQL / Redis / Docker / AWS / GitHub Actions / Datadog',
        },
      },
    },
    {
      id: 'company-b',
      href: 'https://webagency.example.com',
      company: { en: 'WebAgency', fr: 'WebAgency' },
      role: { en: 'Frontend Developer', fr: 'Développeuse Frontend' },
      type: { en: 'Permanent', fr: 'CDI' },
      workType: 'work',
      period: { en: '2019 - 2022', fr: '2019 - 2022' },
      description: {
        en: 'Developed responsive web applications for various clients. Specialized in React and Angular projects.',
        fr: 'Développement d\'applications web responsives pour divers clients. Spécialisée en projets React et Angular.',
      },
      techs: ['React', 'Angular', 'TypeScript', 'SCSS'],
      details: {
        context: {
          en: 'Digital agency with 20+ clients across various industries (retail, finance, healthcare). Team of 12 developers, working on 3-4 projects simultaneously.',
          fr: 'Agence digitale avec 20+ clients dans différents secteurs (retail, finance, santé). Équipe de 12 développeurs, travaillant sur 3-4 projets simultanément.',
        },
        tasks: {
          en: [
            'Built 15+ client-facing web applications from scratch',
            'Created and maintained a shared design system used across all agency projects',
            'Implemented complex form workflows with multi-step validation',
            'Optimized web performance achieving 90+ scores on Core Web Vitals',
            'Integrated third-party APIs (payment, CRM, analytics)',
            'Set up Storybook documentation for reusable components',
            'Collaborated closely with UX designers to translate Figma mockups into pixel-perfect UIs',
          ],
          fr: [
            'Développement de 15+ applications web clients from scratch',
            'Création et maintenance d\'un design system partagé utilisé sur tous les projets de l\'agence',
            'Implémentation de workflows de formulaires complexes avec validation multi-étapes',
            'Optimisation des performances web avec scores 90+ sur les Core Web Vitals',
            'Intégration d\'APIs tierces (paiement, CRM, analytics)',
            'Mise en place de la documentation Storybook pour les composants réutilisables',
            'Collaboration étroite avec les designers UX pour traduire les maquettes Figma en interfaces pixel-perfect',
          ],
        },
        training: {
          en: [
            'Angular Advanced workshop (2 days)',
            'Accessibility (WCAG 2.1) certification',
          ],
          fr: [
            'Workshop Angular Avancé (2 jours)',
            'Certification Accessibilité (WCAG 2.1)',
          ],
        },
        env: {
          en: 'React / Angular / TypeScript / SCSS / Tailwind CSS / Storybook / Figma / GitLab CI',
          fr: 'React / Angular / TypeScript / SCSS / Tailwind CSS / Storybook / Figma / GitLab CI',
        },
      },
    },
    {
      id: 'internship',
      company: { en: 'StartupXYZ', fr: 'StartupXYZ' },
      role: { en: 'Fullstack Developer Intern', fr: 'Stagiaire Développeuse Fullstack' },
      type: { en: 'Internship', fr: 'Stage' },
      workType: 'experience',          // violet badge – non-employment experience
      period: { en: '2018 - 2019', fr: '2018 - 2019' },
      description: {
        en: 'Contributed to the development of an e-commerce platform. Gained experience in fullstack development.',
        fr: 'Contribution au développement d\'une plateforme e-commerce. Acquisition d\'expérience en développement fullstack.',
      },
      techs: ['React', 'Node.js', 'MongoDB', 'Machine Learning'],
      details: {
        context: {
          en: 'Early-stage startup (seed round), small team of 5 developers building an e-commerce platform from the ground up. Fast-paced environment with weekly releases.',
          fr: 'Startup en phase de démarrage (seed round), petite équipe de 5 développeurs construisant une plateforme e-commerce from scratch. Environnement rapide avec des releases hebdomadaires.',
        },
        tasks: {
          en: [
            'Developed the product catalog with advanced filtering and search',
            'Built the shopping cart with real-time inventory checking',
            'Integrated Stripe payment gateway with 3D Secure support',
            'Implemented user authentication with JWT and OAuth (Google, Facebook)',
            'Created an admin dashboard for order management and analytics',
            'Wrote API documentation with Swagger/OpenAPI',
          ],
          fr: [
            'Développement du catalogue produits avec filtrage avancé et recherche',
            'Création du panier d\'achat avec vérification de stock en temps réel',
            'Intégration de la passerelle de paiement Stripe avec support 3D Secure',
            'Implémentation de l\'authentification utilisateur avec JWT et OAuth (Google, Facebook)',
            'Création d\'un tableau de bord admin pour la gestion des commandes et les analytics',
            'Rédaction de la documentation API avec Swagger/OpenAPI',
          ],
        },
        env: {
          en: 'React / Node.js / Express / MongoDB / Stripe / JWT / Docker / Heroku',
          fr: 'React / Node.js / Express / MongoDB / Stripe / JWT / Docker / Heroku',
        },
      },
    },
  ],

  // ===== PROJECTS (optional) =====
  projects: [
    {
      id: 'project-a',
      title: { en: 'WeatherApp', fr: 'WeatherApp' },
      description: {
        en: 'A real-time weather dashboard built with React and OpenWeather API.',
        fr: 'Un tableau de bord météo en temps réel construit avec React et l\'API OpenWeather.',
      },
      // project techs support the same string / object format
      techs: [
        'React',
        { name: 'TypeScript', href: 'https://typescriptlang.org' },
      ],
      url: 'https://weather-app.example.com',
      github: 'https://github.com/janedoe/weather-app',
    },
    {
      id: 'project-b',
      title: { en: 'TaskManager', fr: 'TaskManager' },
      description: {
        en: 'A Kanban-style task management tool with drag-and-drop.',
        fr: 'Un outil de gestion de tâches style Kanban avec glisser-déposer.',
      },
      techs: ['React', 'Node.js', 'PostgreSQL'],
      github: 'https://github.com/janedoe/task-manager',
    },
  ],

  // ===== EDUCATION =====
  education: [
    {
      school: { en: 'University of Paris', fr: 'Université de Paris' },
      degree: { en: 'Master in Computer Science', fr: 'Master Informatique' },
      degreeHref: 'https://example.com/master-cs', // clicking the degree text opens this URL
      specialty: { en: 'Web & Mobile Development', fr: 'Développement Web & Mobile' },
      period: '2017 - 2019',
      // education techs: same string / object format
      techs: [
        'Python',
        { name: 'Java', href: 'https://java.com' },
        { name: 'gh-actions', tooltip: 'GitHub Actions' }, // tooltip as color key + display text
        'Docker',
      ],
    },
    {
      school: { en: 'University of Paris', fr: 'Université de Paris' },
      degree: { en: 'Bachelor in Computer Science', fr: 'Licence Informatique' },
      period: '2014 - 2017',
    },
  ],

  // ===== HOBBIES (optional) =====
  hobbies: [
    {
      title: { en: 'Photography', fr: 'Photographie' },
      details: [
        { en: 'Street photography', fr: 'Photo de rue' },
        { en: '5 years', fr: '5 ans' },
      ],
    },
    {
      title: { en: 'Hiking', fr: 'Randonnée' },
      details: [
        { en: 'Mountain trails', fr: 'Sentiers de montagne' },
      ],
    },
    {
      title: { en: 'Open Source', fr: 'Open Source' },
    },
    {
      title: { en: 'Guitar', fr: 'Guitare' },
      details: [
        { en: '3 years', fr: '3 ans' },
      ],
    },
  ],

  // ===== PDF (optional — place your PDF in public/cv/) =====
  // Use a string for the same PDF in all languages,
  // or a LocalizedString for one PDF per language (button is hidden if no PDF for the current language).
  pdf: {
    label: { en: 'Download PDF', fr: 'Télécharger le PDF' },
    path: { en: '/cv/resume-en.pdf', fr: '/cv/resume-fr.pdf' },
  },

  // ===== THEME =====
  theme: {
    preset: 'warm', // 'minimal' | 'warm' | 'ocean' | 'forest' | 'slate' | 'lilac'
    // You can override individual colors:
    // colors: {
    //   primary: '#8B5A2B',
    //   primaryLight: '#D4A574',
    // },
  },

  // ===== SECTION LIMITS (optional) =====
  // Control how many items are shown before a "Show more" button appears.
  // Remove any key (or omit the whole `limits` block) to show all items in that section.
  // limits: {
  //   experiences: 3,           // max experiences shown initially
  //   experienceTasks: 5,        // max tasks shown per experience (in expanded view)
  //   experienceTraining: 3,     // max training items shown per experience
  //   experienceTechs: 4,        // max tech badges shown per experience card
  //   projects: 3,               // max projects shown initially
  //   educationTechs: 5,         // max tech badges per education entry
  //   hobbies: 4,                // max hobbies shown initially
  //   skills: 4,                 // max skill categories shown initially
  //   skillItems: 5,             // max items per skill category shown initially
  //   contact: 4,                // max contact items shown initially
  // },

  // ===== UI LABELS =====
  labels: {
    sections: {
      contact: { en: 'CONTACT', fr: 'CONTACT' },
      skills: { en: 'SKILLS', fr: 'COMPÉTENCES' },
      experience: { en: 'PROFESSIONAL EXPERIENCE', fr: 'EXPÉRIENCES PROFESSIONNELLES' },
      education: { en: 'EDUCATION', fr: 'FORMATION' },
      projects: { en: 'PROJECTS', fr: 'PROJETS' },
      hobbies: { en: 'HOBBIES', fr: 'LOISIRS' },
    },
    experience: {
      mainTasks: { en: 'Main tasks:', fr: 'Tâches principales :' },
      moreTasks: { en: 'more tasks...', fr: 'autres tâches...' },
      moreTraining: { en: 'more training...', fr: 'autres formations...' },
      training: { en: 'Training:', fr: 'Formations :' },
      techEnv: { en: 'Tech environment:', fr: 'Env. technique :' },
      technologies: { en: 'Technologies', fr: 'Technologies' },
    },
    actions: {
      clickHint: { en: 'Click on experiences to see more details', fr: 'Cliquez sur les expériences pour voir plus de détails' },
      switchTheme: { en: 'Toggle dark mode', fr: 'Changer le thème' },
      downloadPdf: { en: 'Download PDF', fr: 'Télécharger le PDF' },
      showMore: { en: 'Show more', fr: 'Voir plus' },
      showLess: { en: 'Show less', fr: 'Voir moins' },
    },
  },
}

// ===== APP-LEVEL LABELS (Hero, Generate, NotFound pages) =====
// These are not part of the CV content and should not be included in resumeConfig.

export const appLabels: AppLabels = {
  hero: {
      badge: { en: 'Open Source & Free', fr: 'Open Source & Gratuit' },
      title: { en: 'Create Your', fr: 'Créez Votre' },
      subtitle: { en: 'Interactive Resume', fr: 'CV Interactif' },
      description: { 
        en: 'Beautiful, modern, and fully customizable resume template. Host your resume configuration anywhere and share it with encoded links.',
        fr: 'Modèle de CV magnifique, moderne et entièrement personnalisable. Hébergez votre configuration de CV n\'importe où et partagez-la avec des liens encodés.'
      },
      getStarted: { en: 'Get Started →', fr: 'Commencer →' },
      viewDemo: { en: 'View Demo', fr: 'Voir la Démo' },
      features: {
        themes: { en: 'Multiple theme presets with dark mode support', fr: 'Plusieurs thèmes prédéfinis avec support du mode sombre' },
        multilang: { en: 'Multi-language support (i18n ready)', fr: 'Support multi-langues (i18n prêt)' },
        privacy: { en: 'Privacy-focused with URL encoding', fr: 'Axé sur la confidentialité avec encodage d\'URL' },
        fast: { en: 'Fast, responsive, and accessible', fr: 'Rapide, réactif et accessible' },
        customTech: { en: 'Custom tech registry support', fr: 'Support de registre technologique personnalisé' },
        mobile: { en: 'Mobile-optimized design', fr: 'Design optimisé pour mobile' },
      },
      whyChoose: { en: 'Why Choose This Template?', fr: 'Pourquoi Choisir Ce Modèle ?' },
      whyDescription: { 
        en: 'Built with modern web technologies and best practices for performance and accessibility',
        fr: 'Construit avec des technologies web modernes et les meilleures pratiques pour la performance et l\'accessibilité'
      },
      featureCards: {
        customizable: {
          title: { en: 'Fully Customizable', fr: 'Entièrement Personnalisable' },
          description: { en: 'Host your resume config anywhere. Update it without touching code.', fr: 'Hébergez votre configuration de CV n\'importe où. Mettez-la à jour sans toucher au code.' },
        },
        privacy: {
          title: { en: 'Privacy First', fr: 'Confidentialité d\'Abord' },
          description: { en: 'Your config URLs are base64 encoded for privacy protection.', fr: 'Vos URLs de configuration sont encodées en base64 pour la protection de la confidentialité.' },
        },
        devFriendly: {
          title: { en: 'Developer Friendly', fr: 'Convivial pour les Développeurs' },
          description: { en: 'Built with React, TypeScript, and Tailwind CSS. Easy to extend.', fr: 'Construit avec React, TypeScript et Tailwind CSS. Facile à étendre.' },
        },
      },
      ctaTitle: { en: 'Ready to Create Your Resume?', fr: 'Prêt à Créer Votre CV ?' },
      ctaDescription: { en: 'Get started in minutes. No signup required.', fr: 'Commencez en quelques minutes. Aucune inscription requise.' },
      ctaButton: { en: 'Generate Your Link Now', fr: 'Générer Votre Lien Maintenant' },
  },
  generateLink: {
      title: { en: 'Generate Resume Link', fr: 'Générer un Lien de CV' },
      description: { 
        en: 'Enter URLs to your resume configuration and optional tech registry JSON files to generate a shareable link. The URLs will be encoded for privacy.',
        fr: 'Entrez les URLs de votre configuration de CV et des fichiers JSON de registre technologique optionnels pour générer un lien partageable. Les URLs seront encodées pour la confidentialité.'
      },
      configUrlLabel: { en: 'Configuration URL', fr: 'URL de Configuration' },
      configUrlRequired: { en: '*', fr: '*' },
      techRegistryLabel: { en: 'Tech Registry URL', fr: 'URL du Registre Technologique' },
      techRegistryOptional: { en: '(Optional)', fr: '(Optionnel)' },
      techRegistryNote: { en: 'If not provided, the default tech registry will be used', fr: 'Si non fourni, le registre technologique par défaut sera utilisé' },
      generateButton: { en: 'Generate Link', fr: 'Générer le Lien' },
      generatedLinkLabel: { en: 'Generated Link', fr: 'Lien Généré' },
      copyButton: { en: 'Copy', fr: 'Copier' },
      copiedButton: { en: 'Copied!', fr: 'Copié !' },
      backToResume: { en: '← Back to Resume', fr: '← Retour au CV' },
      jsonExamples: { en: 'JSON Examples', fr: 'Exemples JSON' },
      resumeConfigExample: { en: 'Resume Configuration Example', fr: 'Exemple de Configuration de CV' },
      resumeConfigDescription: { en: 'Complete example of a resume config JSON file', fr: 'Exemple complet d\'un fichier JSON de configuration de CV' },
      techRegistryExample: { en: 'Tech Registry Example', fr: 'Exemple de Registre Technologique' },
      techRegistryDescription: { en: 'Example of a custom tech registry with colors (optional)', fr: 'Exemple de registre technologique personnalisé avec couleurs (optionnel)' },
      copyJson: { en: 'Copy JSON', fr: 'Copier JSON' },
      alertConfigRequired: { en: 'Please enter a valid configuration URL', fr: 'Veuillez entrer une URL de configuration valide' },
      alertInvalidUrl: { en: 'Please enter valid URL formats', fr: 'Veuillez entrer des formats d\'URL valides' },
      alertCopyFailed: { en: 'Failed to copy to clipboard', fr: 'Échec de la copie dans le presse-papiers' },
      alertJsonCopied: { en: 'example copied to clipboard!', fr: 'exemple copié dans le presse-papiers !' },
  },
  notFound: {
      title: { en: '404', fr: '404' },
      subtitle: { en: 'Page Not Found', fr: 'Page Non Trouvée' },
      description: { en: 'Oops! The page you\'re looking for doesn\'t exist or has been moved.', fr: 'Oups ! La page que vous recherchez n\'existe pas ou a été déplacée.' },
      goHome: { en: 'Go to Home', fr: 'Aller à l\'Accueil' },
      viewResume: { en: 'View Resume Demo', fr: 'Voir la Démo du CV' },
      lookingFor: { en: 'Looking for something specific?', fr: 'Vous cherchez quelque chose de spécifique ?' },
      generateLink: { en: 'Generate Link', fr: 'Générer un Lien' },
      github: { en: 'GitHub', fr: 'GitHub' },
      documentation: { en: 'Documentation', fr: 'Documentation' },
      proTip: { en: 'Pro Tip:', fr: 'Astuce :' },
      proTipText: { 
        en: 'You can create your own custom resume by hosting a JSON config file and generating a shareable link in the Generate page!',
        fr: 'Vous pouvez créer votre propre CV personnalisé en hébergeant un fichier de configuration JSON et en générant un lien partageable dans la page Générer !'
      },
  },
}
