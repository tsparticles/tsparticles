import { type IImage, shapeTypes } from "./Utils.js";
import type { ImageContainer, ImageEngine } from "./types.js";
import type { IPreload } from "./Options/Interfaces/IPreload.js";

const extLength = 3;

/**
 *
 * @param engine -
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
        gif: data.gif,
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

      if (data.gif) {
        const { loadGifImage } = await import("./GifUtils/Utils.js");

        imageFunc = (img): Promise<void> => loadGifImage(img, { colorSpace: "srgb" });
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

declare const __VERSION__: string;

/**
 * Loads the image shape in the given engine
 * @param engine - the engine where the image shape is going to be added
 */
export async function loadImageShape(engine: ImageEngine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { ImagePreloaderPlugin } = await import("./ImagePreloader.js");

    addLoadImageToEngine(e);

    e.addPlugin(new ImagePreloaderPlugin(e));
    e.addShape(shapeTypes, async () => {
      const { ImageDrawer } = await import("./ImageDrawer.js");

      return new ImageDrawer(e);
    });
  });
}
