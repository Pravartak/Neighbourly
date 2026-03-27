"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useQuests } from "@/context/QuestContext";
import { ArrowLeft, Send, Swords } from "lucide-react";

const categories = [
	"Errands",
	"Nature",
	"Creative",
	"Learn",
	"Urgent",
	"Tech",
	"Home Repair",
];
const difficulties = ["easy", "medium", "hard"] as const;
type Difficulty = (typeof difficulties)[number];
type NewQuestForm = {
	title: string;
	description: string;
	reward: number;
	category: string;
	difficulty: Difficulty;
	location: string;
	time: string;
};

export default function NewQuestPage() {
	const router = useRouter();
	const { addQuest } = useQuests();
	const [formData, setFormData] = useState<NewQuestForm>({
		title: "",
		description: "",
		reward: 20,
		category: "Errands",
		difficulty: "easy" as const,
		location: "Local",
		time: "1 hr",
	});

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (!formData.title || !formData.description) {
			return;
		}

		addQuest(formData);
		router.push("/quests");
	};

	return (
		<div className="min-h-screen grid-bg relative">
			<div className="scanlines" />
			<Navbar />

			<main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
				<Button
					variant="ghost"
					onClick={() => router.back()}
					className="mb-8 p-0 hover:bg-transparent text-muted-foreground hover:text-primary transition-colors">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to browsing
				</Button>

				<div className="rounded-lg border border-border/50 bg-card/60 backdrop-blur-sm p-8 shadow-xl">
					<div className="flex items-center gap-3 mb-8">
						<div className="flex h-10 w-10 items-center justify-center rounded bg-primary">
							<Swords className="h-6 w-6 text-primary-foreground" />
						</div>
						<div>
							<h1 className="text-2xl font-bold tracking-tight">
								Post a New Quest
							</h1>
							<p className="text-sm text-muted-foreground">
								Call upon your neighbors for help and offer a reward.
							</p>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="title">Quest Title</Label>
							<Input
								id="title"
								placeholder="e.g., Help with grocery shopping"
								value={formData.title}
								onChange={(event) =>
									setFormData((prev) => ({ ...prev, title: event.target.value }))
								}
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
								onChange={(event) =>
									setFormData((prev) => ({
										...prev,
										description: event.target.value,
									}))
								}
								required
								className="bg-background/40 border-border/50 focus:border-primary/50 min-h-[120px]"
							/>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="category">Category</Label>
								<Select
									value={formData.category}
									onValueChange={(value) =>
										setFormData((prev) => ({ ...prev, category: value }))
									}>
									<SelectTrigger className="bg-background/40 border-border/50 focus:border-primary/50">
										<SelectValue placeholder="Select Category" />
									</SelectTrigger>
									<SelectContent className="bg-card border-border/50">
										{categories.map((category) => (
											<SelectItem key={category} value={category}>
												{category}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="difficulty">Difficulty Level</Label>
								<Select
									value={formData.difficulty}
									onValueChange={(value: Difficulty) =>
										setFormData((prev) => ({ ...prev, difficulty: value }))
									}>
									<SelectTrigger className="bg-background/40 border-border/50 focus:border-primary/50 capitalize">
										<SelectValue placeholder="Select Difficulty" />
									</SelectTrigger>
									<SelectContent className="bg-card border-border/50">
										{difficulties.map((difficulty) => (
											<SelectItem
												key={difficulty}
												value={difficulty}
												className="capitalize">
												{difficulty}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="reward">Reward (Neighbors Coins)</Label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-primary">
										$
									</span>
									<Input
										id="reward"
										type="number"
										value={formData.reward}
										onChange={(event) =>
											setFormData((prev) => ({
												...prev,
												reward: Number.parseInt(event.target.value, 10) || 0,
											}))
										}
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
									onChange={(event) =>
										setFormData((prev) => ({
											...prev,
											location: event.target.value,
										}))
									}
									className="bg-background/40 border-border/50 focus:border-primary/50"
								/>
							</div>
						</div>

						<Button
							type="submit"
							className="w-full bg-primary text-primary-foreground font-bold hover:scale-[1.02] transition-transform py-6">
							Post Quest
							<Send className="ml-2 h-4 w-4" />
						</Button>
					</form>
				</div>
			</main>

			<Footer />
		</div>
	);
}
