"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Coins, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const scrollToQuests = () => {
    const element = document.getElementById("featured-quests")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-primary/5" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium rounded-full border border-primary/30 bg-primary/10 text-primary">
              <Sparkles className="h-3 w-3" />
              <span>New quests available nearby</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-balance">
              Turn Everyday Tasks Into{" "}
              <span className="text-primary text-glow">
                Quests
              </span>
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 text-pretty">
              Help people nearby, complete small missions, and earn rewards in your neighborhood. 
              Every task is an adventure waiting to happen.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                onClick={scrollToQuests}
                className="bg-primary text-primary-foreground font-semibold glow-green hover:scale-105 transition-transform"
              >
                Explore Quests
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/quests">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-muted hover:border-primary/50 transition-colors"
                >
                  Browse All Quests
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-glow-gold text-accent">2.4K+</div>
                <div className="text-xs text-muted-foreground">Active Quests</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-glow">8.1K+</div>
                <div className="text-xs text-muted-foreground">Questers</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-glow-gold text-accent">$48K</div>
                <div className="text-xs text-muted-foreground">Rewards Earned</div>
              </div>
            </div>
          </div>
          
          {/* Floating Quest Cards */}
          <div className="relative hidden lg:block h-[500px]">
            {/* Card 1 */}
            <div className="absolute top-0 right-0 w-72 animate-float">
              <QuestCardPreview
                title="Grocery Pickup"
                reward={25}
                location="0.3 mi"
                time="30 min"
                difficulty="easy"
              />
            </div>
            
            {/* Card 2 */}
            <div className="absolute top-32 left-0 w-72 animate-float-delayed">
              <QuestCardPreview
                title="Tech Support"
                reward={50}
                location="0.8 mi"
                time="1 hr"
                difficulty="medium"
              />
            </div>
            
            {/* Card 3 */}
            <div className="absolute bottom-0 right-12 w-72 animate-float-delayed-2">
              <QuestCardPreview
                title="Moving Help"
                reward={100}
                location="1.2 mi"
                time="3 hrs"
                difficulty="hard"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuestCardPreview({
  title,
  reward,
  location,
  time,
  difficulty,
}: {
  title: string
  reward: number
  location: string
  time: string
  difficulty: "easy" | "medium" | "hard"
}) {
  const difficultyColors = {
    easy: "bg-easy/20 text-easy border-easy/30",
    medium: "bg-medium/20 text-medium border-medium/30",
    hard: "bg-hard/20 text-hard border-hard/30",
  }

  return (
    <div className="rounded border border-border/50 bg-card/80 backdrop-blur-sm p-4 shadow-lg hover:border-primary/50 transition-all hover:glow-green">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-card-foreground">{title}</h3>
        <span className={`text-xs px-2 py-0.5 rounded border capitalize ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
      </div>
      
      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {time}
        </span>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent glow-gold">
              <Coins className="h-3 w-3 text-accent-foreground" />
            </div>
            <span className="font-bold text-accent">${reward}</span>
          </div>
        <Button size="sm" variant="ghost" className="text-xs hover:text-primary">
          View Quest
        </Button>
      </div>
    </div>
  )
}
