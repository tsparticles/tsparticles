import type { Container, IOptions, Options } from "@tsparticles/engine";
import type { IPoisson } from "./Options/Interfaces/IPoisson.js";
import type { Poisson } from "./Options/Classes/Poisson.js";

export type IPoissonOptions = IOptions & {
  poisson: IPoisson;
};

export type PoissonOptions = Options & {
  poisson?: Poisson;
};

export type PoissonContainer = Container & {
  actualOptions: PoissonOptions;
};
