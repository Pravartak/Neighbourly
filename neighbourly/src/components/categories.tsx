"use client"

import { Package, Cpu, ShoppingBag, GraduationCap } from "lucide-react"

const categories = [
  {
    icon: Package,
    name: "Delivery",
    description: "Package pickups & drop-offs",
    questCount: 234,
    bgHover: "hover:bg-blue-500/10",
    borderHover: "hover:border-blue-500/50",
    iconColor: "text-blue-400",
  },
  {
    icon: Cpu,
    name: "Tech Help",
    description: "Setup, repairs & troubleshooting",
    questCount: 156,
    bgHover: "hover:bg-primary/10",
    borderHover: "hover:border-primary/50",
    iconColor: "text-primary",
  },
  {
    icon: ShoppingBag,
    name: "Errands",
    description: "Shopping, tasks & odd jobs",
    questCount: 312,
    bgHover: "hover:bg-accent/10",
    borderHover: "hover:border-accent/50",
    iconColor: "text-accent",
  },
  {
    icon: GraduationCap,
    name: "Tutoring",
    description: "Academic help & skill sharing",
    questCount: 98,
    bgHover: "hover:bg-emerald-500/10",
    borderHover: "hover:border-emerald-500/50",
    iconColor: "text-emerald-400",
  },
]

export function Categories() {
  return (
    <section id="post" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Quest Categories
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Find missions that match your skills and interests
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`group relative overflow-hidden rounded border border-border/50 bg-card/60 backdrop-blur-sm p-6 text-left transition-all duration-300 ${category.borderHover} ${category.bgHover} hover:-translate-y-1 hover:shadow-lg`}
            >
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`flex h-12 w-12 items-center justify-center rounded border border-border/50 bg-background/50 mb-4 transition-all group-hover:scale-110 ${category.iconColor}`}>
                  <category.icon className="h-6 w-6" />
                </div>

                {/* Text */}
                <h3 className="font-semibold text-foreground mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {category.description}
                </p>

                {/* Quest Count */}
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{category.questCount}</span> active quests
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
