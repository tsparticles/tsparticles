import type { Engine, IContainerPlugin } from "tsparticles-engine";
import type { MotionContainer } from "./types";
import { safeMatchMedia } from "tsparticles-engine";

export class MotionInstance implements IContainerPlugin {
    private readonly _container;
    private readonly _engine;

    constructor(container: MotionContainer, engine: Engine) {
        this._container = container;
        this._engine = engine;
    }

    async init(): Promise<void> {
        const container = this._container,
            options = container.actualOptions.motion;

        if (options && (options.disable || options.reduce.value)) {
            const mediaQuery = safeMatchMedia("(prefers-reduced-motion: reduce)");

            if (mediaQuery) {
                // Check if the media query matches or is not available.
                this._handleMotionChange(mediaQuery);

                // Ads an event listener to check for changes in the media query's value.
                const handleChange = async (): Promise<void> => {
                    this._handleMotionChange(mediaQuery);

                    try {
                        await container.refresh();
                    } catch {
                        // ignore
                    }
                };

                if (mediaQuery.addEventListener !== undefined) {
                    mediaQuery.addEventListener("change", handleChange);
                } else if (mediaQuery.addListener !== undefined) {
                    mediaQuery.addListener(handleChange);
                }
            } else {
                container.retina.reduceFactor = 1;
            }
        } else {
            container.retina.reduceFactor = 1;
        }
    }

    private _handleMotionChange(mediaQuery: MediaQueryList): void {
        const container = this._container,
            motion = container.actualOptions.motion;

        if (!motion) {
            return;
        }

        container.retina.reduceFactor = mediaQuery.matches
            ? motion.disable
                ? 0
                : motion.reduce.value
                ? 1 / motion.reduce.factor
                : 1
            : 1;
    }
}
