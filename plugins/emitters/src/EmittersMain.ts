import type { Main } from "tsparticles-engine";
import type { IEmitterShape } from "./IEmitterShape";

export type EmittersMain = Main & {
    addEmitterShape?: (name: string, shape: IEmitterShape) => void;
};
