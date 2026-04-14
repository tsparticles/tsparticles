import { Circle, Rectangle, type SingleOrMultiple, double, safeDocument } from "@tsparticles/engine";
import { type DivEvent, DivType, type IInteractivityData, divModeExecute } from "@tsparticles/plugin-interactivity";
import type { DestroyContainer } from "./Types.js";

const half = 0.5,
  toleranceFactor = 10,
  minRadius = 0;

/**
 *
 * @param container
 * @param area
 */
function processDestroy(container: DestroyContainer, area: Circle | Rectangle): void {
  const query = container.particles.grid.query(area);

  for (const particle of query) {
    particle.destroy();
  }
}

/**
 *
 * @param container
 * @param selector
 * @param div
 */
function singleSelectorDestroy(container: DestroyContainer, selector: string, div: DivEvent): void {
  const query = safeDocument().querySelectorAll(selector);

  if (!query.length) {
    return;
  }

  query.forEach(item => {
    const elem = item as HTMLElement,
      pxRatio = container.retina.pixelRatio,
      pos = {
        x: (elem.offsetLeft + elem.offsetWidth * half) * pxRatio,
        y: (elem.offsetTop + elem.offsetHeight * half) * pxRatio,
      },
      radius = elem.offsetWidth * half * pxRatio,
      tolerance = toleranceFactor * pxRatio,
      area =
        div.type === DivType.circle
          ? new Circle(pos.x, pos.y, radius + tolerance)
          : new Rectangle(
              elem.offsetLeft * pxRatio - tolerance,
              elem.offsetTop * pxRatio - tolerance,
              elem.offsetWidth * pxRatio + tolerance * double,
              elem.offsetHeight * pxRatio + tolerance * double,
            );

    processDestroy(container, area);
  });
}

/**
 *
 * @param container
 * @param divs
 * @param destroyMode
 */
export function divDestroy(container: DestroyContainer, divs: SingleOrMultiple<DivEvent>, destroyMode: string): void {
  divModeExecute(destroyMode, divs, (selector, div): void => {
    singleSelectorDestroy(container, selector, div);
  });
}

/**
 *
 * @param container
 * @param interactivityData
 */
export function mouseDestroy(container: DestroyContainer, interactivityData: IInteractivityData): void {
  const pxRatio = container.retina.pixelRatio,
    tolerance = toleranceFactor * pxRatio,
    mousePos = interactivityData.mouse.position,
    radius = container.retina.destroyModeDistance;

  if (!radius || radius < minRadius || !mousePos) {
    return;
  }

  processDestroy(container, new Circle(mousePos.x, mousePos.y, radius + tolerance));
}
