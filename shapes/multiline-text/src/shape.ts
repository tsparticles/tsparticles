import { tsParticles } from "tsparticles";
import type { IParticle } from "tsparticles/dist/Core/Interfaces/IParticle";
import type { IShapeDrawer } from "tsparticles/dist/Core/Interfaces/IShapeDrawer";
import type { Container } from "tsparticles/dist/Core/Container";
import type { SingleOrMultiple } from "tsparticles/dist/Types/SingleOrMultiple";
import type { IShapeValues } from "tsparticles/dist/Options/Interfaces/Particles/Shape/IShapeValues";

type CSSOMString = string;
type FontFaceLoadStatus = "unloaded" | "loading" | "loaded" | "error";
type FontFaceSetStatus = "loading" | "loaded";

interface FontFace {
    family: CSSOMString;
    style: CSSOMString;
    weight: CSSOMString;
    stretch: CSSOMString;
    unicodeRange: CSSOMString;
    variant: CSSOMString;
    featureSettings: CSSOMString;
    variationSettings: CSSOMString;
    display: CSSOMString;
    readonly status: FontFaceLoadStatus;
    readonly loaded: Promise<FontFace>;

    load(): Promise<FontFace>;
}

interface FontFaceSet {
    readonly status: FontFaceSetStatus;
    readonly ready: Promise<FontFaceSet>;

    check(font: string, text?: string): boolean;

    load(font: string, text?: string): Promise<FontFace[]>;
}

declare global {
    interface Document {
        fonts: FontFaceSet;
    }
}

interface IMultilineTextShape extends IShapeValues {
    value: SingleOrMultiple<string>;
    font: string;
    style: string;
    weight: string;
}

interface MultilineTextParticle extends IParticle {
    text?: string;
}

function arrayRandomIndex<T>(array: T[]): number {
    return Math.floor(Math.random() * array.length);
}

function isInArray<T>(value: T, array: SingleOrMultiple<T>): boolean {
    return value === array || (array instanceof Array && array.indexOf(value) > -1);
}

function itemFromArray<T>(array: T[], index?: number): T {
    return array[index !== undefined ? index : arrayRandomIndex(array)];
}

async function loadFont(character: IMultilineTextShape): Promise<void> {
    try {
        console.log('load font', character);

        await document.fonts.load(`${character.weight} 36px '${character.font}'`);
    } catch {
        // ignores any error
    }
}

export class MultilineTextDrawer implements IShapeDrawer {
    public async init(container: Container): Promise<void> {
        const options = container.options;
        const shapeType = "multiline-text";

        if (isInArray(shapeType, options.particles.shape.type)) {
            const shapeOptions = options.particles.shape.options[shapeType] as SingleOrMultiple<IMultilineTextShape>;
            if (shapeOptions instanceof Array) {
                for (const character of shapeOptions) {
                    await loadFont(character);
                }
            } else {
                if (shapeOptions !== undefined) {
                    await loadFont(shapeOptions);
                }
            }
        }
    }

    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        const character = particle.shapeData as IMultilineTextShape;

        if (character === undefined) {
            return;
        }

        const textData = character.value;

        if (textData === undefined) {
            return;
        }

        const textParticle = particle as MultilineTextParticle;

        if (textParticle.text === undefined) {
            textParticle.text =
                textData instanceof Array ? itemFromArray(textData, particle.randomIndexData) : textData;
        }

        const text = textParticle.text;
        const style = character.style;
        const weight = character.weight;
        const size = Math.round(radius) * 2;
        const font = character.font;
        const fill = particle.fill;

        context.font = `${style} ${weight} ${size}px "${font}"`;

        const pos = {
            x: -radius / 2,
            y: radius / 2,
        };

        if (fill) {
            text?.split('\n').forEach((line, index) => {
                context.fillText(line, pos.x, pos.y + radius * 2 * index);
            });
        } else {
            text?.split('\n').forEach((line, index) => {
                context.strokeText(line, pos.x, pos.y + radius * 2 * index);
            });
        }
    }
}

tsParticles.addShape('multiline-text', new MultilineTextDrawer());