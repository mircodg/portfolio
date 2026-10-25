import type { Activity } from "#/components/contribution-graph.tsx";

// TanStack port of the registry's `next/cache` version. The route loader calls
// it while `/` is prerendered, so the data is baked into the static HTML and
// refreshes on every deploy; the map dedupes calls within a single build.
const GITHUB_CONTRIBUTIONS_API_URL =
	"https://github-contributions-api.jogruber.de/v4";

type GitHubContributionsResponse = {
	contributions: Activity[];
};

const cache = new Map<string, Promise<Activity[]>>();

export function getCachedContributions(username: string) {
	let contributions = cache.get(username);
	if (!contributions) {
		contributions = fetch(`${GITHUB_CONTRIBUTIONS_API_URL}/${username}?y=last`)
			.then((res) =>
				res.ok ? (res.json() as Promise<GitHubContributionsResponse>) : null,
			)
			.then((data) => data?.contributions ?? [])
			.catch(() => []);
		cache.set(username, contributions);
	}
	return contributions;
}
