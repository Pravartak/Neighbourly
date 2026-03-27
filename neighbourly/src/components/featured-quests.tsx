"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, MapPin, Clock, Zap } from "lucide-react"
import Link from "next/link"

const quests = [
  {
    id: 1,
    title: "Dog Walking Adventure",
    description: "Take Max for his afternoon walk around the park. He loves meeting other dogs!",
    reward: 20,
    category: "Errands",
    difficulty: "easy" as const,
    location: "0.2 mi",
    time: "45 min",
    status: "Open",
  },
  {
    id: 2,
    title: "WiFi Router Setup",
    description: "Help configure a new mesh WiFi system and optimize network settings.",
    reward: 45,
    category: "Tech Help",
    difficulty: "medium" as const,
    location: "0.5 mi",
    time: "1 hr",
    status: "Open",
  },
  {
    id: 3,
    title: "Grocery Delivery",
    description: "Pick up weekly groceries from the local market and deliver to doorstep.",
    reward: 30,
    category: "Delivery",
    difficulty: "easy" as const,
    location: "0.8 mi",
    time: "1 hr",
    status: "Open",
  },
  {
    id: 4,
    title: "Math Tutoring Session",
    description: "Help a high school student with calculus homework and exam prep.",
    reward: 60,
    category: "Tutoring",
    difficulty: "medium" as const,
    location: "1.0 mi",
    time: "2 hrs",
    status: "Open",
  },
  {
    id: 5,
    title: "Furniture Assembly",
    description: "Assemble a new IKEA wardrobe and desk set. Tools provided.",
    reward: 85,
    category: "Errands",
    difficulty: "hard" as const,
    location: "1.5 mi",
    time: "3 hrs",
    status: "Open",
  },
  {
    id: 6,
    title: "Package Pickup",
    description: "Collect a package from the post office and deliver it safely.",
    reward: 15,
    category: "Delivery",
    difficulty: "easy" as const,
    location: "0.3 mi",
    time: "30 min",
    status: "Open",
  },
]

const difficultyConfig = {
  easy: { color: "bg-easy/20 text-easy border-easy/30", label: "Easy" },
  medium: { color: "bg-medium/20 text-medium border-medium/30", label: "Medium" },
  hard: { color: "bg-hard/20 text-hard border-hard/30", label: "Hard" },
}

export function FeaturedQuests() {
  return (
    <section id="featured-quests" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-medium rounded-full border border-secondary/30 bg-secondary/10 text-secondary">
            <Zap className="h-3 w-3" />
            <span>Live quests in your area</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Active Quests Nearby
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Browse available missions in your neighborhood. Accept a quest and start earning rewards today.
          </p>
        </div>

        {/* Quest Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link href="/quests">
            <Button 
              variant="outline" 
              size="lg"
              className="border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              View All Quests
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function QuestCard({ quest }: { quest: typeof quests[0] }) {
  const difficulty = difficultyConfig[quest.difficulty]

  return (
    <div className="group relative rounded border border-border/50 bg-card/60 backdrop-blur-sm p-5 transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20">
      {/* Status Badge */}
      <div className="absolute -top-2 -right-2">
        <Badge className="bg-easy/20 text-easy border border-easy/30 text-xs font-medium">
          {quest.status}
        </Badge>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-semibold text-card-foreground leading-tight">{quest.title}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {quest.description}
      </p>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {quest.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {quest.time}
        </span>
        <Badge variant="outline" className="text-xs font-normal">
          {quest.category}
        </Badge>
      </div>

      {/* Difficulty & Reward */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <span className={`text-xs px-2 py-1 rounded border ${difficulty.color}`}>
          {difficulty.label}
        </span>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent shadow-sm group-hover:glow-gold transition-all">
              <Coins className="h-3 w-3 text-accent-foreground" />
            </div>
            <span className="font-bold text-accent">${quest.reward}</span>
          </div>
        </div>
      </div>

      {/* Accept Button */}
      <Button 
        className="w-full mt-4 bg-primary/80 text-primary-foreground font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary"
      >
        Accept Quest
      </Button>
    </div>
  )
}
