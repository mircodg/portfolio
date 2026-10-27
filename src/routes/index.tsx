import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRightIcon, MapPinIcon } from "lucide-react";
import { Fragment, type ReactNode, Suspense } from "react";

import { Icon } from "#/components/brand-icon.tsx";
import {
	GitHubContributions,
	GitHubContributionsFallback,
} from "#/components/github-contributions.tsx";
import { LocalTime } from "#/components/local-time.tsx";
import { ThemeToggle } from "#/components/theme-toggle.tsx";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "#/components/ui/avatar.tsx";
import { Badge } from "#/components/ui/badge.tsx";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "#/components/ui/item.tsx";
import { Separator } from "#/components/ui/separator.tsx";
import { Signature } from "#/components/ui/signature.tsx";
import { TooltipProvider } from "#/components/ui/tooltip.tsx";
import { links, profile, projects, stack, work } from "#/data/profile.ts";
import { getCachedContributions } from "#/lib/get-cached-contributions.ts";

const GITHUB_PROFILE_URL = `https://github.com/${profile.githubUsername}`;

export const Route = createFileRoute("/")({
	// Not awaited: the promise streams to <GitHubContributions>, which unwraps
	// it with `use()`. Prerendering waits for it, so the HTML ships the graph.
	loader: () => ({
		contributions: getCachedContributions(profile.githubUsername),
	}),
	staleTime: Number.POSITIVE_INFINITY,
	component: Home,
});

function Home() {
	const { contributions } = Route.useLoaderData();

	return (
		<TooltipProvider>
			<div className="min-h-dvh px-4 pt-20 pb-16 sm:pt-30 sm:pb-24">
				<main className="mx-auto flex w-full max-w-[560px] flex-col gap-10">
					<Intro>
						<Suspense fallback={<GitHubContributionsFallback />}>
							<GitHubContributions
								contributions={contributions}
								githubProfileUrl={GITHUB_PROFILE_URL}
							/>
						</Suspense>
					</Intro>

					<Section index="01" title="Work">
						<Rows>
							{work.map((item) => (
								<Item
									key={`${item.org}-${item.role}`}
									size="sm"
									className="px-0"
								>
									<ItemMedia>
										<Avatar className="size-8 rounded-md border bg-white p-1">
											<AvatarImage
												src={item.logo}
												alt=""
												className="object-contain"
											/>
											<AvatarFallback className="rounded-md text-[10px]">
												{item.org.slice(0, 2)}
											</AvatarFallback>
										</Avatar>
									</ItemMedia>
									<ItemContent className="min-w-0 gap-0.5">
										<ItemTitle className="text-[15px]">{item.org}</ItemTitle>
										<ItemDescription className="text-[13px]">
											{item.role}
										</ItemDescription>
									</ItemContent>
									<ItemActions
										className={
											item.current
												? "font-mono text-brand text-xs"
												: "font-mono text-muted-foreground text-xs"
										}
									>
										{item.period}
									</ItemActions>
								</Item>
							))}
						</Rows>
					</Section>

					<Section index="02" title="Things I've built">
						<Rows>
							{projects.map((project) => (
								<Item
									key={project.name}
									size="sm"
									className="-mx-2 px-2"
									asChild
								>
									<a href={project.href} target="_blank" rel="noopener">
										<ItemContent className="gap-0.5">
											<ItemTitle className="text-[15px]">
												{project.name}
											</ItemTitle>
											<ItemDescription className="text-[13px]">
												{project.tagline}
											</ItemDescription>
										</ItemContent>
										<ItemActions className="font-mono text-muted-foreground text-xs">
											{project.year}
										</ItemActions>
									</a>
								</Item>
							))}
						</Rows>
					</Section>

					<Section index="03" title="Tech Stack">
						<Rows>
							{stack.map(({ category, items }) => (
								<Item key={category} size="sm" className="items-start px-0">
									<span className="w-16 shrink-0 font-mono text-muted-foreground text-xs leading-6">
										{category}
									</span>
									<ItemContent className="flex-row flex-wrap gap-1.5">
										{items.map((item) => (
											<Badge
												key={item.name}
												variant="outline"
												className="h-6 gap-1.5 px-2.5 font-normal text-[13px]"
											>
												<Icon icon={item.icon} />
												{item.name}
											</Badge>
										))}
									</ItemContent>
								</Item>
							))}
						</Rows>
					</Section>

					<Section index="04" title="Connect" className="pb-4">
						<Rows>
							{links.map((link) => (
								<Item key={link.label} size="sm" className="-mx-2 px-2" asChild>
									<a
										href={link.href}
										target={
											link.href.startsWith("mailto:") ? undefined : "_blank"
										}
										rel="noopener"
									>
										<ItemMedia>
											<Icon icon={link.icon} className="size-4" />
										</ItemMedia>
										<ItemContent>
											<ItemTitle className="text-[15px]">
												{link.label}
											</ItemTitle>
										</ItemContent>
										<ItemActions className="gap-1 font-mono text-[13px] text-muted-foreground">
											{link.handle}
											<ArrowUpRightIcon className="size-3.5" aria-hidden />
										</ItemActions>
									</a>
								</Item>
							))}
						</Rows>
					</Section>

					<footer className="flex items-center justify-between font-mono text-[11px] text-muted-foreground uppercase tracking-[0.08em]">
						<span className="flex items-center gap-1.5">
							<MapPinIcon className="size-3.5" aria-hidden />
							<span>{profile.location}</span>
							<span aria-hidden>·</span>
							<LocalTime timeZone={profile.timeZone} />
						</span>
						<ThemeToggle />
					</footer>
				</main>
			</div>
		</TooltipProvider>
	);
}

// `children` renders right below the bio (the activity graph).
function Intro({ children }: { children: ReactNode }) {
	return (
		<header className="flex flex-col gap-5">
			<div className="flex flex-col">
				{/* The signature is the visible heading; the legal name stays in the
				    h1 for screen readers and search engines. */}
				<h1 className="mb-1">
					<span className="sr-only">{profile.name}</span>
					<span aria-hidden>
						<Signature text="Domenico Germanà" fontSize={17} duration={0.5} />
					</span>
				</h1>
				{/* <p className="text-[15px] text-muted-foreground">Computer Engineer</p> */}
			</div>

			<div className="flex flex-col gap-3 text-[15px] leading-[25px]">
				{profile.bio.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>

			{children}
		</header>
	);
}

function Section({
	index,
	title,
	className,
	children,
}: {
	index: string;
	title: string;
	className?: string;
	children: ReactNode;
}) {
	return (
		<section className={className} aria-labelledby={`section-${index}`}>
			<div className="flex items-center gap-3 pb-1">
				<h2
					id={`section-${index}`}
					className="shrink-0 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.08em]"
				>
					{title}
				</h2>
				<Separator className="flex-1" />
			</div>
			{children}
		</section>
	);
}

// An ItemGroup with a hairline after every row, matching the section rules.
function Rows({ children }: { children: ReactNode[] }) {
	return (
		<ItemGroup>
			{children.map((child, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static, never reordered
				<Fragment key={i}>
					{child}
					<ItemSeparator />
				</Fragment>
			))}
		</ItemGroup>
	);
}
