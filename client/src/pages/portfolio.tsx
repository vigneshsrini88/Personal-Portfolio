import { useEffect } from "react";
import SidebarNavigation from "@/components/sidebar-navigation";
import OverviewSection from "@/components/overview-section";
import ExperienceSection from "@/components/experience-section";
import DocumentsSection from "@/components/documents-section";
import ApiDocsSection from "@/components/api-docs-section";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";
import AiChatSidebar from "@/components/ai-chat-sidebar";

export default function Portfolio() {
  useEffect(() => {
    document.title = "Vignesh Srinivasan - Lead Technical Writer & Documentation Leader";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Experienced documentation leader with 13+ years in technical writing, specializing in transforming content ecosystems, managing cross-functional teams, and driving scalable, user-focused documentation strategies.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Experienced documentation leader with 13+ years in technical writing, specializing in transforming content ecosystems, managing cross-functional teams, and driving scalable, user-focused documentation strategies.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNavigation />
      
      <main className="flex-1 ml-64 mr-80">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <OverviewSection />
          <ExperienceSection />
          <DocumentsSection />
          <ApiDocsSection />
          <SkillsSection />
          <ContactSection />
        </div>
      </main>
      
      <AiChatSidebar />
    </div>
  );
}
