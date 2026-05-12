import type { Container } from "../Core/Container.js";
import type { ILoadParams } from "../Core/Interfaces/ILoadParams.js";

export interface PlatformContainerTarget {
  canvas?: HTMLCanvasElement | OffscreenCanvas;
  domContainer?: HTMLElement;
  id: string;
}

export interface PlatformResolvedTarget {
  id: string;
  source: PlatformContainerTarget;
}

export interface PlatformAdapter {
  attachCanvas(container: Container, target: PlatformResolvedTarget): Promise<void>;
  createCanvas(target: PlatformResolvedTarget): Promise<HTMLCanvasElement | OffscreenCanvas>;
  resolveTarget(params: ILoadParams): Promise<PlatformResolvedTarget>;
}
