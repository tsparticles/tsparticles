import type { Container } from "../Container";
import { ColorUtils } from "../Utils/ColorUtils";
import { Constants } from "../Utils/Constants";
import { Particle } from "../Particle";

export class Linker {
	public static link(p1: Particle, container: Container): void {
		const optOpacity = p1.particlesOptions.lineLinked.opacity;
		const optDistance = p1.lineLinkedDistance ?? container.retina.lineLinkedDistance;

		for (const p2 of container.particles.spatialGrid.queryRadiusWithDistance(p1.position, optDistance)) {

			if (p1 === p2.particle || !p2.particle.particlesOptions.lineLinked.enable) continue;

			/* draw a line between p1 and p2 */
			const opacityLine = optOpacity - (p2.distance * optOpacity) / optDistance;

			if (opacityLine > 0) {

				/* style */
				if (!container.particles.lineLinkedColor) {
					const color = p1.particlesOptions.lineLinked.color;

					/* particles.line_linked - convert hex colors to rgb */
					//  check for the color profile requested and
					//  then return appropriate value

					if (color === Constants.randomColorValue) {
						if (p1.particlesOptions.lineLinked.consent) {
							container.particles.lineLinkedColor = ColorUtils.stringToRgb(color);
						} else if (p1.particlesOptions.lineLinked.blink) {
							container.particles.lineLinkedColor = Constants.randomColorValue;
						} else {
							container.particles.lineLinkedColor = "mid";
						}
					} else {
						container.particles.lineLinkedColor = typeof color === "string" ?
							ColorUtils.stringToRgb(color) :
							ColorUtils.colorToRgb(color);
					}
				}

				if (p2.particle.links.indexOf(p1) == -1 && p1.links.indexOf(p2.particle) == -1) {
					p1.links.push(p2.particle);
					container.canvas.drawLinkedLine(p1, p2.particle, opacityLine);
				}
			}
		}
	}
}
