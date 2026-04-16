import { 
  Cloud, 
  Code, 
  Server, 
  GitBranch, 
  Database, 
  Shield,
  Sparkles,
  ArrowRight
} from "lucide-react"

const services = [
  {
    icon: Server,
    title: "On-Premise & Cloud",
    description: "Seamless infrastructure solutions for both on-premise deployments and cloud environments. We ensure your systems run efficiently wherever they are hosted.",
    features: ["Hybrid Cloud", "Infrastructure Design", "Migration Services"],
  },
  {
    icon: Code,
    title: "Programming",
    description: "Custom software development tailored to your business needs. Our expert developers build scalable, maintainable applications using modern technologies.",
    features: ["Web Applications", "Mobile Apps", "API Development"],
  },
  {
    icon: Cloud,
    title: "Hosting",
    description: "Reliable and secure hosting solutions with guaranteed uptime. We manage your infrastructure so you can focus on growing your business.",
    features: ["Managed Hosting", "CDN Integration", "Auto-Scaling"],
  },
  {
    icon: GitBranch,
    title: "DevOps",
    description: "Streamline your development lifecycle with our DevOps expertise. From CI/CD pipelines to infrastructure automation, we accelerate your delivery.",
    features: ["CI/CD Pipelines", "Container Orchestration", "IaC"],
  },
  {
    icon: Database,
    title: "Big Data",
    description: "Transform your data into actionable insights. We help you collect, process, and analyze large datasets to drive data-driven decisions.",
    features: ["Data Pipelines", "Analytics", "Data Warehousing"],
  },
  {
    icon: Shield,
    title: "Security",
    description: "Protect your digital assets with our comprehensive security services. We implement robust security measures to safeguard your business.",
    features: ["Penetration Testing", "Compliance", "Incident Response"],
  },
]

const comingSoon = {
  icon: Sparkles,
  title: "AI Tools",
  description: "Revolutionary AI-powered tools designed to automate workflows, enhance productivity, and unlock new possibilities for your business.",
  features: ["Coming Soon", "Custom AI Solutions", "Intelligent Automation"],
}

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-3">What We Do</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Comprehensive IT Services for Your Digital Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore how we help businesses transform through technology
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <a 
                href="#contact" 
                className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
              >
                Learn more
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        {/* Coming Soon - AI Tools */}
        <div className="mt-12 relative p-8 rounded-xl border border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
            Coming Soon
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <comingSoon.icon className="w-8 h-8 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-2">{comingSoon.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {comingSoon.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
              {comingSoon.features.slice(1).map((feature) => (
                <span
                  key={feature}
                  className="text-xs px-3 py-1.5 rounded-md bg-secondary text-muted-foreground"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
