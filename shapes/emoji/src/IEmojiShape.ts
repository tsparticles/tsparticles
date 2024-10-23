import type { IShapeValues, SingleOrMultiple } from "@tsparticles/engine";

export interface ISingleEmojiShape {
    font?: string;
    padding?: number;
    value: string;
}

export interface IEmojiShape extends IShapeValues {
    font?: string;
    padding?: number;
    value: SingleOrMultiple<string | ISingleEmojiShape>;
}
