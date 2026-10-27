/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type ICoordinates, tsParticles } from "@tsparticles/engine";
import type { LinkContainer, LinkParticle } from "../../../../interactions/particles/links/src/Types.js";
import { describe, expect, it } from "vitest";
import { CircleWarp } from "../../../../interactions/particles/links/src/CircleWarp.js";
import { Linker } from "../../../../interactions/particles/links/src/Linker.js";
import { Links } from "../../../../interactions/particles/links/src/Options/Classes/Links.js";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

let id = 0;
const width = 800,
  height = 600;

/**
 * Checks link discovery through the real spatial grid and Linker.
 * @param p1Position - the source particle position
 * @param p2Position - the destination particle position
 * @param distance - the maximum link distance
 * @param warp - whether canvas wrapping is enabled
 * @param expected - whether a link should be found
 * @param expectedWarp - whether the link should use wrapped drawing
 * @returns a promise that resolves after cleanup
 */
async function checkLinks(
  p1Position: ICoordinates,
  p2Position: ICoordinates,
  distance: number,
  warp: boolean,
  expected: boolean,
  expectedWarp = expected,
): Promise<void> {
  const container = (await tsParticles.load({
    id: `links-warp-${++id}`,
    element: createCustomCanvas(width, height) as unknown as HTMLCanvasElement,
    options: { autoPlay: false, detectRetina: false, particles: { number: { value: 0 } } },
  })) as LinkContainer | undefined;
  if (!container) throw new Error("Container missing");
  try {
    container.canvas.size.width = width;
    container.canvas.size.height = height;
    const links = new Links(),
      particle = (position: ICoordinates): LinkParticle =>
        ({
          getPosition: () => position,
          options: { links },
          retina: { linksDistance: distance },
          links: [],
          destroyed: false,
          spawning: false,
          getFillColor: () => undefined,
          getStrokeColor: () => undefined,
        }) as unknown as LinkParticle,
      p1 = particle(p1Position),
      p2 = particle(p2Position),
      linker = new Linker(tsParticles.pluginManager, container);
    links.enable = true;
    links.warp = warp;
    linker.init();
    container.particles.linksColor = { r: 255, g: 255, b: 255 };
    container.particles.grid.insert(p1);
    container.particles.grid.insert(p2);
    if (warp) {
      const query = new CircleWarp(p1Position.x, p1Position.y, distance, { width, height }).query(
        container.particles.grid,
      );
      expect(query).toHaveLength(expected ? 2 : 1);
      expect(new Set(query).size).toBe(query.length);
    }
    linker.interact(p1);
    expect(p1.links).toHaveLength(expected ? 1 : 0);
    if (expected) {
      expect(p1.links?.[0].destination).toBe(p2);
      expect(p1.links?.[0].isWarped).toBe(expectedWarp);
      expect(p1.links?.[0].opacity).toBeGreaterThan(0);
    }
    linker.interact(p2);
    expect(p2.links).toHaveLength(0);
  } finally {
    container.destroy(false);
  }
}

describe("Warped links", () => {
  globalThis.window = TestWindow as unknown as Window & typeof globalThis;
  for (const [name, p1, p2] of [
    ["left", { x: 5, y: 300 }, { x: 795, y: 300 }],
    ["right", { x: 795, y: 300 }, { x: 5, y: 300 }],
    ["top", { x: 400, y: 5 }, { x: 400, y: 595 }],
    ["bottom", { x: 400, y: 595 }, { x: 400, y: 5 }],
    ["top-left corner", { x: 5, y: 5 }, { x: 795, y: 595 }],
    ["bottom-right corner", { x: 795, y: 595 }, { x: 5, y: 5 }],
    ["top-right corner", { x: 795, y: 5 }, { x: 5, y: 595 }],
    ["bottom-left corner", { x: 5, y: 595 }, { x: 795, y: 5 }],
  ] as const) {
    it(`links particles across the ${name} edge`, async () => {
      await checkLinks(p1, p2, 20, true, true);
    });
  }
  it("does not wrap when warp is disabled", async () => {
    await checkLinks({ x: 5, y: 300 }, { x: 795, y: 300 }, 20, false, false);
  });
  it("excludes particles outside the warped radius", async () => {
    await checkLinks({ x: 5, y: 300 }, { x: 775, y: 300 }, 20, true, false);
  });
  it("preserves ordinary links", async () => {
    await checkLinks({ x: 400, y: 300 }, { x: 410, y: 300 }, 20, true, true, false);
  });
  it("does not duplicate particles when translated circles overlap", async () => {
    await checkLinks({ x: 5, y: 5 }, { x: 795, y: 595 }, 1000, true, true);
  });
});
