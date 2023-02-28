import { downloadSvgImage, loadImage } from "./Utils";
import type { IImage } from "./Utils";
import { ImageDrawer } from "./ImageDrawer";
import type { ImageEngine } from "./types";
import { errorPrefix } from "tsparticles-engine";

/**
 * Loads the image shape in the given engine
 * @param engine the engine where the image shape is going to be added
 */
export async function loadImageShape(engine: ImageEngine): Promise<void> {
    if (!engine.loadImage) {
        engine.loadImage = async (url: string, replaceColor = false): Promise<void> => {
            if (!url) {
                throw new Error(`${errorPrefix} no image source provided`);
            }

            try {
                const image: IImage = {
                    source: url,
                    type: url.substring(url.length - 3),
                    error: false,
                    loading: true,
                };

                if (!engine.images) {
                    engine.images = [];
                }

                engine.images.push(image);

                const imageFunc = replaceColor ? downloadSvgImage : loadImage;

                await imageFunc(image);
            } catch {
                throw new Error(`${errorPrefix} ${url} not found`);
            }
        };
    }

    await engine.addShape(["image", "images"], new ImageDrawer(engine));
}
