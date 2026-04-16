import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 mb-8">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm text-muted-foreground">AI Tools Coming Soon</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight text-balance max-w-4xl mx-auto">
          Intelligent Solutions for
          <span className="block text-accent">Modern Business</span>
        </h1>

        {/* Arabic tagline */}
        <p className="mt-4 text-2xl md:text-3xl text-muted-foreground font-arabic" dir="rtl">
          ذكاء - حلول تقنية متقدمة
        </p>

        {/* Description */}
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          From cloud infrastructure to AI-powered tools, we deliver comprehensive IT solutions 
          that transform your business operations and drive innovation.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/signup" className="w-full sm:w-auto">
            <Button size="lg" className="gap-2 px-8 w-full sm:w-auto">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="#services" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="gap-2 px-8 border-border hover:bg-secondary w-full sm:w-auto">
              Explore Services
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { value: "99.9%", label: "Uptime SLA" },
            { value: "500+", label: "Projects Delivered" },
            { value: "24/7", label: "Support Available" },
            { value: "50+", label: "Expert Engineers" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
