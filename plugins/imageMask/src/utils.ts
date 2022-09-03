export type RGBA = {
    a: number;
    b: number;
    g: number;
    r: number;
};

export type SliceRange = [number, number];

export class Array2D<T> {
    private array: Array<Array<T>>;
    private height!: number;
    private width!: number;

    constructor(array: Array<Array<T>>) {
        this.array = array;
        this.updateWidth();
        this.updateHeight();
    }

    forEach(callback: (item: T, x: number, y: number) => void): void {
        this.array.forEach((row: T[], y: number) => {
            row.forEach((item: T, x: number) => {
                callback(item, x, y);
            });
        });
    }

    get(x: number, y: number): T {
        return this.array[y][x];
    }

    getHeight(): number {
        return this.height;
    }

    getWidth(): number {
        return this.width;
    }

    set(x: number, y: number, value: T): void {
        if (!this.array[y]) {
            this.array[y] = [];
        }
        this.array[y][x] = value;
        this.updateWidth();
        this.updateHeight();
    }

    slice([xMin, xMax]: SliceRange, [yMin, yMax]: SliceRange): Array2D<T> {
        return new Array2D(
            this.array.slice(yMin, yMax).map((row) => {
                return row.slice(xMin, xMax);
            })
        );
    }

    private updateHeight(): void {
        this.height = this.array.length;
    }

    private updateWidth(): void {
        this.width = Math.min(...this.array.map((row) => row.length));
    }
}

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

export function getImageData(src: string): Promise<Array2D<RGBA>> {
    const image = new Image();

    image.crossOrigin = "Anonymous";

    const p = new Promise<Array2D<RGBA>>((resolve, reject) => {
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

            const pixels: RGBA[][] = [];

            let i = 0;

            while (i < imageData.length - 1) {
                const x = (i / 4) % canvas.width,
                    y = Math.floor(i / 4 / canvas.width);

                if (!pixels[y]) {
                    pixels[y] = [];
                }

                pixels[y][x] = {
                    r: imageData[i],
                    g: imageData[i + 1],
                    b: imageData[i + 2],
                    a: imageData[i + 3],
                };

                i += 4;
            }

            resolve(new Array2D(pixels));
        };
        image.onerror = reject;
    });

    image.src = src;

    return p;
}

export const range = (n: number): Array<number> => [...Array(n).keys()];
