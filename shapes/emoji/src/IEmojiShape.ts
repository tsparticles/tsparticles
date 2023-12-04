import type { IShapeValues, SingleOrMultiple } from "@tsparticles/engine";

export interface IEmojiShape extends IShapeValues {
    font?: string;
    value: SingleOrMultiple<string>;
}
