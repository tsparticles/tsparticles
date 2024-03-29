import { type IImage, downloadSvgImage, loadImage } from "./Utils.js";
import type { IPreload } from "./Options/Interfaces/IPreload.js";
import { ImageDrawer } from "./ImageDrawer.js";
import type { ImageEngine } from "./types.js";
import { ImagePreloaderPlugin } from "./ImagePreloader.js";
import { errorPrefix } from "@tsparticles/engine";
import { loadGifImage } from "./GifUtils/Utils.js";

const extLength = 3;

/**
 *
 * @param engine -
 */
function addLoadImageToEngine(engine: ImageEngine): void {
    if (engine.loadImage) {
        return;
    }

    engine.loadImage = async (data: IPreload): Promise<void> => {
        if (!data.name && !data.src) {
            throw new Error(`${errorPrefix} no image source provided`);
        }

        if (!engine.images) {
            engine.images = [];
        }

        if (engine.images.find((t: IImage) => t.name === data.name || t.source === data.src)) {
            return;
        }

        try {
            const image: IImage = {
                gif: data.gif ?? false,
                name: data.name ?? data.src,
                source: data.src,
                type: data.src.substring(data.src.length - extLength),
                error: false,
                loading: true,
                replaceColor: data.replaceColor,
                ratio: data.width && data.height ? data.width / data.height : undefined,
            };

            engine.images.push(image);

            let imageFunc: (image: IImage) => Promise<void>;

            if (data.gif) {
                imageFunc = loadGifImage;
            } else {
                imageFunc = data.replaceColor ? downloadSvgImage : loadImage;
            }

            await imageFunc(image);
        } catch {
            throw new Error(`${errorPrefix} ${data.name ?? data.src} not found`);
        }
    };
}

/**
 * Loads the image shape in the given engine
 * @param engine - the engine where the image shape is going to be added
 * @param refresh -
 */
export async function loadImageShape(engine: ImageEngine, refresh = true): Promise<void> {
    addLoadImageToEngine(engine);

    const preloader = new ImagePreloaderPlugin(engine);

    await engine.addPlugin(preloader, refresh);
    await engine.addShape(new ImageDrawer(engine), refresh);
}
