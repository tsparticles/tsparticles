import { type IShapeDrawData, type IShapeDrawer, deepExtend } from "@tsparticles/engine";
import type { CardParticle } from "../CardParticle.js";
import type { ICardData } from "../ICardData.js";
import { drawRoundedCard } from "../utils.js";

export class CardDrawer implements IShapeDrawer<CardParticle> {
  draw(data: IShapeDrawData<CardParticle>): void {
    const { container, context, particle, opacity, radius } = data;

    if (!particle.cardData) {
      return;
    }

    const defaultOpacity = context.globalAlpha;

    context.globalAlpha = opacity;

    drawRoundedCard(
      context,
      radius,
      particle.cardData,
      container.hdr,
      particle.isShowingBack(),
      container.canvas.settings,
    );

    context.globalAlpha = defaultOpacity;
  }

  particleInit(particle: CardParticle): void {
    const shape = particle.shapeData;

    if (!shape) {
      return;
    }

    particle.cardData = deepExtend({}, shape) as ICardData;
  }
}
