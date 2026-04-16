import { CheckCircle } from "lucide-react"

const values = [
  {
    title: "Innovation First",
    description: "We stay ahead of technology trends to deliver cutting-edge solutions that give your business a competitive edge.",
  },
  {
    title: "Client Partnership",
    description: "We work as an extension of your team, understanding your unique challenges and goals to deliver tailored solutions.",
  },
  {
    title: "Excellence in Delivery",
    description: "Our commitment to quality ensures every project meets the highest standards of performance and reliability.",
  },
  {
    title: "Continuous Growth",
    description: "We invest in our people and processes, constantly improving to serve you better.",
  },
]

const highlights = [
  "Certified cloud professionals",
  "Agile development methodology",
  "24/7 monitoring and support",
  "Transparent communication",
  "Scalable solutions",
  "Security-first approach",
]

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Content */}
          <div>
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-3">About Zakaa</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-6">
              Where Deep Tech Meets{" "}
              <span className="text-accent">Human Mindset</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Zakaa (ذكاء) embodies our approach to technology. 
              We combine deep technical expertise with a human-centric mindset to deliver 
              solutions that truly transform businesses.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our team of passionate technologists brings together decades of combined experience 
              across cloud computing, software development, security, and data analytics. We don&apos;t 
              just implement technology – we architect intelligent solutions that grow with your business.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Values */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold">{(index + 1).toString().padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
