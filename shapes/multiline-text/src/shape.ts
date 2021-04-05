import { Utils } from "tsparticles";
import type { IShapeDrawer } from "tsparticles/dist/Core/Interfaces/IShapeDrawer";
import type { Container, SingleOrMultiple, Main, IParticle } from "tsparticles";
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

export class MultilineTextDrawer implements IShapeDrawer {
    async init(container: Container): Promise<void> {
        const options = container.options;
        const shapeType = "multiline-text";

        if (Utils.isInArray(shapeType, options.particles.shape.type)) {
            const shapeOptions = options.particles.shape.options[shapeType] as SingleOrMultiple<IMultilineTextShape>;
            if (shapeOptions instanceof Array) {
                for (const character of shapeOptions) {
                    await Utils.loadFont(character);
                }
            } else {
                if (shapeOptions !== undefined) {
                    await Utils.loadFont(shapeOptions);
                }
            }
        }
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
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
                textData instanceof Array ? Utils.itemFromArray(textData, particle.randomIndexData) : textData;
        }

        const text = textParticle.text;
        const style = character.style;
        const weight = character.weight;
        const size = Math.round(radius) * 2;
        const font = character.font;
        const fill = particle.fill;

        context.font = `${style} ${weight} ${size}px "${font}"`;

        if (fill) {
            text?.split("\n").forEach((line, index) => {
                const offsetX = (line.length * radius) / 2;

                const pos = {
                    x: -offsetX,
                    y: radius / 2,
                };

                context.fillText(line, pos.x, pos.y + radius * 2 * index);
            });
        } else {
            text?.split("\n").forEach((line, index) => {
                const offsetX = (line.length * radius) / 2;

                const pos = {
                    x: -offsetX,
                    y: radius / 2,
                };

                context.strokeText(line, pos.x, pos.y + radius * 2 * index);
            });
        }
    }
}

export function loadMultilineTextShape(tsParticles: Main): void {
    tsParticles.addShape("multiline-text", new MultilineTextDrawer());
}
