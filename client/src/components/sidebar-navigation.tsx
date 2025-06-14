import { useEffect, useState } from "react";
import { 
  User, 
  Briefcase, 
  FileText, 
  Code, 
  Settings, 
  Mail,
  Linkedin,
  Github,
  Globe
} from "lucide-react";

const navigationItems = [
  { id: "overview", label: "Overview", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "documents", label: "Sample Documents", icon: FileText },
  { id: "api-docs", label: "API Documentation", icon: Code },
  { id: "skills", label: "Skills", icon: Settings },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function SidebarNavigation() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white border-r border-border z-40 overflow-y-auto">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <img 
            src="/images/profile-pic.jpeg" 
            alt="Vignesh Srinivasan - Lead Technical Writer" 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Vignesh Srinivasan</h1>
            <p className="text-sm text-muted-foreground">Lead Technical Writer</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full text-left transition-colors ${
                    isActive
                      ? "text-primary bg-blue-50 font-medium"
                      : "text-muted-foreground hover:text-slate-800 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-white">
        <div className="flex space-x-3">
          <a 
            href="https://linkedin.com/in/vigneshsrinivasan" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://github.com/vigneshsrini" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="mailto:vigneshsrini.88@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a 
            href="tel:+919840505539"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
