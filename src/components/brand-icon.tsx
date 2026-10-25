import type { LucideIcon } from "lucide-react";

import { cn } from "#/lib/utils.ts";

// Full-color brand logos from svgl.app, served from /public/icons. Marks that
// would vanish on one background ship a separate file per theme.
export type Logo = string | { light: string; dark: string };

export type IconSource = Logo | LucideIcon;

export function Icon({
	icon,
	className,
}: {
	icon: IconSource;
	className?: string;
}) {
	const classes = cn("size-3.5 shrink-0 object-contain", className);

	if (typeof icon === "string") {
		return <img src={icon} alt="" className={classes} />;
	}

	if ("light" in icon) {
		return (
			<>
				<img src={icon.light} alt="" className={cn(classes, "dark:hidden")} />
				<img
					src={icon.dark}
					alt=""
					className={cn(classes, "hidden dark:block")}
				/>
			</>
		);
	}

	const LucideComponent = icon;
	return <LucideComponent aria-hidden className={classes} />;
}
