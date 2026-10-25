// React warns when it renders a <script> on the client, so the tag is only
// executable in the server HTML; on hydration it becomes inert text/plain.
export function InlineScript({ html }: { html: string }) {
	return (
		<script
			type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
			suppressHydrationWarning
			// biome-ignore lint/security/noDangerouslySetInnerHtml: static, build-time script
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
