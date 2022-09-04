import type { IRgba } from "tsparticles-engine";

export type ImagePixelData = {
    height: number;
    pixels: IRgba[][];
    width: number;
};

export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function getImageData(src: string, offset: number): Promise<ImagePixelData> {
    const image = new Image();

    image.crossOrigin = "Anonymous";

    const p = new Promise<ImagePixelData>((resolve, reject) => {
        image.onload = (): void => {
            const canvas = document.createElement("canvas");

            canvas.width = image.width;
            canvas.height = image.height;

            const context = canvas.getContext("2d");

            if (!context) {
                return reject(new Error("Could not get canvas context"));
            }

            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

            context.clearRect(0, 0, canvas.width, canvas.height);

            const pixels: IRgba[][] = [];

            let i = 0;

            while (i < imageData.length - 1) {
                const pos = {
                    x: (i / offset) % canvas.width,
                    y: Math.floor(i / offset / canvas.width),
                };

                if (!pixels[pos.y]) {
                    pixels[pos.y] = [];
                }

                pixels[pos.y][pos.x] = {
                    r: imageData[i],
                    g: imageData[i + 1],
                    b: imageData[i + 2],
                    a: imageData[i + 3],
                };

                i += offset;
            }

            const res = { pixels, width: Math.min(...pixels.map((row) => row.length)), height: pixels.length };

            console.log(res);

            resolve(res);
        };
        image.onerror = reject;
    });

    image.src = src;

    return p;
}

export const range = (n: number): Array<number> => [...Array(n).keys()];
