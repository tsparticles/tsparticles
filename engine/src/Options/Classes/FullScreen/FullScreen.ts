import type { IFullScreen } from "../../Interfaces/FullScreen/IFullScreen";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../Types";

/**
 * The options to set the particles in the background using CSS `fixed` position
 * The [[zIndex]] property sets the background CSS `z-index` property
 * [[include:Options/FullScreen.md]]
 * @category Options
 */
export class FullScreen implements IFullScreen, IOptionLoader<IFullScreen> {
    /**
     * This property sets the canvas to a full window size acting like a background, the most common configuration. The default value is `false` since many already have different configurations.
     *
     * This is really helpful since there's no need to write CSS code to have a full size tsParticles instance.
     */
    enable;

    /**
     * This is the CSS `z-index` property set to the canvas.
     *
     * If the `z-index` is less than `0` the mouse interactions works only with the `interactivity.detectsOn` set to `window`.
     */
    zIndex;

    constructor() {
        this.enable = true;
        this.zIndex = -1;
    }

    load(data?: RecursivePartial<IFullScreen>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.zIndex !== undefined) {
            this.zIndex = data.zIndex;
        }
    }
}
