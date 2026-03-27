"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu, Swords, X } from "lucide-react";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/quests", label: "Browse Quests" },
	{ href: "/redeem", label: "Redeem Rewards" },
	{ href: "/quests/new", label: "Post Quest" },
	{ href: "/profile", label: "My Quests" },
];

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const user = {
		name: "Alex",
		avatar:
			"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
		fallback: "AJ",
	};
	const isLoggedIn = true;

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link href="/" className="flex items-center gap-2 group">
					<div className="flex h-8 w-8 items-center justify-center rounded bg-primary glow-green">
						<Swords className="h-5 w-5 text-primary-foreground" />
					</div>
					<span className="text-xl font-bold tracking-tight text-glow">
						Neighborly
					</span>
				</Link>

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

				<div className="hidden md:flex items-center gap-4">
					{!isLoggedIn ? (
						<Link href="/auth">
							<Button className="bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform">
								Start Questing
							</Button>
						</Link>
					) : (
						<Link
							href="/profile"
							className="flex items-center gap-2 hover:opacity-80 transition-opacity">
							<Avatar className="h-9 w-9 border border-border">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback>{user.fallback}</AvatarFallback>
							</Avatar>
							<span className="text-sm font-medium">{user.name}</span>
						</Link>
					)}
				</div>

				<button
					className="md:hidden p-2 text-foreground"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label="Toggle menu">
					{mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</button>
			</div>

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
						{!isLoggedIn ? (
							<Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
								<Button className="mt-2 w-full bg-primary text-primary-foreground font-semibold">
									Start Questing
								</Button>
							</Link>
						) : (
							<Link
								href="/profile"
								className="mt-2 flex items-center justify-between p-3 bg-muted rounded border border-border/50"
								onClick={() => setMobileMenuOpen(false)}>
								<div className="flex items-center gap-3">
									<Avatar className="h-10 w-10 border border-border">
										<AvatarImage src={user.avatar} alt={user.name} />
										<AvatarFallback>{user.fallback}</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<span className="text-sm font-semibold">{user.name}</span>
										<span className="text-xs text-muted-foreground">
											View Profile
										</span>
									</div>
								</div>
							</Link>
						)}
					</nav>
				</div>
			)}
		</header>
	);
}
