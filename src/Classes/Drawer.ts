import {Container} from "./Container";
import {ShapeType} from "../Enums/ShapeType";

export class Drawer {
    private readonly container: Container;

    constructor(container: Container) {
        this.container = container;
    }

    public draw(timestamp: DOMHighResTimeStamp): void {
        const container = this.container;
        const options = container.options;

        // FPS limit logic
        // If we are too fast, just draw without updating
        const fpsLimit = options.fpsLimit;

        if (fpsLimit > 0 && timestamp < container.lastFrameTime + (1000 / fpsLimit)) {
            container.drawAnimationFrame = Container.requestFrame((t) => this.draw(t));
            return;
        }

        const delta = timestamp - container.lastFrameTime;

        container.lastFrameTime = timestamp;

        if (options.particles.shape.type === ShapeType.image && container.images.every((img) => img.error)) {
            return;
        }

        container.particles.draw(delta);

        if (container.drawAnimationFrame !== undefined && !options.particles.move.enable) {
            Container.cancelAnimation(container.drawAnimationFrame);
        } else {
            container.drawAnimationFrame = Container.requestFrame((t) => this.draw(t));
        }
    }
}
