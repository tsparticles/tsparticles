import type { Container } from "../Container";
import { ColorUtils } from "../Utils/ColorUtils";
import { Utils } from "../Utils/Utils";
import { ICoordinates } from "../../Interfaces/ICoordinates";
import { Constants } from "../Utils/Constants";
import type { IParticle } from "../../Interfaces/IParticle";

export class Linker {
	public static link(p1: IParticle, container: Container): void {
		const options = container.options;
		const optOpacity = options.particles.lineLinked.opacity;
		const optDistance = container.retina.lineLinkedDistance;

		for (const p2 of container.particles.spatialGrid.queryRadiusWithDist(p1.position, optDistance)) {

			if (p1 === p2.particle || !p2.particle.particlesOptions.lineLinked.enable) continue;

			/* draw a line between p1 and p2 */
			const opacityLine = optOpacity - (p2.dist * optOpacity) / optDistance;

			if (opacityLine > 0) {

				/* style */
				if (!container.particles.lineLinkedColor) {
					const color = options.particles.lineLinked.color;

					/* particles.line_linked - convert hex colors to rgb */
					//  check for the color profile requested and
					//  then return appropriate value

					if (color === Constants.randomColorValue) {
						if (options.particles.lineLinked.consent) {
							container.particles.lineLinkedColor = ColorUtils.stringToRgb(color);
						} else if (options.particles.lineLinked.blink) {
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
					container.canvas.drawLinkedLine(p1, p2.particle, p1.position, p2.particle.position, opacityLine);
				}

			}
		}
	}
}
