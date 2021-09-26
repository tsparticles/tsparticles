/**
 * @category Interfaces
 */
import type { IHsl, IParticle } from "tsparticles-engine";
import { getStyleFromHsl } from "tsparticles-engine";

export interface IImage {
    source: string;
    type: string;
    element?: HTMLImageElement;
    svgData?: string;
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

export function loadImage(source: string): Promise<IImage | undefined> {
    return new Promise(
        (resolve: (value?: IImage | PromiseLike<IImage> | undefined) => void, reject: (reason?: string) => void) => {
            if (!source) {
                reject("Error tsParticles - No image.src");
                return;
            }

            const image: IImage = {
                source: source,
                type: source.substr(source.length - 3),
            };

            const img = new Image();

            img.addEventListener("load", () => {
                image.element = img;

                resolve(image);
            });

            img.addEventListener("error", () => {
                reject(`Error tsParticles - loading image: ${source}`);
            });

            img.src = source;
        }
    );
}

export async function downloadSvgImage(source: string): Promise<IImage | undefined> {
    if (!source) {
        throw new Error("Error tsParticles - No image.src");
    }

    const image: IImage = {
        source: source,
        type: source.substr(source.length - 3),
    };

    if (image.type !== "svg") {
        return loadImage(source);
    }

    const response = await fetch(image.source);

    if (!response.ok) {
        throw new Error("Error tsParticles - Image not found");
    }

    image.svgData = await response.text();

    return image;
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
