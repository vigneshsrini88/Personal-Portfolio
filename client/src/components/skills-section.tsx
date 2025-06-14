import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { Skill } from "@shared/schema";

export default function SkillsSection() {
  const { data: skills, isLoading, error } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (error) {
    return (
      <section id="skills" className="mb-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">Technical Skills</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">Failed to load skills data. Please try again later.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="skills" className="mb-16">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">Technical Skills</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardContent className="pt-6">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, skillIndex) => (
                    <div key={skillIndex} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-2 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          Object.entries(groupedSkills || {}).map(([category, categorySkills]) => (
            <Card key={category}>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">{category}</h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{skill.name}</span>
                      <div className="flex items-center space-x-2">
                        <Progress 
                          value={skill.proficiency} 
                          className="w-24 h-2"
                        />
                        <span className="text-xs text-muted-foreground w-16 text-right">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
