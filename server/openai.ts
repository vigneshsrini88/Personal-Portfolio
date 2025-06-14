import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || ""
});

export async function generateAIResponse(userMessage: string): Promise<string> {
  try {
    if (!process.env.OPENAI_API_KEY && !process.env.VITE_OPENAI_API_KEY) {
      return "I'm sorry, the AI assistant is currently unavailable. Please contact Vignesh directly for any questions about his portfolio.";
    }

    const systemPrompt = `You are an AI assistant representing Vignesh Srinivasan, a Lead Technical Writer and documentation specialist. Your role is to answer questions about his professional background, experience, skills, and work samples based on the following information:

PROFESSIONAL BACKGROUND:
- 13+ years of technical writing experience across telecommunications, networking, HVAC, and aerospace domains
- Lead Technical Writer at Ushur Inc (December 2023-Present)
- Senior Customer Documentation Developer at Nokia Solutions and Networks India (September 2022-December 2023)
- Senior Technical Writer at Trane Technologies (August 2017-September 2022)
- Technical Writer at Benefitalign Technologies (March 2016-July 2017)
- Technical Author at Lionbridge Technologies (May 2013-March 2016)
- Aircraft Maintenance background (2009-2011)

KEY ACHIEVEMENTS:
- Led complete transformation of documentation strategy, delivering 600+ structured articles across multiple product lines
- Managed and mentored a team of 4 technical writers, establishing performance goals and enabling skill growth
- Received Ushur Customer Impact Award for creating biggest product impact through documentation transformation
- Spearheaded migration from Confluence/JIRA to Document360, improving authoring workflows
- Introduced AI-powered workflows to automate style checks, content validation, and publishing processes
- Received Network Infrastructure Quality Award 2023 for contribution to accessibility and customer experience
- Led chatbot team utilizing Azure and Language Studio to convert technical manuals into Q&A pairs

TECHNICAL SKILLS:
Documentation Tools: Adobe FrameMaker (Expert), Document360 (Expert), Arbortext Editor (Expert), Adobe RoboHelp (Expert), Confluence (Expert), JIRA (Advanced), Camtasia (Advanced), GitHub (Advanced)
Technical Knowledge: DITA XML (Expert), Markdown (Expert), HTML/XML (Expert), REST APIs (Expert), Python (Advanced), MySQL (Advanced), Azure Language Studio (Advanced), Swagger/OpenAPI (Advanced)
Methodologies: Agile/Scrum (Expert), DDLC (Expert), SDLC (Advanced), Structured Authoring (Expert)
Standards: MSTP (Expert), Simplified Technical English (Advanced), ATA 100 (Advanced), ASD S1000D (Advanced)

SAMPLE DOCUMENTS:
1. API Overview Documentation - Comprehensive API documentation with structured endpoints and authentication methods
2. Sample User Guide V3.0 - Professional user guide with step-by-step instructions and troubleshooting
3. PaaS Sample Documentation - Platform-as-a-Service documentation for enterprise solutions
4. API Week 2 Assignment - Detailed API assignment demonstrating technical writing for complex integrations

CONTACT INFORMATION:
- Email: vigneshsrini.88@gmail.com
- Phone: +91 9840505539
- LinkedIn: linkedin.com/in/vigneshsrinivasan
- GitHub: github.com/vigneshsrini
- Location: Bengaluru, India
- Photography Blog: https://vframephotography.blogspot.com/ (his hobby is photography)

Please provide helpful, accurate information about Vignesh's qualifications and experience. Be professional, friendly, and encouraging about his capabilities. Highlight his leadership experience, AI-powered workflow expertise, and comprehensive technical writing background. Always use masculine pronouns (he/him/his) when referring to Vignesh. If asked about specific details not provided above, acknowledge the limitation and suggest contacting Vignesh directly.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try asking your question differently.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    
    // Provide helpful fallback responses based on common keywords
    const message = userMessage.toLowerCase();
    
    if (message.includes('api') || message.includes('documentation')) {
      return "Vignesh has extensive experience with API documentation, having worked on comprehensive API references throughout his 13+ year career. He's particularly skilled with REST APIs, OpenAPI specifications, and interactive documentation platforms. You can see examples of his API documentation work in the 'API Documentation' section of this portfolio.";
    } else if (message.includes('tool') || message.includes('software')) {
      return "Vignesh is expert with professional documentation tools including Adobe FrameMaker, Document360, Arbortext Editor, and DITA XML. He also has experience with AI-powered workflows and docs-as-code processes using Git and various authoring platforms. You can view his detailed skill breakdown in the 'Skills' section.";
    } else if (message.includes('experience') || message.includes('background')) {
      return "Vignesh has 13+ years of technical writing experience, currently serving as Lead Technical Writer at Ushur Inc. His proven track record includes managing teams of 4 writers, delivering 600+ structured articles, and winning the Ushur Customer Impact Award for documentation transformation.";
    } else if (message.includes('sample') || message.includes('work') || message.includes('portfolio')) {
      return "You can find several work samples in the 'Sample Documents' section, including user guides, API documentation, PaaS documentation, and technical assignments. Each demonstrates different aspects of his technical writing expertise and leadership capabilities.";
    } else if (message.includes('contact') || message.includes('hire') || message.includes('available')) {
      return "You can contact Vignesh directly at vigneshsrini.88@gmail.com or connect with him on LinkedIn at linkedin.com/in/vigneshsrinivasan. He's always interested in discussing new opportunities and technical writing projects.";
    } else if (message.includes('hobby') || message.includes('photography') || message.includes('personal')) {
      return "Outside of technical writing, Vignesh is passionate about photography! You can check out his photography work at his blog: https://vframephotography.blogspot.com/";
    }
    
    return "I'm having trouble accessing detailed information right now, but I'd be happy to help you learn about Vignesh's technical writing expertise. You can also contact him directly at vigneshsrini.88@gmail.com for specific questions about his experience and availability.";
  }
}
