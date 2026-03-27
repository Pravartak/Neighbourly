"use client";

import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuests, type Quest } from "@/context/QuestContext";
import {
	Award,
	CheckCircle2,
	ChevronRight,
	Clock,
	Coins,
	MapPin,
	PlusCircle,
	Settings,
	ShieldCheck,
	Timer,
	TrendingUp,
	Zap,
} from "lucide-react";

const userProfile = {
	name: "Alex Johnson",
	username: "alex_j",
	avatar:
		"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
	bio: "Helpful neighbor and tech enthusiast. Always down for a quick fix or a grocery run!",
	joined: "March 2026",
	reputation: 4.8,
	questsCompletedCount: 12,
	tags: ["Handy", "Tech Savvy", "Delivery Pro"],
};

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState("in-progress");
	const { quests, userStats } = useQuests();

	const inProgressQuests = quests.filter((quest) => quest.status === "in-progress");
	const completedQuests = quests.filter((quest) => quest.status === "completed");
	const addedQuests = quests.filter((quest) => quest.isUserAdded);
	const xpPercentage = (userStats.xp / userStats.xpToNextLevel) * 100;

	return (
		<div className="min-h-screen grid-bg relative">
			<div className="scanlines" />
			<Navbar />

			<main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
				<div className="mb-12 rounded-lg border border-border/50 bg-card/60 backdrop-blur-sm p-8 shadow-lg overflow-hidden relative">
					<div className="absolute top-0 left-0 w-full h-1 bg-muted/30">
						<div
							className="h-full bg-primary transition-all duration-1000 ease-out"
							style={{ width: `${xpPercentage}%` }}
						/>
					</div>

					<div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
						<div className="relative">
							<Avatar className="h-32 w-32 border-2 border-primary/20 shadow-xl">
								<AvatarImage src={userProfile.avatar} alt={userProfile.name} />
								<AvatarFallback className="text-2xl font-bold">AJ</AvatarFallback>
							</Avatar>
							<div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full border-2 border-background shadow-lg">
								Level {userStats.level}
							</div>
						</div>

						<div className="flex-1 space-y-4">
							<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
								<div>
									<h1 className="text-3xl font-bold tracking-tight">
										{userProfile.name}
									</h1>
									<p className="text-muted-foreground italic">
										@{userProfile.username}
									</p>
								</div>
								<div className="flex items-center justify-center md:justify-start gap-3">
									<Button
										variant="outline"
										size="sm"
										className="gap-2 border-border/50 hover:border-primary/50">
										<Settings className="h-4 w-4" />
										Edit Profile
									</Button>
									<Link href="/quests/new">
										<Button
											size="sm"
											className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
											Post a Quest
										</Button>
									</Link>
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between items-end">
									<p className="max-w-xl text-md leading-relaxed text-muted-foreground">
										{userProfile.bio}
									</p>
									<div className="text-right hidden md:block">
										<span className="text-xs font-bold text-primary block uppercase tracking-wider mb-1">
											Experience
										</span>
										<span className="text-sm font-mono">
											{userStats.xp} / {userStats.xpToNextLevel} XP
										</span>
									</div>
								</div>
							</div>

							<div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
								<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
									<Clock className="h-4 w-4" />
									Joined {userProfile.joined}
								</div>
								<div className="flex items-center gap-1.5 text-sm font-medium text-primary">
									<Award className="h-4 w-4" />
									{userProfile.reputation} Reputation
								</div>
								<div className="flex items-center gap-1.5 text-sm font-medium text-primary">
									<ShieldCheck className="h-4 w-4" />
									Verified Hero
								</div>
								<div className="flex items-center gap-1.5 text-sm font-bold text-accent">
									<Zap className="h-4 w-4" />
									{userStats.sparks} Sparks
								</div>
							</div>

							<div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
								{userProfile.tags.map((tag) => (
									<Badge
										key={tag}
										variant="secondary"
										className="bg-muted text-foreground border-border/50 px-3 py-1 text-xs font-semibold">
										{tag}
									</Badge>
								))}
							</div>
						</div>
					</div>
				</div>

				<section className="space-y-6">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<h2 className="text-2xl font-bold tracking-tight">Quest Log</h2>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<CheckCircle2 className="h-4 w-4 text-primary" />
								{userProfile.questsCompletedCount} Completed
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<PlusCircle className="h-4 w-4 text-primary" />
								{addedQuests.length} Added
							</div>
						</div>
					</div>

					<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
						<TabsList className="bg-muted/50 border border-border/50 p-1 mb-8 w-full sm:w-auto h-auto sm:h-10 flex-wrap sm:flex-nowrap">
							<TabsTrigger
								value="in-progress"
								className="flex-1 sm:flex-none flex items-center gap-2 px-6">
								<Timer className="h-4 w-4" />
								In Progress
								{inProgressQuests.length > 0 && (
									<Badge
										variant="secondary"
										className="bg-primary text-primary-foreground ml-2 px-1.5 py-0 min-w-5 h-5 flex items-center justify-center rounded-full text-[10px]">
										{inProgressQuests.length}
									</Badge>
								)}
							</TabsTrigger>
							<TabsTrigger
								value="added"
								className="flex-1 sm:flex-none flex items-center gap-2 px-6">
								<PlusCircle className="h-4 w-4" />
								Added
								{addedQuests.length > 0 && (
									<Badge
										variant="secondary"
										className="bg-primary text-primary-foreground ml-2 px-1.5 py-0 min-w-5 h-5 flex items-center justify-center rounded-full text-[10px]">
										{addedQuests.length}
									</Badge>
								)}
							</TabsTrigger>
							<TabsTrigger
								value="completed"
								className="flex-1 sm:flex-none flex items-center gap-2 px-6">
								<CheckCircle2 className="h-4 w-4" />
								Completed
							</TabsTrigger>
						</TabsList>

						<TabsContent value="in-progress" className="space-y-4">
							<QuestList
								quests={inProgressQuests}
								emptyMsg="No quests currently in progress."
								showBrowse
							/>
						</TabsContent>

						<TabsContent value="added" className="space-y-4">
							<QuestList
								quests={addedQuests}
								emptyMsg="You haven't posted any quests yet."
							/>
						</TabsContent>

						<TabsContent value="completed" className="space-y-4">
							<QuestList
								quests={completedQuests}
								emptyMsg="No completed quests yet. Start your first mission!"
								showBrowse
							/>
						</TabsContent>
					</Tabs>
				</section>
			</main>

			<Footer />
		</div>
	);
}

function QuestList({
	quests,
	emptyMsg,
	showBrowse,
}: {
	quests: Quest[];
	emptyMsg: string;
	showBrowse?: boolean;
}) {
	if (quests.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/50 rounded-lg bg-muted/10">
				<div className="h-12 w-12 text-muted-foreground mb-4 opacity-20">
					<TrendingUp className="h-full w-full" />
				</div>
				<p className="text-muted-foreground">{emptyMsg}</p>
				{showBrowse && (
					<Link href="/quests">
						<Button variant="link" className="text-primary mt-2">
							Browse for a new adventure
						</Button>
					</Link>
				)}
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{quests.map((quest) => (
				<QuestItem key={quest.id} quest={quest} />
			))}
		</div>
	);
}

function QuestItem({ quest }: { quest: Quest }) {
	const isCompleted = quest.status === "completed";

	return (
		<div className="group relative rounded-lg border border-border/50 bg-card/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/50 hover:bg-card/80 shadow-md">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
				<div className="flex-1 space-y-2">
					<div className="flex items-center gap-3">
						<h3 className="text-xl font-bold">{quest.title}</h3>
						{isCompleted && (
							<Badge className="bg-primary/20 text-primary border-primary/30">
								Completed
							</Badge>
						)}
					</div>
					<p className="text-muted-foreground">{quest.description}</p>

					<div className="flex flex-wrap items-center gap-4 pt-2">
						<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
							<MapPin className="h-3.5 w-3.5" />
							{quest.location}
						</div>
						<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
							<Clock className="h-3.5 w-3.5" />
							{quest.time}
						</div>
						<div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
							<Coins className="h-3.5 w-3.5" />${quest.reward}
						</div>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						className="group-hover:border-primary/50 transition-colors">
						{isCompleted ? "View Details" : "Manage Quest"}
						<ChevronRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
