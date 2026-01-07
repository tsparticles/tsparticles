import type { IImage } from "./Utils.js";
import type { IPreload } from "./Options/Interfaces/IPreload.js";
import type { ImageEngine } from "./types.js";

declare const __VERSION__: string;

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
            throw new Error("No image source provided");
        }

        engine.images ??= [];

        if (engine.images.some((t: IImage) => t.name === data.name || t.source === data.src)) {
            return;
        }

        try {
            const image: IImage = {
                gif: data.gif,
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
                const { loadGifImage } = await import("./GifUtils/Utils.js");

                imageFunc = loadGifImage;
            } else if (data.replaceColor) {
                const { downloadSvgImage } = await import("./Utils.js");

                imageFunc = downloadSvgImage;
            } else {
                const { loadImage } = await import("./Utils.js");

                imageFunc = loadImage;
            }

            await imageFunc(image);
        } catch {
            throw new Error(`${data.name ?? data.src} not found`);
        }
    };
}

/**
 * Loads the image shape in the given engine
 * @param engine - the engine where the image shape is going to be added
 */
export function loadImageShape(engine: ImageEngine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { ImageDrawer } = await import("./ImageDrawer.js"),
            { ImagePreloaderPlugin } = await import("./ImagePreloader.js");

        addLoadImageToEngine(e);

        const preloader = new ImagePreloaderPlugin();

        e.addPlugin(preloader);
        e.addShape(new ImageDrawer(e));
    });
}
