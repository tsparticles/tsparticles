// Type definitions for react-tsparticles v1.15.0
// Project: https://github.com/matteobruni/react-tsparticles
// Definitions by: Matteo Bruni <https://github.com/matteobruni>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="react" />
import { ComponentClass } from "react";
import type { IParticlesProps, ParticlesProps } from "./src/";
import type { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
import type { RecursivePartial } from "tsparticles/dist/Types/RecursivePartial";
import type { IPolygonMaskOptions } from "tsparticles/dist/Plugins/PolygonMask/PolygonMaskPlugin";
import type { IAbsorberOptions } from "tsparticles/dist/Plugins/Absorbers/AbsorbersPlugin";
import type { IEmitterOptions } from "tsparticles/dist/Plugins/Emitters/EmittersPlugin";

export type IParticlesParams = RecursivePartial<IOptions & IPolygonMaskOptions & IAbsorberOptions & IEmitterOptions>;

export * from "tsparticles/dist/Enums";

export { IParticlesProps, ParticlesProps };

type Particles = ComponentClass<IParticlesProps>;

declare const Particles: Particles;

export default Particles;
