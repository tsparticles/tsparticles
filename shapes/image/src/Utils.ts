import type { IHsl, IParticle, Particle } from "tsparticles-engine";
import type { IImageShape } from "./IImageShape";
import { getStyleFromHsl } from "tsparticles-engine";

/**
 * @category Interfaces
 */

/**
 * The image interface, used for keeping useful data for drawing
 */
export interface IImage {
    source: string;
    type: string;
    element?: HTMLImageElement;
    svgData?: string;
    error: boolean;
    loading: boolean;
}

/**
 * The particle image, containing also some particles options
 */
export interface IParticleImage {
    source: string;
    data: IImage;
    ratio: number;
    element?: HTMLImageElement;
    loaded?: boolean;
    replaceColor: boolean;
}

/*
 * The container image collection
 */
export interface ContainerImage {
    /**
     * The container id, used key
     */
    id: string;

    /**
     * The image collection of the given container
     */
    images: IImage[];
}

/**
 * The Particle extension type
 */
export type IImageParticle = IParticle & {
    image?: IParticleImage;
};

/**
 * The color regex for replacing values in SVG data
 */
const currentColorRegex =
    /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;

/**
 * Replaces the color in SVG files when replace color is set
 * @param imageShape the image used for replacing SVG data
 * @param color the replace color value
 * @param opacity the color opacity
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

    return `${svgData.substring(0, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
}

/**
 * Loads the given image
 * @param image the image to load
 */
export async function loadImage(image: IImage): Promise<void> {
    return new Promise((resolve: () => void) => {
        image.loading = true;

        const img = new Image();

        img.addEventListener("load", () => {
            image.element = img;
            image.loading = false;

            resolve();
        });

        img.addEventListener("error", () => {
            image.error = true;
            image.loading = false;

            console.error(`Error tsParticles - loading image: ${image.source}`);

            resolve();
        });

        img.src = image.source;
    });
}

/**
 * Downloads the SVG image data, using `fetch`
 * @param image the image to download
 */
export async function downloadSvgImage(image: IImage): Promise<void> {
    if (image.type !== "svg") {
        await loadImage(image);

        return;
    }

    image.loading = true;

    const response = await fetch(image.source);

    image.loading = false;

    if (!response.ok) {
        console.error("Error tsParticles - Image not found");

        image.error = true;
    }

    if (!image.error) {
        image.svgData = await response.text();
    }
}

/**
 * Replaces the color in a SVG image
 * @param image the SVG image to replace
 * @param imageData the image shape data
 * @param color the replace color
 * @param particle the particle where the replaced data is going to be used
 */
export function replaceImageColor(
    image: IImage,
    imageData: IImageShape,
    color: IHsl,
    particle: Particle
): IParticleImage {
    const svgColoredData = replaceColorSvg(image, color, particle.opacity?.value ?? 1);

    /* prepare to create img with colored svg */
    const svg = new Blob([svgColoredData], { type: "image/svg+xml" });
    const domUrl = URL || window.URL || window.webkitURL || window;
    const url = domUrl.createObjectURL(svg);

    /* create particle img obj */
    const img = new Image();

    const imageRes: IParticleImage = {
        data: {
            ...image,
            svgData: svgColoredData,
        },
        ratio: imageData.width / imageData.height,
        replaceColor: imageData.replaceColor ?? imageData.replace_color,
        source: imageData.src,
    };

    img.addEventListener("load", () => {
        const pImage = (particle as IImageParticle).image;

        if (pImage) {
            pImage.loaded = true;
            image.element = img;
        }

        domUrl.revokeObjectURL(url);
    });

    img.addEventListener("error", () => {
        domUrl.revokeObjectURL(url);

        const img2 = {
            ...image,
            error: false,
            loading: true,
        };

        // deepcode ignore PromiseNotCaughtGeneral: catch can be ignored
        loadImage(img2).then(() => {
            const pImage = (particle as IImageParticle).image;

            if (pImage) {
                image.element = img2.element;

                pImage.loaded = true;
            }
        });
    });

    img.src = url;

    return imageRes;
}
