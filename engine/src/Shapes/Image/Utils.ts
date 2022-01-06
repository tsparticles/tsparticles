/**
 * @category Interfaces
 */
import type { IHsl, IParticle } from "../../Core/Interfaces";
import { getStyleFromHsl } from "../../Utils";
import type { IImageShape } from "../../Options/Interfaces/Particles/Shape/IImageShape";
import type { Particle } from "../../Core/Particle";

export interface IImage {
    source: string;
    type: string;
    element?: HTMLImageElement;
    svgData?: string;
    error: boolean;
    loading: boolean;
}

export interface IParticleImage {
    source: string;
    data: IImage;
    ratio: number;
    element?: HTMLImageElement;
    loaded?: boolean;
    replaceColor: boolean;
}

export interface ContainerImage {
    id: string;
    images: IImage[];
}

export type IImageParticle = IParticle & {
    image?: IParticleImage;
};

const currentColorRegex =
    /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;

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
