// Example JSON templates for the generate page

export const exampleResumeConfig = {
  "personal": {
    "name": "Jane Doe",
    "photo": "/images/photo.jpg",
    "photoBackEmoji": "👩‍💻",
    "title": {
      "en": "Fullstack Developer",
      "fr": "Développeuse Fullstack"
    },
    "subtitle": {
      "en": "5 years of experience",
      "fr": "5 ans d'expérience"
    },
    "location": "San Francisco, USA"
  },
  "seo": {
    "title": "Jane Doe — Fullstack Developer",
    "description": "Interactive resume of Jane Doe, Fullstack Developer"
  },
  "languages": {
    "default": "en",
    "available": ["en", "fr"],
    "labels": {
      "en": "EN",
      "fr": "FR"
    }
  },
  "contact": [
    {
      "type": "github",
      "label": "janedoe",
      "href": "https://github.com/janedoe"
    },
    {
      "type": "email",
      "label": "jane@example.com",
      "href": "mailto:jane@example.com"
    },
    {
      "type": "linkedin",
      "label": "Jane Doe",
      "href": "https://linkedin.com/in/janedoe"
    }
  ],
  "skills": [
    {
      "title": { "en": "Frontend", "fr": "Frontend" },
      "type": "badges",
      "items": [
        { "name": "React" },
        { "name": "TypeScript" },
        { "name": "Tailwind CSS" }
      ]
    },
    {
      "title": { "en": "Backend", "fr": "Backend" },
      "type": "badges",
      "items": [
        { "name": "Node.js" },
        { "name": "Python" },
        { "name": "PostgreSQL" }
      ]
    }
  ],
  "experiences": [
    {
      "id": "job-1",
      "company": { "en": "Tech Company", "fr": "Tech Company" },
      "role": { "en": "Senior Developer", "fr": "Développeuse Senior" },
      "type": { "en": "Full-time", "fr": "Temps plein" },
      "period": { "en": "2020 - Present", "fr": "2020 - Présent" },
      "description": {
        "en": "Led development of web applications using modern tech stack",
        "fr": "Direction du développement d'applications web avec stack moderne"
      },
      "techs": ["React", "Node.js", "PostgreSQL"],
      "details": {
        "context": {
          "en": "Team of 8 developers in an agile environment",
          "fr": "Équipe de 8 développeurs en environnement agile"
        },
        "tasks": {
          "en": [
            "Architected and implemented frontend components",
            "Built REST APIs with Node.js and Express",
            "Mentored junior developers"
          ],
          "fr": [
            "Conception et implémentation de composants frontend",
            "Création d'APIs REST avec Node.js et Express",
            "Mentorat de développeurs juniors"
          ]
        },
        "env": {
          "en": "React / TypeScript / Node.js / PostgreSQL / Docker",
          "fr": "React / TypeScript / Node.js / PostgreSQL / Docker"
        }
      }
    }
  ],
  "education": [
    {
      "school": { "en": "University of Technology", "fr": "Université de Technologie" },
      "degree": { "en": "Master in Computer Science", "fr": "Master Informatique" },
      "period": "2015 - 2017"
    }
  ],
  "projects": [
    {
      "id": "project-1",
      "title": { "en": "Portfolio Website", "fr": "Site Portfolio" },
      "description": {
        "en": "Personal portfolio built with React and TypeScript",
        "fr": "Portfolio personnel construit avec React et TypeScript"
      },
      "techs": ["React", "TypeScript"],
      "github": "https://github.com/janedoe/portfolio"
    }
  ],
  "pdf": {
    "label": { "en": "Download PDF", "fr": "Télécharger le PDF" },
    "path": { "en": "/cv/resume-en.pdf", "fr": "/cv/resume-fr.pdf" }
  },
  "labels": {
    "sections": {
      "contact": { "en": "CONTACT", "fr": "CONTACT" },
      "skills": { "en": "SKILLS", "fr": "COMPÉTENCES" },
      "experience": { "en": "EXPERIENCE", "fr": "EXPÉRIENCE" },
      "education": { "en": "EDUCATION", "fr": "FORMATION" },
      "projects": { "en": "PROJECTS", "fr": "PROJETS" }
    },
    "experience": {
      "mainTasks": { "en": "Main tasks:", "fr": "Tâches principales :" },
      "moreTasks": { "en": "more tasks...", "fr": "autres tâches..." },
      "techEnv": { "en": "Tech environment:", "fr": "Env. technique :" },
      "technologies": { "en": "Technologies", "fr": "Technologies" }
    },
    "actions": {
      "clickHint": { "en": "Click on experiences to see details", "fr": "Cliquez sur les expériences" },
      "switchTheme": { "en": "Toggle theme", "fr": "Changer le thème" },
      "downloadPdf": { "en": "Download PDF", "fr": "Télécharger le PDF" }
    }
  }
}

export const exampleTechRegistry = {
  "React": { "color": "#61DAFB" },
  "TypeScript": { "color": "#3178C6" },
  "JavaScript": { "color": "#F7DF1E" },
  "Node.js": { "color": "#339933" },
  "Python": { "color": "#3776AB" },
  "PostgreSQL": { "color": "#4169E1" },
  "MongoDB": { "color": "#47A248" },
  "Docker": { "color": "#2496ED" },
  "Kubernetes": { "color": "#326CE5" },
  "AWS": { "color": "#FF9900" },
  "Tailwind CSS": { "color": "#06B6D4" },
  "Vue": { "color": "#4FC08D" },
  "Angular": { "color": "#DD0031" },
  "Next.js": { "color": "#000000" },
  "GraphQL": { "color": "#E10098" },
  "Redis": { "color": "#DC382D" },
  "Go": { "color": "#00ADD8" },
  "Rust": { "color": "#DEA584" },
  "Java": { "color": "#007396" },
  "Spring Boot": { "color": "#6DB33F" }
}
