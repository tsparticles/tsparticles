import type { Container } from "./Container";

/**
 * @category Core
 */
export class FrameManager {
    constructor(private readonly container: Container) {}

    /**
     * Handles the rAF method preparing the next animation frame to be drawn
     * limiting it if it's needed by the current configuration
     * @param timestamp
     */
    nextFrame(timestamp: DOMHighResTimeStamp): void {
        try {
            const container = this.container;

            // FPS limit logic - if we are too fast, just draw without updating
            if (
                container.lastFrameTime !== undefined &&
                timestamp < container.lastFrameTime + 1000 / container.fpsLimit
            ) {
                container.draw();

                return;
            }

            const deltaValue = timestamp - container.lastFrameTime;
            const delta = {
                value: deltaValue,
                factor: (60 * deltaValue) / 1000,
            };

            container.lastFrameTime = timestamp;

            container.particles.draw(delta);

            if (container.getAnimationStatus()) {
                container.draw();
            }
        } catch (e) {
            console.error("tsParticles error in animation loop", e);
        }
    }
}
