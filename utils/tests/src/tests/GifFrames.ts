/* eslint-disable */
import { type Container, tsParticles } from "@tsparticles/engine";
import { ImageData as CanvasImageData } from "canvas";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadGifShape } from "@tsparticles/shape-gif";

const gifSrc = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAsAAAAAAEAAQAAAgJEAQA7";
const flushRounds = 12;

interface GifDataLike {
  frames: unknown[];
  height: number;
  width: number;
}

interface GifParticleLike {
  gifData?: GifDataLike;
  gifFrame?: number;
  gifLoopCount?: number;
}

if (typeof globalThis.ImageData === "undefined") {
  globalThis.ImageData = CanvasImageData as unknown as typeof globalThis.ImageData;
}

if (typeof globalThis.createImageBitmap === "undefined") {
  globalThis.createImageBitmap = ((image: unknown) =>
    Promise.resolve(image)) as unknown as typeof globalThis.createImageBitmap;
}

async function flush(): Promise<void> {
  for (let i = 0; i < flushRounds; i++) {
    await new Promise<void>(resolve => setTimeout(resolve, 0));
  }
}

describe("Gif shape frames", async () => {
  globalThis.window = TestWindow;

  await loadGifShape(tsParticles);

  const boot = (await tsParticles.load({
    id: "gif-boot",
    options: {},
    autoPlay: false,
    element: createCustomCanvas(100, 100) as unknown as HTMLCanvasElement,
  })) as Container | undefined;

  boot?.destroy(false);

  let containerId = 0;

  const loadGifContainer = async (): Promise<Container> => {
    containerId += 1;

    const container = (await tsParticles.load({
      id: `gif-frames-${containerId.toString()}`,
      options: {
        particles: {
          number: {
            value: 1,
          },
          shape: {
            type: ["gif", "gifs"],
            options: {
              gif: {
                src: gifSrc,
              },
              gifs: {
                src: gifSrc,
              },
            },
          },
          size: {
            value: 1,
          },
        },
      },
      autoPlay: false,
      element: createCustomCanvas(800, 600) as unknown as HTMLCanvasElement,
    })) as Container | undefined;

    if (!container) {
      throw new Error("GIF test container not initialized");
    }

    await flush();

    return container;
  };

  it("decodes the 1x1 looping GIF into the particle gif data", async () => {
    const container = await loadGifContainer(),
      particle = container.particles.get(0) as unknown as GifParticleLike | undefined;

    expect(particle).to.not.be.undefined;

    if (!particle) {
      container.destroy(false);

      return;
    }

    expect(particle.gifData).to.not.be.undefined;
    expect(particle.gifData?.width).to.equal(1);
    expect(particle.gifData?.height).to.equal(1);
    expect(particle.gifData?.frames.length).to.equal(1);
    expect(particle.gifFrame).to.equal(0);
    expect(particle.gifLoopCount).to.equal(Number.POSITIVE_INFINITY);

    container.destroy(false);
  }, 30000);

  it("decodes the same source idempotently in a second container", async () => {
    const container = await loadGifContainer(),
      particle = container.particles.get(0) as unknown as GifParticleLike | undefined;

    expect(particle).to.not.be.undefined;

    if (!particle) {
      container.destroy(false);

      return;
    }

    expect(particle.gifData).to.not.be.undefined;
    expect(particle.gifData?.width).to.equal(1);
    expect(particle.gifData?.height).to.equal(1);
    expect(particle.gifLoopCount).to.equal(Number.POSITIVE_INFINITY);

    container.destroy(false);
  }, 30000);
});
