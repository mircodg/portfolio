import { Button } from "#/components/ui/button.tsx";
import { cn } from "#/lib/utils.ts";

// The initial class is set by the inline script in __root.tsx before paint, so
// this only flips it and persists the choice.
export function ThemeToggle({ className }: { className?: string }) {
	function toggle() {
		const root = document.documentElement;
		const next = root.classList.contains("dark") ? "light" : "dark";
		root.classList.toggle("dark", next === "dark");
		try {
			localStorage.setItem("theme", next);
		} catch {
			// Storage can be unavailable (private mode); the toggle still works.
		}
	}

	return (
		<Button
			variant="ghost"
			size="xs"
			onClick={toggle}
			aria-label="Toggle theme"
			className={cn(
				"-mr-2 gap-1.5 font-mono font-normal text-[11px] text-muted-foreground uppercase tracking-[0.08em]",
				className,
			)}
		>
			<ContrastGlyph />
			<span className="dark:hidden">Dark</span>
			<span className="hidden dark:inline">Light</span>
		</Button>
	);
}

// Drawn on a 16px grid so it stays crisp at small sizes; the filled half
// swaps sides with the theme.
function ContrastGlyph() {
	return (
		<svg
			viewBox="0 0 16 16"
			aria-hidden
			className="size-3.5 shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none dark:rotate-180"
		>
			<title>Theme</title>
			<circle
				cx="8"
				cy="8"
				r="6.25"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path d="M8 1.75a6.25 6.25 0 0 1 0 12.5Z" fill="currentColor" />
		</svg>
	);
}
