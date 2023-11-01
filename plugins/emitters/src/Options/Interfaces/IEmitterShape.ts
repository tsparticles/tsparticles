import type { EmitterShapeType } from "../../Enums/EmitterShapeType.js";

export interface IEmitterShape {
    options: Record<string, unknown>;
    type: EmitterShapeType | keyof typeof EmitterShapeType;
}
