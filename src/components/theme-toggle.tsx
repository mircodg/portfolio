import { MoonIcon, SunIcon } from "lucide-react";

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

	// The icon shows the theme you'd switch to, so it's driven by the `dark`
	// class rather than state and is correct from the first paint.
	return (
		<Button
			variant="ghost"
			size="icon-xs"
			onClick={toggle}
			aria-label="Toggle theme"
			className={cn("-mr-1.5 text-muted-foreground", className)}
		>
			<MoonIcon className="size-3.5 dark:hidden" aria-hidden />
			<SunIcon className="hidden size-3.5 dark:block" aria-hidden />
		</Button>
	);
}
