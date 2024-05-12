import { type IHsl, type Particle, errorPrefix, getLogger, getStyleFromHsl } from "@tsparticles/engine";
import type { GIF } from "./GifUtils/Types/GIF.js";
import type { IImageShape } from "./IImageShape.js";

const stringStart = 0,
    defaultOpacity = 1;

/**
 * The image interface, used for keeping useful data for drawing
 */
export interface IImage {
    color?: IHsl;
    element?: HTMLImageElement;
    error: boolean;
    gif: boolean;
    gifData?: GIF;
    gifLoopCount?: number;
    loading: boolean;
    name: string;
    ratio?: number;
    replaceColor?: boolean;
    source: string;
    svgData?: string;
    type: string;
}

/**
 * The particle image, containing also some particles options
 */
export interface IParticleImage {
    color?: IHsl;
    data: IImage;
    element?: HTMLImageElement;
    gif: boolean;
    gifData?: GIF;
    gifLoopCount?: number;
    loaded?: boolean;
    ratio: number;
    replaceColor: boolean;
    source: string;
}

/**
 * The Particle extension type
 */
export type ImageParticle = Particle & {
    gifFrame?: number;
    gifLoopCount?: number;
    gifTime?: number;
    image?: IParticleImage;
};

/**
 * The color regex for replacing values in SVG data
 */
const currentColorRegex =
    /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;

/**
 * Replaces the color in SVG files when replace color is set
 * @param imageShape - the image used for replacing SVG data
 * @param color - the replace color value
 * @param opacity - the color opacity
 * @returns the new SVG data
 */
function replaceColorSvg(imageShape: IImage, color: IHsl, opacity: number): string {
    const { svgData } = imageShape;

    if (!svgData) {
        return "";
    }

    const colorStyle = getStyleFromHsl(color, opacity);

    /* set color to svg element */
    if (svgData.includes("fill")) {
        return svgData.replace(currentColorRegex, () => colorStyle);
    }

    const preFillIndex = svgData.indexOf(">");

    return `${svgData.substring(stringStart, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
}

/**
 * Loads the given image
 * @param image - the image to load
 */
export async function loadImage(image: IImage): Promise<void> {
    return new Promise<void>((resolve: () => void) => {
        image.loading = true;

        const img = new Image();

        image.element = img;

        img.addEventListener("load", () => {
            image.loading = false;

            resolve();
        });

        img.addEventListener("error", () => {
            image.element = undefined;
            image.error = true;
            image.loading = false;

            getLogger().error(`${errorPrefix} loading image: ${image.source}`);

            resolve();
        });

        img.src = image.source;
    });
}

/**
 * Downloads the SVG image data, using `fetch`
 * @param image - the image to download
 */
export async function downloadSvgImage(image: IImage): Promise<void> {
    if (image.type !== "svg") {
        await loadImage(image);

        return;
    }

    image.loading = true;

    const response = await fetch(image.source);

    if (!response.ok) {
        getLogger().error(`${errorPrefix} Image not found`);

        image.error = true;
    } else {
        image.svgData = await response.text();
    }

    image.loading = false;
}

/**
 * Replaces the color in a SVG image
 * @param image - the SVG image to replace
 * @param imageData - the image shape data
 * @param color - the replacement color
 * @param particle - the particle where the replaced data is going to be used
 * @returns the image with the color replaced
 */
export function replaceImageColor(
    image: IImage,
    imageData: IImageShape,
    color: IHsl,
    particle: Particle,
): Promise<IParticleImage> {
    const svgColoredData = replaceColorSvg(image, color, particle.opacity?.value ?? defaultOpacity),
        imageRes: IParticleImage = {
            color,
            gif: imageData.gif,
            data: {
                ...image,
                svgData: svgColoredData,
            },
            loaded: false,
            ratio: imageData.width / imageData.height,
            replaceColor: imageData.replaceColor,
            source: imageData.src,
        };

    return new Promise<IParticleImage>(resolve => {
        const svg = new Blob([svgColoredData], { type: "image/svg+xml" }), // prepare to create img with colored svg
            domUrl = URL || window.URL || window.webkitURL || window,
            url = domUrl.createObjectURL(svg),
            img = new Image();

        img.addEventListener("load", () => {
            imageRes.loaded = true;
            imageRes.element = img;

            resolve(imageRes);

            domUrl.revokeObjectURL(url);
        });

        const errorHandler = async (): Promise<void> => {
            domUrl.revokeObjectURL(url);

            const img2 = {
                ...image,
                error: false,
                loading: true,
            };

            // deepcode ignore PromiseNotCaughtGeneral: catch can be ignored
            await loadImage(img2);

            imageRes.loaded = true;
            imageRes.element = img2.element;

            resolve(imageRes);
        };

        img.addEventListener("error", () => void errorHandler());

        img.src = url;
    });
}
