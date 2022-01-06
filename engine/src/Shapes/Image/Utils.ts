/**
 * @category Interfaces
 */
import type { IHsl, IParticle } from "../../Core/Interfaces";
import { getStyleFromHsl } from "../../Utils";

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
    image: IParticleImage;
};

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

export function replaceColorSvg(imageShape: IImage, color: IHsl, opacity: number): string {
    const { svgData } = imageShape;
    if (!svgData) {
        return "";
    }

    /* set color to svg element */
    if (svgData.includes("fill")) {
        const currentColor =
            /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;

        return svgData.replace(currentColor, () => getStyleFromHsl(color, opacity));
    }

    const preFillIndex = svgData.indexOf(">");

    return `${svgData.substring(0, preFillIndex)} fill="${getStyleFromHsl(color, opacity)}"${svgData.substring(
        preFillIndex
    )}`;
}
