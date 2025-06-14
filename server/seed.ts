import { db } from "./db";
import { experiences, documents, skills } from "@shared/schema";

async function seedDatabase() {
  console.log("Seeding database with Vignesh's portfolio data...");

  // Clear existing data
  await db.delete(skills);
  await db.delete(documents);  
  await db.delete(experiences);

  // Add real experiences from Vignesh's resume
  await db.insert(experiences).values([
    {
      title: "Lead Technical Writer",
      company: "Ushur Inc",
      duration: "December 2023 - Present",
      achievements: [
        "Led complete transformation of documentation strategy, delivering 600+ structured articles across multiple product lines",
        "Managed and mentored a team of 4 technical writers, establishing performance goals and enabling skill growth",
        "Spearheaded migration from Confluence/JIRA to Document360, improving authoring workflows and accessibility",
        "Introduced AI-powered workflows to automate style checks, content validation, and publishing processes",
        "Received the Ushur Customer Impact Award for creating the biggest product or business impact through documentation transformation"
      ],
      current: true
    },
    {
      title: "Senior Customer Documentation Developer",
      company: "Nokia Solutions and Networks India",
      duration: "September 2022 - December 2023",
      achievements: [
        "Created admin guides, API guides, installation guides, troubleshooting guides, and user manuals in Agile environment",
        "Produced video tutorials using Camtasia to assist customers in understanding GUI and product features",
        "Led chatbot team utilizing Azure and Language Studio to convert technical manuals into Q&A pairs",
        "Received Network Infrastructure Quality Award 2023 for contribution to accessibility and customer experience"
      ],
      current: false
    },
    {
      title: "Senior Technical Writer",
      company: "Trane Technologies",
      duration: "August 2017 - September 2022",
      achievements: [
        "Created technical documentation including Parts Manuals, Installation Guides, Service Guides, and Maintenance Manuals",
        "Proficient in DITA concepts and structured authoring using Adobe FrameMaker, Arbortext Editor",
        "Involved in training new hires on products, processes, DITA concepts, and documentation tools",
        "Actively participated in innovative ideas to improve technical documentation and achieve sustainability goals"
      ],
      current: false
    },
    {
      title: "Technical Writer",
      company: "Benefitalign Technologies",
      duration: "March 2016 - July 2017",
      achievements: [
        "Designed software product documentation including User Manuals, Configuration Guides, FAQs, and Command References",
        "Created and revised REST API documents for internal use",
        "Led a 25-member team of Products and Rates, implementing agile methodology to improve performance",
        "Collaborated with geographically distributed development and marketing teams"
      ],
      current: false
    }
  ]);

  // Add real documents from Vignesh's portfolio
  await db.insert(documents).values([
    {
      title: "API Overview Documentation",
      type: "API Guide",
      description: "Comprehensive API documentation showcasing structured endpoint documentation, authentication methods, and implementation examples.",
      pages: 15,
      filePath: "/attached_assets/API Overview.pdf",
      previewUrl: "/attached_assets/API Overview.pdf"
    },
    {
      title: "Sample User Guide V3.0",
      type: "User Guide",
      description: "Professional user guide demonstrating clear step-by-step instructions, feature explanations, and troubleshooting sections.",
      pages: 25,
      filePath: "/attached_assets/Sample_UserGuide_V3.0.pdf",
      previewUrl: "/attached_assets/Sample_UserGuide_V3.0.pdf"
    },
    {
      title: "PaaS Sample Documentation",
      type: "Technical Guide",
      description: "Platform-as-a-Service documentation covering deployment, configuration, and management procedures for enterprise solutions.",
      pages: 20,
      filePath: "/attached_assets/PAAS Sample Doc.pdf",
      previewUrl: "/attached_assets/PAAS Sample Doc.pdf"
    },
    {
      title: "API Week 2 Assignment",
      type: "API Reference",
      description: "Detailed API assignment documentation demonstrating technical writing skills for complex API endpoints and integration patterns.",
      pages: 12,
      filePath: "/attached_assets/API-Week-2-Assign.pdf",
      previewUrl: "/attached_assets/API-Week-2-Assign.pdf"
    }
  ]);

  // Add real skills from Vignesh's resume
  const skillsData = [
    // Documentation Tools
    { category: "Documentation Tools", name: "Adobe FrameMaker", proficiency: 95, level: "Expert" },
    { category: "Documentation Tools", name: "Document360", proficiency: 90, level: "Expert" },
    { category: "Documentation Tools", name: "Arbortext Editor", proficiency: 90, level: "Expert" },
    { category: "Documentation Tools", name: "Adobe RoboHelp", proficiency: 85, level: "Expert" },
    { category: "Documentation Tools", name: "Confluence", proficiency: 85, level: "Expert" },
    { category: "Documentation Tools", name: "JIRA", proficiency: 80, level: "Advanced" },
    { category: "Documentation Tools", name: "Camtasia", proficiency: 80, level: "Advanced" },
    { category: "Documentation Tools", name: "GitHub", proficiency: 75, level: "Advanced" },
    
    // Technical Skills
    { category: "Technical Skills", name: "DITA XML", proficiency: 95, level: "Expert" },
    { category: "Technical Skills", name: "Markdown", proficiency: 90, level: "Expert" },
    { category: "Technical Skills", name: "HTML/XML", proficiency: 85, level: "Expert" },
    { category: "Technical Skills", name: "REST APIs", proficiency: 85, level: "Expert" },
    { category: "Technical Skills", name: "Python", proficiency: 70, level: "Advanced" },
    { category: "Technical Skills", name: "MySQL", proficiency: 65, level: "Advanced" },
    { category: "Technical Skills", name: "Azure Language Studio", proficiency: 75, level: "Advanced" },
    { category: "Technical Skills", name: "Swagger/OpenAPI", proficiency: 80, level: "Advanced" },
    
    // Methodologies
    { category: "Methodologies", name: "Agile/Scrum", proficiency: 90, level: "Expert" },
    { category: "Methodologies", name: "DDLC", proficiency: 85, level: "Expert" },
    { category: "Methodologies", name: "SDLC", proficiency: 80, level: "Advanced" },
    { category: "Methodologies", name: "Structured Authoring", proficiency: 95, level: "Expert" },
    
    // Standards & Guidelines
    { category: "Standards & Guidelines", name: "MSTP", proficiency: 85, level: "Expert" },
    { category: "Standards & Guidelines", name: "Simplified Technical English", proficiency: 80, level: "Advanced" },
    { category: "Standards & Guidelines", name: "ATA 100", proficiency: 75, level: "Advanced" },
    { category: "Standards & Guidelines", name: "ASD S1000D", proficiency: 70, level: "Advanced" }
  ];

  await db.insert(skills).values(skillsData);

  console.log("Database seeded successfully!");
}

seedDatabase().catch(console.error);