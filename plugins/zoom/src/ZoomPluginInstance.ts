import { type IContainerPlugin, type IShapeDrawData, defaultZoom } from "@tsparticles/engine";
import type { ZoomContainer } from "./types.js";
import { ZoomEventListeners } from "./ZoomEventListeners.js";

export class ZoomPluginInstance implements IContainerPlugin {
  private readonly _container;
  private readonly _listeners;

  constructor(container: ZoomContainer) {
    this._container = container;
    this._listeners = new ZoomEventListeners(container);
  }

  destroy(): void {
    this._listeners.removeListeners();
  }

  drawParticleTransform(data: IShapeDrawData): void {
    const container = this._container,
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

  drawSettingsCleanup(context: CanvasRenderingContext2D): void {
    const zoom = this._container.canvas.zoom;

    if (zoom === defaultZoom) {
      return;
    }

    context.restore();
  }

  drawSettingsSetup(context: CanvasRenderingContext2D): void {
    const zoom = this._container.canvas.zoom;

    if (zoom === defaultZoom) {
      return;
    }

    context.save();

    const { x: centerX, y: centerY } = this._container.canvas.getZoomCenter();

    context.translate(centerX, centerY);
    context.scale(zoom, zoom);
    context.translate(-centerX, -centerY);
  }

  start(): Promise<void> {
    this._listeners.addListeners();

    return Promise.resolve();
  }

  stop(): void {
    this._listeners.removeListeners();
  }
}
