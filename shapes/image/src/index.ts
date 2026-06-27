import { type IImage, downloadSvgImage, loadImage, shapeTypes } from "./Utils.js";
import type { ImageContainer, ImageEngine } from "./types.js";
import type { IPreload } from "./Options/Interfaces/IPreload.js";
import { ImageDrawer } from "./ImageDrawer.js";
import { ImagePreloaderPlugin } from "./ImagePreloader.js";

const extLength = 3;

/**
 *
 * @param engine - The engine to load the shape in
 */
function addLoadImageToEngine(engine: ImageEngine): void {
  engine.getImages ??= (container: ImageContainer): IImage[] => {
    engine.images ??= new Map();

    let images = engine.images.get(container);

    if (!images) {
      images = [];

      engine.images.set(container, images);
    }

    return images;
  };

  engine.loadImage ??= async (container: ImageContainer, data: IPreload): Promise<void> => {
    if (!engine.getImages) {
      throw new Error("No images collection found");
    }

    if (!data.name && !data.src) {
      throw new Error("No image source provided");
    }

    engine.images ??= new Map();

    const containerImages = engine.getImages(container);

    if (containerImages.some((t: IImage) => t.name === data.name || t.source === data.src)) {
      return;
    }

    try {
      const image: IImage = {
        name: data.name ?? data.src,
        source: data.src,
        type: data.src.substring(data.src.length - extLength),
        error: false,
        loading: true,
        replaceColor: data.replaceColor,
        ratio: data.width && data.height ? data.width / data.height : undefined,
      };

      containerImages.push(image);

      engine.images.set(container, containerImages);

      let imageFunc: (image: IImage) => Promise<void>;

      if (data.replaceColor) {
        imageFunc = downloadSvgImage;
      } else {
        imageFunc = loadImage;
      }

      await imageFunc(image);
    } catch {
      throw new Error(`${data.name ?? data.src} not found`);
    }
  };
}

declare const __VERSION__: string;

/**
 * Loads the image shape in the given engine
 * @param engine - the engine where the image shape is going to be added
 */
export async function loadImageShape(engine: ImageEngine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    addLoadImageToEngine(e);

    e.pluginManager.addPlugin(new ImagePreloaderPlugin(e));
    e.pluginManager.addShape(shapeTypes, container => Promise.resolve(new ImageDrawer(e, container)));
  });
}
