import type { Container } from "../Container";
import type { IDelta } from "../Interfaces/IDelta";

function initDelta(value: number, fpsLimit = 60, smooth = false): IDelta {
    return {
        value,
        factor: smooth ? 60 / fpsLimit : (60 * value) / 1000,
    };
}

/**
 * @category Core
 */
export class FrameManager {
    constructor(private readonly container: Container) {}

    /**
     * Handles the rAF method preparing the next animation frame to be drawn
     * limiting it if it's needed by the current configuration
     * @param timestamp the new frame timestamp
     */
    async nextFrame(timestamp: DOMHighResTimeStamp): Promise<void> {
        try {
            const container = this.container;

            // FPS limit logic - if we are too fast, just draw without updating
            if (
                !container.smooth &&
                container.lastFrameTime !== undefined &&
                timestamp < container.lastFrameTime + 1000 / container.fpsLimit
            ) {
                container.draw(false);

                return;
            }

            container.lastFrameTime ??= timestamp;

            const delta = initDelta(timestamp - container.lastFrameTime, container.fpsLimit, container.smooth);

            container.lifeTime += delta.value;
            container.lastFrameTime = timestamp;

            if (delta.value > 1000) {
                container.draw(false);
                return;
            }

            await container.particles.draw(delta);

            if (container.duration > 0 && container.lifeTime > container.duration) {
                container.destroy();
                return;
            }

            if (container.getAnimationStatus()) {
                container.draw(false);
            }
        } catch (e) {
            console.error("tsParticles error in animation loop", e);
        }
    }
}
