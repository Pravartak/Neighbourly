import Link from "next/link"
import { Swords } from "lucide-react"

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
                <Swords className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">Neighborly</span>
            </Link>

            {/* Links */}
            <nav className="flex items-center gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom */}
          <div className="mt-8 pt-8 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>2026 Neighborly. All rights reserved.</p>
              <p className="flex items-center gap-1">
                Made with <span className="text-primary">code</span> for neighbors everywhere
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
