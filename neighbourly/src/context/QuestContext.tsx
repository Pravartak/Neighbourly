"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Quest {
	id: number;
	title: string;
	description: string;
	reward: number;
	category: string;
	difficulty: "easy" | "medium" | "hard";
	location: string;
	time: string;
	status: "open" | "in-progress" | "completed";
	isUserAdded?: boolean;
}

interface UserStats {
	level: number;
	xp: number;
	xpToNextLevel: number;
	sparks: number;
}

interface QuestContextType {
	quests: Quest[];
	addQuest: (quest: Omit<Quest, "id" | "status" | "isUserAdded">) => void;
	acceptQuest: (questId: number) => void;
	redeemReward: (cost: number) => boolean;
	userStats: UserStats;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

const initialQuests: Quest[] = [
	{
		id: 1,
		title: "Dog Walking Adventure",
		description:
			"Take Max for his afternoon walk around the park. He loves meeting other dogs!",
		reward: 20,
		category: "Errands",
		difficulty: "easy",
		location: "0.2 mi",
		time: "45 min",
		status: "open",
	},
	{
		id: 2,
		title: "Community Garden Cleanup",
		description:
			"Help clear weeds and plant new flowers in the neighborhood community garden.",
		reward: 35,
		category: "Nature",
		difficulty: "easy",
		location: "0.4 mi",
		time: "2 hrs",
		status: "open",
	},
	{
		id: 3,
		title: "Photography Session",
		description:
			"Take professional photos of a local bakery for their new website and social media.",
		reward: 75,
		category: "Creative",
		difficulty: "medium",
		location: "0.8 mi",
		time: "2 hrs",
		status: "open",
	},
	{
		id: 4,
		title: "Math Tutoring Session",
		description:
			"Help a high school student with calculus homework and exam prep.",
		reward: 60,
		category: "Learn",
		difficulty: "medium",
		location: "1.0 mi",
		time: "2 hrs",
		status: "open",
	},
	{
		id: 5,
		title: "Emergency Grocery Run",
		description:
			"Pick up essential groceries for an elderly neighbor who cannot leave home.",
		reward: 40,
		category: "Urgent",
		difficulty: "easy",
		location: "0.3 mi",
		time: "1 hr",
		status: "open",
	},
	{
		id: 6,
		title: "Furniture Assembly",
		description: "Assemble a new IKEA wardrobe and desk set. Tools provided.",
		reward: 85,
		category: "Errands",
		difficulty: "hard",
		location: "1.5 mi",
		time: "3 hrs",
		status: "open",
	},
	{
		id: 121,
		title: "Piano Lessons",
		description:
			"Teach basic piano to a beginner. Must have own keyboard or access to one.",
		reward: 50,
		category: "Learn",
		difficulty: "medium",
		location: "0.6 mi",
		time: "1.5 hrs",
		status: "in-progress",
	},
];

const defaultUserStats: UserStats = {
	level: 5,
	xp: 750,
	xpToNextLevel: 1000,
	sparks: 500,
};

function getInitialQuests() {
	if (typeof window === "undefined") {
		return initialQuests;
	}

	const savedQuests = window.localStorage.getItem("neighborly_quests");
	return savedQuests ? (JSON.parse(savedQuests) as Quest[]) : initialQuests;
}

function getInitialUserStats() {
	if (typeof window === "undefined") {
		return defaultUserStats;
	}

	const savedStats = window.localStorage.getItem("neighborly_stats");
	return savedStats
		? { ...defaultUserStats, ...(JSON.parse(savedStats) as Partial<UserStats>) }
		: defaultUserStats;
}

export function QuestProvider({ children }: { children: React.ReactNode }) {
	const [quests, setQuests] = useState<Quest[]>(getInitialQuests);
	const [userStats, setUserStats] = useState<UserStats>(getInitialUserStats);

	useEffect(() => {
		localStorage.setItem("neighborly_quests", JSON.stringify(quests));
	}, [quests]);

	useEffect(() => {
		localStorage.setItem("neighborly_stats", JSON.stringify(userStats));
	}, [userStats]);

	const addQuest = (newQuestData: Omit<Quest, "id" | "status" | "isUserAdded">) => {
		const newQuest: Quest = {
			...newQuestData,
			id: Date.now(),
			status: "open",
			isUserAdded: true,
		};

		setQuests((prev) => [newQuest, ...prev]);
		setUserStats((prev) => {
			const newXp = prev.xp + 50;
			if (newXp >= prev.xpToNextLevel) {
				return {
					...prev,
					level: prev.level + 1,
					xp: newXp - prev.xpToNextLevel,
					xpToNextLevel: Math.floor(prev.xpToNextLevel * 1.2),
				};
			}

			return { ...prev, xp: newXp };
		});
	};

	const acceptQuest = (questId: number) => {
		setQuests((prev) =>
			prev.map((quest) =>
				quest.id === questId
					? { ...quest, status: "in-progress" as const }
					: quest,
			),
		);
	};

	const redeemReward = (cost: number) => {
		if (userStats.sparks < cost) {
			return false;
		}

		setUserStats((prev) => ({
			...prev,
			sparks: prev.sparks - cost,
		}));
		return true;
	};

	return (
		<QuestContext.Provider
			value={{ quests, addQuest, acceptQuest, redeemReward, userStats }}>
			{children}
		</QuestContext.Provider>
	);
}

export function useQuests() {
	const context = useContext(QuestContext);
	if (context === undefined) {
		throw new Error("useQuests must be used within a QuestProvider");
	}

	return context;
}
