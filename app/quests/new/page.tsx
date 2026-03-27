"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { useQuests } from "@/context/QuestContext"
import { Swords, ArrowLeft, Send } from "lucide-react"

const categories = ["Errands", "Nature", "Creative", "Learn", "Urgent", "Tech", "Home Repair"]
const difficulties = ["easy", "medium", "hard"]

export default function NewQuestPage() {
  const router = useRouter()
  const { addQuest } = useQuests()
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: 20,
    category: "Errands",
    difficulty: "easy" as const,
    location: "Local",
    time: "1 hr"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description) return
    
    addQuest(formData)
    router.push("/quests")
  }

  return (
    <div className="min-h-screen grid-bg relative">
      <div className="scanlines" />
      <Navbar />
      
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-8 p-0 hover:bg-transparent text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to browsing
        </Button>

        <div className="rounded-lg border border-border/50 bg-card/60 backdrop-blur-sm p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-primary">
              <Swords className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Post a New Quest</h1>
              <p className="text-sm text-muted-foreground">Call upon your neighbors for help and offer a reward.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Quest Title</Label>
              <Input 
                id="title"
                placeholder="e.g., Help with grocery shopping"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                className="bg-background/40 border-border/50 focus:border-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mission Objectives</Label>
              <Textarea 
                id="description"
                placeholder="Detail what needs to be done..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                className="bg-background/40 border-border/50 focus:border-primary/50 min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category}
                  onValueChange={(val) => setFormData(prev => ({ ...prev, category: val }))}
                >
                  <SelectTrigger className="bg-background/40 border-border/50 focus:border-primary/50">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50">
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select 
                  value={formData.difficulty}
                  onValueChange={(val: any) => setFormData(prev => ({ ...prev, difficulty: val }))}
                >
                  <SelectTrigger className="bg-background/40 border-border/50 focus:border-primary/50 capitalize">
                    <SelectValue placeholder="Select Difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50">
                    {difficulties.map(diff => (
                      <SelectItem key={diff} value={diff} className="capitalize">{diff}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="reward">Reward (Neighbors Coins)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-primary">$</span>
                  <Input 
                    id="reward"
                    type="number"
                    value={formData.reward}
                    onChange={(e) => setFormData(prev => ({ ...prev, reward: parseInt(e.target.value) }))}
                    className="pl-8 bg-background/40 border-border/50 focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location"
                  placeholder="e.g., 0.5 mi away"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="bg-background/40 border-border/50 focus:border-primary/50"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground font-bold hover:scale-[1.02] transition-transform py-6"
            >
              Post Quest
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
