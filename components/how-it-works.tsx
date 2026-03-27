import { Search, Swords, Trophy } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discover Quests",
    description: "Browse available missions near you. Filter by category, difficulty, or reward amount.",
    step: "01",
  },
  {
    icon: Swords,
    title: "Accept Missions",
    description: "Choose quests that match your skills and schedule. Commit to helping your neighbors.",
    step: "02",
  },
  {
    icon: Trophy,
    title: "Complete & Earn",
    description: "Finish the task, get verified, and collect your rewards. Level up your reputation!",
    step: "03",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-24 bg-primary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            How It Works
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Start your questing journey in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative text-center"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-border" />
              )}

              {/* Icon Container */}
              <div className="relative inline-flex mb-6">
                <div className="flex h-24 w-24 items-center justify-center rounded border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/50 group-hover:bg-card/80 group-hover:glow-green group-hover:scale-105">
                  <step.icon className="h-10 w-10 text-primary transition-transform group-hover:scale-110" />
                </div>
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.step}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
