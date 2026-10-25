import { useEffect, useId, useState } from "react";

import { InlineScript } from "#/components/inline-script.tsx";

// Serialized via `.toString()` into the pre-hydration script, so it must stay
// self-contained: globals and arguments only, no module-scope references.
function computeClock(timeZone: string) {
	const now = new Date();
	const time = new Intl.DateTimeFormat("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		timeZone,
	}).format(now);
	const zone = new Intl.DateTimeFormat("en-US", {
		timeZone,
		timeZoneName: "shortOffset",
	})
		.formatToParts(now)
		.find((p) => p.type === "timeZoneName");
	const offset = zone ? zone.value.replace("GMT", "UTC") : "UTC";
	return { time, offset };
}

type ClockIds = { time: string; offset: string };

// `compute` is passed in rather than referenced because this body is also
// serialized via `.toString()`.
function runClockScript(
	timeZone: string,
	ids: ClockIds,
	compute: typeof computeClock,
) {
	try {
		const { time, offset } = compute(timeZone);
		const t = document.getElementById(ids.time);
		if (t) t.textContent = time;
		const o = document.getElementById(ids.offset);
		if (o) o.textContent = offset;
	} catch {}
}

// The prerendered HTML ships empty slots; a blocking inline script fills them
// with the visitor's current time before first paint, so a refresh never
// flashes a stale build-time clock or an empty footer. The effect then takes
// over using the same `computeClock`, so hydration lands on identical text.
export function LocalTime({ timeZone }: { timeZone: string }) {
	const uid = useId();
	const ids: ClockIds = { time: `lt-time-${uid}`, offset: `lt-offset-${uid}` };
	const [now, setNow] = useState({ time: "", offset: "" });

	useEffect(() => {
		const tick = () => setNow(computeClock(timeZone));
		tick();
		const id = setInterval(tick, 30_000);
		return () => clearInterval(id);
	}, [timeZone]);

	return (
		<>
			<span id={ids.offset} suppressHydrationWarning>
				{now.offset}
			</span>
			<span aria-hidden>·</span>
			<time id={ids.time} suppressHydrationWarning>
				{now.time}
			</time>
			<InlineScript
				html={`(${runClockScript.toString()})(${JSON.stringify(timeZone)},${JSON.stringify(ids)},${computeClock.toString()})`}
			/>
		</>
	);
}
