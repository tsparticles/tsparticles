import { type Container, type IShapeDrawData, type IShapeDrawer, deepExtend } from "@tsparticles/engine";
import type { CardParticle } from "../CardParticle.js";
import type { ICardData } from "../ICardData.js";
import { drawRoundedCard } from "../utils.js";

export class CardDrawer implements IShapeDrawer<CardParticle> {
  readonly validTypes = ["card"] as const;

  draw(data: IShapeDrawData<CardParticle>): void {
    const { context, particle, radius } = data;

    if (!particle.cardData) {
      return;
    }

    drawRoundedCard(context, radius, particle.cardData, particle.container.hdr, particle.isShowingBack());
  }

  particleInit(_container: Container, particle: CardParticle): void {
    const shape = particle.shapeData;

    if (!shape) {
      return;
    }

    particle.cardData = deepExtend({}, shape) as ICardData;
  }
}
