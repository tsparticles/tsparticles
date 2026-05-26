import { type IContainerPlugin, type IShapeDrawData, defaultZoom } from "@tsparticles/engine";
import type { ZoomContainer } from "./types.js";
import { ZoomEventListeners } from "./ZoomEventListeners.js";

export class ZoomPluginInstance implements IContainerPlugin {
  readonly #container;
  readonly #listeners;

  constructor(container: ZoomContainer) {
    this.#container = container;
    this.#listeners = new ZoomEventListeners(container);
  }

  destroy(): void {
    this.#listeners.removeListeners();
  }

  drawParticleTransform(data: IShapeDrawData): void {
    const container = this.#container,
      canvas = container.canvas,
      zoom = canvas.zoom;

    if (zoom === defaultZoom) {
      return;
    }

    const center = canvas.getZoomCenter(),
      { context, position, transformData } = data,
      zoomedX = center.x + (position.x - center.x) * zoom,
      zoomedY = center.y + (position.y - center.y) * zoom;

    data.drawScale = zoom;
    data.drawRadius = data.radius * zoom;
    data.drawPosition = { x: zoomedX, y: zoomedY };

    context.setTransform(
      transformData.a * zoom,
      transformData.b * zoom,
      transformData.c * zoom,
      transformData.d * zoom,
      zoomedX,
      zoomedY,
    );
  }

  drawSettingsCleanup(context: OffscreenCanvasRenderingContext2D): void {
    const zoom = this.#container.canvas.zoom;

    if (zoom === defaultZoom) {
      return;
    }

    context.restore();
  }

  drawSettingsSetup(context: OffscreenCanvasRenderingContext2D): void {
    const zoom = this.#container.canvas.zoom;

    if (zoom === defaultZoom) {
      return;
    }

    context.save();

    const { x: centerX, y: centerY } = this.#container.canvas.getZoomCenter();

    context.translate(centerX, centerY);
    context.scale(zoom, zoom);
    context.translate(-centerX, -centerY);
  }

  start(): Promise<void> {
    this.#listeners.addListeners();

    return Promise.resolve();
  }

  stop(): void {
    this.#listeners.removeListeners();
  }
}
