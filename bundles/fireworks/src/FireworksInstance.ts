import type { Container } from "@tsparticles/engine";

export class FireworksInstance {
  private readonly _container: Container;

  constructor(container: Container) {
    this._container = container;
  }

  pause(): void {
    this._container.pause();
  }

  play(): void {
    this._container.play();
  }

  stop(): void {
    this._container.stop();
  }
}
