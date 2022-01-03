import type { Engine } from "../../engine";
import type { IEmitterShape } from "./IEmitterShape";

export type EmittersMain = Engine & {
    addEmitterShape?: (name: string, shape: IEmitterShape) => void;
};
