"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Swords } from "lucide-react";
import { useState } from "react";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/quests", label: "Browse Quests" },
	{ href: "#post", label: "Post Quest" },
	{ href: "#my-quests", label: "My Quests" },
];

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2 group">
					<div className="flex h-8 w-8 items-center justify-center rounded bg-primary glow-green">
						<Swords className="h-5 w-5 text-primary-foreground" />
					</div>
					<span className="text-xl font-bold tracking-tight text-glow">
						Neighborly
					</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-6">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:text-glow">
							{link.label}
						</Link>
					))}
				</nav>

				{/* CTA Button */}
				<div className="hidden md:block">
					<Link href="/auth">
						<Button className="bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform">
							Start Questing
						</Button>
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden p-2 text-foreground"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label="Toggle menu">
					{mobileMenuOpen ? (
						<X className="h-6 w-6" />
					) : (
						<Menu className="h-6 w-6" />
					)}
				</button>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
					<nav className="flex flex-col gap-2 p-4">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-muted rounded"
								onClick={() => setMobileMenuOpen(false)}>
								{link.label}
							</Link>
						))}
						<Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
							<Button className="mt-2 w-full bg-primary text-primary-foreground font-semibold">
								Start Questing
							</Button>
						</Link>
					</nav>
				</div>
			)}
		</header>
	);
}
