import { tsParticles } from "tsparticles-engine";
import { loadWordpressParticles } from "./load";

document.addEventListener("DOMContentLoaded", async () => {
	await loadWordpressParticles(tsParticles);

	const els = Array.from(document.querySelectorAll(".wp-block-tsparticles-wordpress-particles"));

	for (const el of els) {
		await tsParticles.load(el.id, JSON.parse(el.dataset.options));
	}
});
