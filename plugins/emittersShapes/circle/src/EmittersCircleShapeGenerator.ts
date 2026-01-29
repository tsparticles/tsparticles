import type { Container, ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape, IEmitterShapeGenerator } from "@tsparticles/plugin-emitters";
import { EmittersCircleShape } from "./EmittersCircleShape.js";

export class EmittersCircleShapeGenerator implements IEmitterShapeGenerator {
  generate(
    _container: Container,
    position: ICoordinates,
    size: IDimension,
    fill: boolean,
    options: unknown,
  ): IEmitterShape {
    return new EmittersCircleShape(position, size, fill, options);
  }
}
