import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

document.addEventListener("DOMContentLoaded", async () => {
	await loadFull(tsParticles);

	document
		.querySelectorAll(".wp-block-tsparticles-wordpress-particles")
		.forEach((el) => {
			console.log(el.parentElement);
		});
});

window.loadParticles = async (id, options) => {
	await tsParticles.load(id, options);
};
