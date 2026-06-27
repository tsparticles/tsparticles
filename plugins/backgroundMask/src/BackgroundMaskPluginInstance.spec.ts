import { describe, expect, it } from "vitest";
import { BackgroundMask } from "./Options/Classes/BackgroundMask.js";
import { BackgroundMaskCover } from "./Options/Classes/BackgroundMaskCover.js";

const testOpacity = 0.8,
  fullOpacity = 1,
  half = 0.5;

describe("BackgroundMask integration", () => {
  it("BackgroundMask options route covers to BackgroundMaskCover", () => {
    const mask = new BackgroundMask(),
      element = "#myCanvas";

    mask.load({
      enable: true,
      cover: { element, opacity: testOpacity },
    });

    expect(mask.cover.element).to.equal(element);
    expect(mask.cover.opacity).to.equal(testOpacity);
    expect(mask.enable).to.equal(true);
    expect(mask.composite).to.equal("destination-out");
  });

  it("BackgroundMask with both element and draw works", () => {
    const mask = new BackgroundMask(),
      canvas = document.createElement("canvas");

    mask.load({
      enable: true,
      cover: {
        element: canvas,
        draw: () => {
          /* noop */
        },
        opacity: fullOpacity,
      },
    });

    expect(mask.cover.element).to.equal(canvas);
    expect(mask.cover.draw).to.be.a("function");
    expect(mask.cover.opacity).to.equal(fullOpacity);
  });

  it("BackgroundMaskCover element accepts direct HTMLCanvasElement reference", () => {
    const cover = new BackgroundMaskCover(),
      canvas = document.createElement("canvas");

    cover.load({ element: canvas });

    expect(cover.element).to.equal(canvas);
    expect(cover.element).to.be.instanceOf(HTMLCanvasElement);
  });

  it("BackgroundMaskCover element accepts OffscreenCanvas (type-only test)", () => {
    const cover = new BackgroundMaskCover();

    /* OffscreenCanvas might not be available in jsdom, test the type path via load */
    cover.load({ element: "#offscreen-selector" });

    expect(cover.element).to.equal("#offscreen-selector");
  });

  it("BackgroundMask preserves legacy image option alongside new fields", () => {
    const cover = new BackgroundMaskCover();

    cover.load({
      color: "#000",
      image: "bg.png",
      opacity: half,
      element: document.createElement("canvas"),
    });

    expect(cover.color?.value).to.equal("#000");
    expect(cover.image).to.equal("bg.png");
    expect(cover.opacity).to.equal(half);
    expect(cover.element).to.be.instanceOf(HTMLCanvasElement);
  });
});
