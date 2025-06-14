export default function OverviewSection() {
  return (
    <section id="overview" className="mb-16">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Lead Technical Writer & Documentation Leader
        </h2>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Experienced documentation leader with 13+ years in technical writing, specializing in transforming 
            content ecosystems, managing cross-functional teams, and driving scalable, user-focused 
            documentation strategies. Skilled in structured authoring, AI-powered workflows, and content 
            governance with proven ability to align documentation with product goals and enhance customer experience.
            Beyond technical writing, he's passionate about photography and shares his work at{" "}
            <a href="https://vframephotography.blogspot.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
              VFrame Photography
            </a>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-primary">600+</div>
              <div className="text-sm text-muted-foreground">Structured Articles</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-emerald-600">4</div>
              <div className="text-sm text-muted-foreground">Team Members Managed</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">13+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
