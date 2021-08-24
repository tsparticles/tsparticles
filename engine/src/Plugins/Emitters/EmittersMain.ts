import type { Main } from "../../main";
import type { IEmitterShape } from "./IEmitterShape";

export type EmittersMain = Main & {
    addEmitterShape?: (name: string, shape: IEmitterShape) => void;
};
