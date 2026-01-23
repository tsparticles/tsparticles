import type { ICardData } from "./ICardData.js";
import type { Particle } from "@tsparticles/engine";

export type CardParticle = Particle & {
  cardData?: ICardData;
};
