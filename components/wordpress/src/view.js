import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

document.addEventListener("DOMContentLoaded", async () => {
	await loadFull(tsParticles);

	const els = Array.from(document.querySelectorAll(".wp-block-tsparticles-wordpress-particles"));

	for (const el of els) {
		await tsParticles.load(el.id, JSON.parse(el.dataset.options));
	}
});
