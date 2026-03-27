"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  Search, 
  Coins, 
  MapPin, 
  Clock, 
  ShoppingBag, 
  TreePine, 
  Palette, 
  GraduationCap, 
  AlertTriangle,
  SlidersHorizontal,
  X
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Quest data
const allQuests = [
  {
    id: 1,
    title: "Dog Walking Adventure",
    description: "Take Max for his afternoon walk around the park. He loves meeting other dogs!",
    reward: 20,
    category: "Errands",
    difficulty: "easy" as const,
    location: "0.2 mi",
    time: "45 min",
    status: "open" as const,
  },
  {
    id: 2,
    title: "Community Garden Cleanup",
    description: "Help clear weeds and plant new flowers in the neighborhood community garden.",
    reward: 35,
    category: "Nature",
    difficulty: "easy" as const,
    location: "0.4 mi",
    time: "2 hrs",
    status: "open" as const,
  },
  {
    id: 3,
    title: "Photography Session",
    description: "Take professional photos of a local bakery for their new website and social media.",
    reward: 75,
    category: "Creative",
    difficulty: "medium" as const,
    location: "0.8 mi",
    time: "2 hrs",
    status: "open" as const,
  },
  {
    id: 4,
    title: "Math Tutoring Session",
    description: "Help a high school student with calculus homework and exam prep.",
    reward: 60,
    category: "Learn",
    difficulty: "medium" as const,
    location: "1.0 mi",
    time: "2 hrs",
    status: "open" as const,
  },
  {
    id: 5,
    title: "Emergency Grocery Run",
    description: "Pick up essential groceries for an elderly neighbor who cannot leave home.",
    reward: 40,
    category: "Urgent",
    difficulty: "easy" as const,
    location: "0.3 mi",
    time: "1 hr",
    status: "open" as const,
  },
  {
    id: 6,
    title: "Furniture Assembly",
    description: "Assemble a new IKEA wardrobe and desk set. Tools provided.",
    reward: 85,
    category: "Errands",
    difficulty: "hard" as const,
    location: "1.5 mi",
    time: "3 hrs",
    status: "open" as const,
  },
  {
    id: 7,
    title: "Trail Restoration",
    description: "Help restore hiking trails in the local nature reserve. Heavy lifting required.",
    reward: 100,
    category: "Nature",
    difficulty: "hard" as const,
    location: "2.5 mi",
    time: "4 hrs",
    status: "open" as const,
  },
  {
    id: 8,
    title: "Logo Design",
    description: "Create a modern logo for a new local coffee shop opening next month.",
    reward: 120,
    category: "Creative",
    difficulty: "hard" as const,
    location: "Remote",
    time: "Flexible",
    status: "open" as const,
  },
  {
    id: 9,
    title: "Piano Lessons",
    description: "Teach basic piano to a beginner. Must have own keyboard or access to one.",
    reward: 50,
    category: "Learn",
    difficulty: "medium" as const,
    location: "0.6 mi",
    time: "1.5 hrs",
    status: "in-progress" as const,
  },
  {
    id: 10,
    title: "Pet Sitting Emergency",
    description: "Watch two cats for the weekend. Owner had a family emergency.",
    reward: 90,
    category: "Urgent",
    difficulty: "medium" as const,
    location: "0.5 mi",
    time: "Weekend",
    status: "open" as const,
  },
  {
    id: 11,
    title: "Package Delivery",
    description: "Pick up a package from the post office and deliver it safely to the address.",
    reward: 15,
    category: "Errands",
    difficulty: "easy" as const,
    location: "0.3 mi",
    time: "30 min",
    status: "open" as const,
  },
  {
    id: 12,
    title: "Bird House Building",
    description: "Build and install bird houses in the local park. Materials provided.",
    reward: 55,
    category: "Nature",
    difficulty: "medium" as const,
    location: "1.2 mi",
    time: "3 hrs",
    status: "completed" as const,
  },
]

const categories = [
  { id: "all", name: "All Quests", icon: null, count: allQuests.length },
  { id: "Errands", name: "Errands", icon: ShoppingBag, count: allQuests.filter(q => q.category === "Errands").length },
  { id: "Nature", name: "Nature", icon: TreePine, count: allQuests.filter(q => q.category === "Nature").length },
  { id: "Creative", name: "Creative", icon: Palette, count: allQuests.filter(q => q.category === "Creative").length },
  { id: "Learn", name: "Learn & Teach", icon: GraduationCap, count: allQuests.filter(q => q.category === "Learn").length },
  { id: "Urgent", name: "Urgent", icon: AlertTriangle, count: allQuests.filter(q => q.category === "Urgent").length },
]

const difficultyConfig = {
  easy: { color: "bg-easy/20 text-easy border-easy/30", label: "Easy" },
  medium: { color: "bg-medium/20 text-medium border-medium/30", label: "Medium" },
  hard: { color: "bg-hard/20 text-hard border-hard/30", label: "Hard" },
}

const statusConfig = {
  open: { color: "bg-primary/20 text-primary border-primary/30", label: "Open" },
  "in-progress": { color: "bg-secondary/20 text-secondary border-secondary/30", label: "In Progress" },
  completed: { color: "bg-muted text-muted-foreground border-muted", label: "Completed" },
}

export default function QuestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const filteredQuests = useMemo(() => {
    return allQuests.filter((quest) => {
      const matchesSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quest.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || quest.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "all" || quest.difficulty === selectedDifficulty
      const matchesStatus = selectedStatus === "all" || quest.status === selectedStatus
      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus
    })
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedStatus])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedDifficulty("all")
    setSelectedStatus("all")
  }

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || selectedDifficulty !== "all" || selectedStatus !== "all"

  return (
    <div className="min-h-screen grid-bg relative">
      <div className="scanlines" />
      <Navbar />
      
      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
              Browse Quests
            </h1>
            <p className="mt-3 text-muted-foreground">
              Find tasks happening around you
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search quests by title or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/60 border-border/50 focus:border-primary/50"
                />
              </div>
              
              {/* Filter Toggle (Mobile) */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden border-border/50"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>

              {/* Desktop Filters */}
              <div className="hidden sm:flex gap-3">
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-[140px] bg-card/60 border-border/50">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[140px] bg-card/60 border-border/50">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="mt-4 flex flex-col gap-3 sm:hidden p-4 rounded border border-border/50 bg-card/60">
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4 mr-1" />
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Category Pills */}
          <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded border text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground border-primary glow-green"
                      : "bg-card/60 text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {category.icon && <category.icon className="h-4 w-4" />}
                  <span>{category.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    selectedCategory === category.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quest Grid */}
          {filteredQuests.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-4">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-muted/50 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No quests found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We could not find any quests matching your filters. Try adjusting your search or clearing filters.
              </p>
              <Button onClick={clearFilters} variant="outline" className="border-border/50 hover:border-primary/50">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

function QuestCard({ quest }: { quest: typeof allQuests[0] }) {
  const difficulty = difficultyConfig[quest.difficulty]
  const status = statusConfig[quest.status]

  return (
    <div className="group relative rounded border border-border/50 bg-card/60 backdrop-blur-sm p-5 transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:-translate-y-1 hover:shadow-lg">
      {/* Status Badge */}
      <div className="absolute -top-2 -right-2">
        <Badge className={`${status.color} border text-xs font-medium`}>
          {status.label}
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
      {quest.status === "open" && (
        <Button 
          className="w-full mt-4 bg-primary/80 text-primary-foreground font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary"
        >
          Accept Quest
        </Button>
      )}
    </div>
  )
}
