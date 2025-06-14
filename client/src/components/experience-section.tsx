import { useQuery } from "@tanstack/react-query";
import { CheckCircle, ChevronDown, ChevronUp, Building2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Experience } from "@shared/schema";

// Timeline data based on your resume
const timelineData = [
  { year: "2023-Present", company: "Ushur", role: "Lead Technical Writer", id: "ushur" },
  { year: "2022-2023", company: "Nokia", role: "Lead Technical Writer", id: "nokia" },
  { year: "2017-2022", company: "Trane Technologies", role: "Senior Technical Writer", id: "trane" },
  { year: "2016-2017", company: "Benefitalign", role: "Technical Writer", id: "benefitalign" },
  { year: "2013-2016", company: "Lionbridge Technologies", role: "Technical Writer", id: "lionbridge" },
  { year: "2009-2012", company: "Albatross Flying Systems", role: "Aircraft Technician", id: "albatross" },
];

const scrollToExperience = (experienceId: string) => {
  const element = document.getElementById(`experience-${experienceId}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.classList.add('ring-2', 'ring-primary', 'ring-opacity-50');
    setTimeout(() => {
      element.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50');
    }, 2000);
  }
};

export default function ExperienceSection() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  
  const { data: experiences, isLoading, error } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  if (error) {
    return (
      <section id="experience" className="mb-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">Professional Experience</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">Failed to load experience data. Please try again later.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="experience" className="mb-16">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">Professional Experience</h2>
      
      {/* Interactive Timeline */}
      <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-primary" />
          Career Timeline
        </h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-blue-300"></div>
          
          <div className="space-y-4">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className="relative pl-10 cursor-pointer group"
                onClick={() => scrollToExperience(item.id)}
              >
                {/* Timeline dot */}
                <div className="absolute left-2 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform"></div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-primary transition-colors">
                        {item.role}
                      </h4>
                      <p className="text-primary font-medium flex items-center mt-1">
                        <Building2 className="w-4 h-4 mr-1" />
                        {item.company}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground bg-gray-50 px-3 py-1 rounded-full">
                      {item.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-4 w-24 mt-2 md:mt-0" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          experiences?.map((experience) => {
            const isExpanded = expandedCards.has(experience.id);
            const displayedAchievements = isExpanded ? experience.achievements : experience.achievements.slice(0, 3);
            const hasMoreAchievements = experience.achievements.length > 3;
            
            return (
              <Card 
                key={experience.id} 
                id={`experience-${experience.company.toLowerCase().replace(/\s+/g, '')}`}
                className="hover:shadow-md transition-all duration-300"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{experience.title}</h3>
                      <p className="text-primary font-medium">{experience.company}</p>
                    </div>
                    <div className="text-muted-foreground text-sm mt-2 md:mt-0">
                      {experience.duration}
                      {experience.current && (
                        <span className="ml-2 bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-muted-foreground">
                    {displayedAchievements.map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="text-emerald-500 mt-1 w-4 h-4 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {hasMoreAchievements && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(experience.id)}
                        className="text-primary hover:text-primary/80"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-2" />
                            View Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-2" />
                            View More ({experience.achievements.length - 3} more achievements)
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </section>
  );
}
