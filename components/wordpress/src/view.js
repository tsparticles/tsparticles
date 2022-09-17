import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

setTimeout(async () => {
	await loadFull(tsParticles);

	await tsParticles.load("tsparticles", {
		background: {
			color: "#000",
		},
		fullScreen: {
			enable: false,
		},
		particles: {
			move: {
				enable: true,
			},
		},
	});
}, 500);
