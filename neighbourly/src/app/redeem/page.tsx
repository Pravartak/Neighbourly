"use client";

import { useState } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuests } from "@/context/QuestContext";
import {
	AlertCircle,
	CheckCircle2,
	Coffee,
	Gift,
	Pizza,
	Sprout,
	Ticket,
	TrendingUp,
	Zap,
} from "lucide-react";

const rewards = [
	{
		id: 1,
		title: "Free Pizza Slice",
		provider: "Tony's Pizzeria",
		description: "Redeem one free slice of your choice. Valid any weekday.",
		cost: 200,
		icon: Pizza,
		category: "Food",
	},
	{
		id: 2,
		title: "Artisan Coffee",
		provider: "The Corner Cafe",
		description: "Any small espresso-based drink or cold brew.",
		cost: 150,
		icon: Coffee,
		category: "Drink",
	},
	{
		id: 3,
		title: "Community Pool Pass",
		provider: "Green Valley Recreation",
		description: "One-day entry for you and a guest to the community pool.",
		cost: 400,
		icon: Ticket,
		category: "Activity",
	},
	{
		id: 4,
		title: "Heirloom Seed Pack",
		provider: "Community Garden Center",
		description: "A selection of seasonal vegetable or flower seeds.",
		cost: 100,
		icon: Sprout,
		category: "Nature",
	},
	{
		id: 5,
		title: "Local Movie Night",
		provider: "The Rialto Theater",
		description: "One ticket to any Friday night community screening.",
		cost: 350,
		icon: Gift,
		category: "Activity",
	},
];

export default function RedeemPage() {
	const { userStats, redeemReward } = useQuests();
	const [redeemedId, setRedeemedId] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleRedeem = (id: number, cost: number) => {
		setError(null);
		const success = redeemReward(cost);

		if (success) {
			setRedeemedId(id);
			setTimeout(() => setRedeemedId(null), 3000);
			return;
		}

		setError("Not enough Sparks! Complete more quests to earn more.");
		setTimeout(() => setError(null), 3000);
	};

	return (
		<div className="min-h-screen grid-bg relative">
			<div className="scanlines" />
			<Navbar />

			<main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
					<div className="space-y-4">
						<h1 className="text-4xl font-bold tracking-tight">Marketplace</h1>
						<p className="text-muted-foreground text-lg max-w-2xl">
							Turn your hard-earned Sparks into rewards from local businesses.
							Supporting the community has never been so rewarding.
						</p>
					</div>

					<div className="bg-card/60 backdrop-blur-sm border border-primary/30 p-6 rounded-xl shadow-lg flex items-center gap-6 min-w-[240px]">
						<div className="bg-primary/20 p-3 rounded-full">
							<Zap className="h-8 w-8 text-primary glow-green" />
						</div>
						<div>
							<p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
								Your Balance
							</p>
							<div className="flex items-center gap-2">
								<span className="text-3xl font-mono font-bold text-primary">
									{userStats.sparks}
								</span>
								<span className="text-sm font-semibold text-muted-foreground">
									Sparks
								</span>
							</div>
						</div>
					</div>
				</div>

				{error && (
					<div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/50 flex items-center gap-3 text-red-500 animate-in fade-in slide-in-from-top-2">
						<AlertCircle className="h-5 w-5" />
						<p className="font-medium">{error}</p>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{rewards.map((reward) => (
						<div
							key={reward.id}
							className="group bg-card/40 backdrop-blur-md border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
							<div className="flex items-start justify-between mb-4">
								<div className="bg-muted p-3 rounded-lg group-hover:bg-primary/10 transition-colors">
									<reward.icon className="h-6 w-6 text-primary" />
								</div>
								<Badge
									variant="secondary"
									className="bg-muted/50 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
									{reward.category}
								</Badge>
							</div>

							<div className="space-y-2 mb-6">
								<h3 className="text-xl font-bold">{reward.title}</h3>
								<p className="text-xs font-semibold text-primary/80 uppercase tracking-tighter">
									{reward.provider}
								</p>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{reward.description}
								</p>
							</div>

							<div className="flex items-center justify-between pt-4 border-t border-border/30">
								<div className="flex items-center gap-1.5">
									<Zap className="h-4 w-4 text-primary" />
									<span className="text-lg font-mono font-bold">
										{reward.cost}
									</span>
								</div>

								<Button
									onClick={() => handleRedeem(reward.id, reward.cost)}
									disabled={
										userStats.sparks < reward.cost || redeemedId === reward.id
									}
									className={
										redeemedId === reward.id
											? "bg-green-500 hover:bg-green-500 text-white transition-all duration-300"
											: "bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
									}>
									{redeemedId === reward.id ? (
										<span className="flex items-center gap-2">
											<CheckCircle2 className="h-4 w-4" />
											Redeemed!
										</span>
									) : (
										"Redeem Now"
									)}
								</Button>
							</div>

							{redeemedId === reward.id && (
								<div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
							)}
						</div>
					))}
				</div>

				<section className="mt-20 p-8 rounded-2xl bg-muted/20 border border-border/50 text-center space-y-4">
					<TrendingUp className="h-10 w-10 text-primary mx-auto mb-2 opacity-50" />
					<h2 className="text-2xl font-bold">Supporting Local Businesses</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						Neighborly partners with neighborhood shops to provide these rewards.
						When you redeem, we verify your activity and compensate the providers
						directly. Keep on questing to keep the community thriving!
					</p>
				</section>
			</main>

			<Footer />
		</div>
	);
}
