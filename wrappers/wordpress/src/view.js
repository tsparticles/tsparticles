import { createBrowserEngine } from "@tsparticles/engine";
import { loadWordpressParticles } from "./load";

const engine = createBrowserEngine();

document.addEventListener("DOMContentLoaded", async () => {
	const els = Array.from(document.querySelectorAll(".wp-block-tsparticles-tsparticles-wp-block")),
		plugins = new Set();

	for (const el of els) {
		const elementPlugins = (el.dataset.plugins || "").split(",").filter(Boolean);

		for (const plugin of elementPlugins) {
			if (!plugins.has(plugin)) {
				plugins.add(plugin);
			}
		}
	}

	await loadWordpressParticles(engine, plugins);

	for (const el of els) {
		try {
			await engine.load({
				id: el.id,
				options: JSON.parse(el.dataset.options),
			});
		} catch {
			// ignore malformed options
		}
	}
});
