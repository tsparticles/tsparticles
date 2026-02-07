import {
  CachePolicy,
  type Container,
  type IShapeDrawData,
  type IShapeDrawer,
  type ITextureMetadata,
  TextureColorMode,
  deepExtend,
} from "@tsparticles/engine";
import type { CardParticle } from "../CardParticle.js";
import type { ICardData } from "../ICardData.js";
import { drawRoundedCard } from "../utils.js";

export class CardDrawer implements IShapeDrawer<CardParticle> {
  draw(data: IShapeDrawData<CardParticle>): void {
    const { context, particle, opacity, radius } = data;

    if (!particle.cardData) {
      return;
    }

    const defaultOpacity = context.globalAlpha;

    context.globalAlpha = opacity;

    drawRoundedCard(
      context,
      radius,
      particle.cardData,
      particle.container.hdr,
      particle.isShowingBack(),
      particle.container.canvas.settings,
    );

    context.globalAlpha = defaultOpacity;
  }

  getDescriptor(particle: CardParticle): string {
    const cardData = particle.cardData,
      suit = cardData?.suit ?? "none",
      value = cardData?.value ?? "none",
      side = particle.isShowingBack() ? "back" : "front";

    return `card:${side}:${suit}:${value}`;
  }

  getMetadata(): ITextureMetadata {
    return {
      cachePolicy: CachePolicy.Static,
      colorMode: TextureColorMode.Multi,
    };
  }

  particleInit(_container: Container, particle: CardParticle): void {
    const shape = particle.shapeData;

    if (!shape) {
      return;
    }

    particle.cardData = deepExtend({}, shape) as ICardData;
  }
}
