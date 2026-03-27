"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Swords, Camera, X, ArrowRight, ArrowLeft, Check } from "lucide-react"

const availableTags = [
  "🛠️ Handy", "🐕 Dog Lover", "💻 Tech Savvy", "🧹 Clean Freak",
  "🏃 Active", "🍳 Foodie", "📦 Delivery Pro", "🎨 Creative",
  "📚 Bookworm", "🌱 Eco-Friendly", "🎮 Gamer", "🎵 Music Fan",
  "📷 Photographer", "🏋️ Fitness", "🧑‍🏫 Tutor", "🚗 Driver",
  "🐱 Cat Person", "🤝 People Person", "⏰ Early Bird", "🌙 Night Owl",
]

export default function ProfileSetupPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileData, setProfileData] = useState({
    username: "",
    bio: "",
    avatarUrl: "",
  })
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatarUrl: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!profileData.username.trim()) errs.username = "Pick a username"
    else if (profileData.username.length < 3)
      errs.username = "Username must be at least 3 characters"
    else if (!/^[a-zA-Z0-9_]+$/.test(profileData.username))
      errs.username = "Only letters, numbers, and underscores"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      router.push("/quests")
    }
  }

  const initials = profileData.username
    ? profileData.username.slice(0, 2).toUpperCase()
    : "?"

  return (
    <div className="min-h-screen grid-bg relative flex items-center justify-center px-4 py-12">
      <div className="scanlines" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary">
            <Swords className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Neighborly</span>
        </Link>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              <Check className="h-4 w-4" />
            </div>
            <span className="text-sm text-muted-foreground hidden sm:inline">Account</span>
          </div>
          <div className="w-8 h-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              2
            </div>
            <span className="text-sm font-medium hidden sm:inline">Profile</span>
          </div>
          <div className="w-8 h-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground text-xs font-bold">
              3
            </div>
            <span className="text-sm text-muted-foreground hidden sm:inline">Explore</span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Set up your profile</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Let your neighbors know who you are.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-border">
                  {profileData.avatarUrl ? (
                    <AvatarImage src={profileData.avatarUrl} alt="Profile" />
                  ) : null}
                  <AvatarFallback className="text-lg bg-muted text-muted-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="h-6 w-6 text-foreground" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-primary hover:underline"
              >
                Upload a photo
              </button>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                <Input
                  id="username"
                  placeholder="your_username"
                  value={profileData.username}
                  onChange={(e) =>
                    setProfileData({ ...profileData, username: e.target.value })
                  }
                  className="pl-8 bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>
              {errors.username && (
                <p className="text-xs text-destructive">{errors.username}</p>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">
                Bio <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell your neighbors a bit about yourself..."
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                className="bg-background/50 border-border/50 focus:border-primary/50 resize-none h-20"
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground text-right">
                {profileData.bio.length}/160
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <Label>
                Describe yourself{" "}
                <span className="text-muted-foreground font-normal">(pick a few)</span>
              </Label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag)
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        isSelected
                          ? "bg-primary/15 text-primary border-primary/40"
                          : "bg-muted/50 text-muted-foreground border-border/50 hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      {tag}
                      {isSelected && <X className="inline ml-1 h-3 w-3" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-border/50 hover:bg-muted"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground font-semibold hover:scale-[1.02] transition-transform"
              >
                Start Questing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
