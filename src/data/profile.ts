// All page copy lives here so content edits never touch layout code.

import type { IconSource } from "#/components/brand-icon.tsx";

export const profile = {
	name: "Domenico Germanà",
	githubUsername: "mircodg",
	avatarUrl: "https://avatars.githubusercontent.com/u/95755379?v=4",
	bio: [
		"Domenico on paper, Mirco to everyone else: a known alias, closed as won't fix.",
		"I turn fuzzy ideas into shipped software. I run projects at iNNOVATECH, I'm finishing my MSc at the University of Messina, and in between I build AI agents.",
	],
	location: "Messina, IT",
	timeZone: "Europe/Rome",
};

export type WorkItem = {
	logo: string;
	org: string;
	role: string;
	period: string;
	current?: boolean;
};

export const work: WorkItem[] = [
	{
		logo: "/logos/innovatech.webp",
		org: "iNNOVATECH",
		role: "Project Manager",
		period: "Mar 2025 – now",
		current: true,
	},
	{
		logo: "/logos/innovatech.webp",
		org: "iNNOVATECH",
		role: "Software Engineer Intern",
		period: "Aug – Oct 2024",
	},
	{
		logo: "/logos/unime.png",
		org: "University of Messina",
		role: "MSc, Engineering in Computer Science",
		period: "Jan 2024 – now",
		current: true,
	},
	{
		logo: "/logos/unime.png",
		org: "University of Messina",
		role: "BSc, Electronics and Computer Engineering",
		period: "Sep 2021 – Dec 2024",
	},
];

export type Project = {
	name: string;
	tagline: string;
	href: string;
	year: string;
};

export const projects: Project[] = [
	{
		name: "sent",
		tagline: "Telegram from your terminal & your agents (MCP)",
		href: "https://github.com/mircodg/sent",
		year: "2026",
	},
	{
		name: "v0 clone",
		tagline: "prompt-to-app in disposable sandboxes",
		href: "https://github.com/mircodg/v0-clone",
		year: "2025",
	},
];

export type StackItem = { name: string; icon: IconSource };

export const stack: { category: string; items: StackItem[] }[] = [
	{
		category: "Language",
		items: [
			{ name: "TypeScript", icon: "/icons/typescript.svg" },
			{ name: "Python", icon: "/icons/python.svg" },
			{ name: "Java", icon: "/icons/java.svg" },
			{ name: "C", icon: "/icons/c.svg" },
		],
	},
	{
		category: "Web",
		items: [
			{
				name: "React",
				icon: {
					light: "/icons/react_light.svg",
					dark: "/icons/react_dark.svg",
				},
			},
			{
				name: "TanStack",
				icon: {
					light: "/icons/tanstack_light.svg",
					dark: "/icons/tanstack_dark.svg",
				},
			},
			{ name: "Next.js", icon: "/icons/nextjs_icon_dark.svg" },
			{ name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
		],
	},
	{
		category: "Infra",
		items: [
			{ name: "Docker", icon: "/icons/docker.svg" },
			{
				name: "AWS",
				icon: { light: "/icons/aws_light.svg", dark: "/icons/aws_dark.svg" },
			},
		],
	},
	{
		category: "AI",
		items: [
			{
				name: "Vercel AI SDK",
				icon: { light: "/icons/vercel.svg", dark: "/icons/vercel_dark.svg" },
			},
			{
				name: "Mastra",
				icon: {
					light: "/icons/mastra-icon-light.svg",
					dark: "/icons/mastra-icon-dark.svg",
				},
			},
		],
	},
];

export const links: {
	label: string;
	handle: string;
	href: string;
	icon: IconSource;
}[] = [
	{
		label: "Email",
		handle: "germanamirco@gmail.com",
		href: "mailto:germanamirco@gmail.com",
		icon: "/icons/gmail.svg",
	},
	{
		label: "GitHub",
		handle: "@mircodg",
		href: "https://github.com/mircodg",
		icon: { light: "/icons/github_light.svg", dark: "/icons/github_dark.svg" },
	},
	{
		label: "X",
		handle: "@0xzelo",
		href: "https://x.com/0xzelo",
		icon: { light: "/icons/x.svg", dark: "/icons/x_dark.svg" },
	},
];
