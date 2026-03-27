"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Swords, Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("signup")

  // Sign Up state
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({})

  // Sign In state
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  })
  const [signinErrors, setSigninErrors] = useState<Record<string, string>>({})

  const validateSignup = () => {
    const errors: Record<string, string> = {}
    if (!signupData.fullName.trim()) errors.fullName = "Full name is required"
    if (!signupData.email.trim()) errors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email))
      errors.email = "Enter a valid email"
    if (!signupData.password) errors.password = "Password is required"
    else if (signupData.password.length < 6)
      errors.password = "Password must be at least 6 characters"
    if (signupData.password !== signupData.confirmPassword)
      errors.confirmPassword = "Passwords do not match"
    setSignupErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateSignin = () => {
    const errors: Record<string, string> = {}
    if (!signinData.email.trim()) errors.email = "Email is required"
    if (!signinData.password) errors.password = "Password is required"
    setSigninErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateSignup()) {
      router.push("/profile-setup")
    }
  }

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateSignin()) {
      router.push("/quests")
    }
  }

  return (
    <div className="min-h-screen grid-bg relative flex items-center justify-center px-4 py-12">
      <div className="scanlines" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary">
            <Swords className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Neighborly</span>
        </Link>

        {/* Auth Card */}
        <div className="rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm p-6 sm:p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="signup" className="flex-1">Sign Up</TabsTrigger>
              <TabsTrigger value="signin" className="flex-1">Sign In</TabsTrigger>
            </TabsList>

            {/* Sign Up Form */}
            <TabsContent value="signup">
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Join the quest. Help your neighbors.
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      placeholder="Your full name"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({ ...signupData, fullName: e.target.value })
                      }
                      className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                    />
                  </div>
                  {signupErrors.fullName && (
                    <p className="text-xs text-destructive">{signupErrors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                    />
                  </div>
                  {signupErrors.email && (
                    <p className="text-xs text-destructive">{signupErrors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 6 characters"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({ ...signupData, password: e.target.value })
                      }
                      className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {signupErrors.password && (
                    <p className="text-xs text-destructive">{signupErrors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-confirm"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={signupData.confirmPassword}
                      onChange={(e) =>
                        setSignupData({ ...signupData, confirmPassword: e.target.value })
                      }
                      className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {signupErrors.confirmPassword && (
                    <p className="text-xs text-destructive">{signupErrors.confirmPassword}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-semibold hover:scale-[1.02] transition-transform mt-2"
                >
                  Next — Set Up Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <button
                  onClick={() => setActiveTab("signin")}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </TabsContent>

            {/* Sign In Form */}
            <TabsContent value="signin">
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Sign in to continue your quests.
                </p>
              </div>

              <form onSubmit={handleSignin} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signinData.email}
                      onChange={(e) =>
                        setSigninData({ ...signinData, email: e.target.value })
                      }
                      className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                    />
                  </div>
                  {signinErrors.email && (
                    <p className="text-xs text-destructive">{signinErrors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="signin-password">Password</Label>
                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-primary"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={signinData.password}
                      onChange={(e) =>
                        setSigninData({ ...signinData, password: e.target.value })
                      }
                      className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {signinErrors.password && (
                    <p className="text-xs text-destructive">{signinErrors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-semibold hover:scale-[1.02] transition-transform mt-2"
                >
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setActiveTab("signup")}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to Neighborly&apos;s{" "}
          <Link href="/terms" className="text-primary hover:underline">Terms</Link> and{" "}
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
