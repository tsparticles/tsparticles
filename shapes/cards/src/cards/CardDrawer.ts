import { type Container, type IShapeDrawData, type IShapeDrawer, deepExtend } from "@tsparticles/engine";
import type { CardParticle } from "../CardParticle.js";
import type { ICardData } from "../ICardData.js";
import { drawRoundedCard } from "../utils.js";

/** Card drawer plugin */
export class CardDrawer implements IShapeDrawer<CardParticle> {
  /** The particles container */
  readonly #container;

  /**
   * CardDrawer constructor
   * @param container - The container to handle
   */
  constructor(container: Container) {
    this.#container = container;
  }

  /**
   * Draws the card shape
   * @param data - The data to handle
   */
  draw(data: IShapeDrawData<CardParticle>): void {
    const { context, particle, opacity, radius } = data;

    if (!particle.cardData) {
      return;
    }

    const defaultOpacity = context.globalAlpha,
      container = this.#container;

    context.globalAlpha = opacity;

    drawRoundedCard(
      context,
      radius,
      particle.cardData,
      container.hdr,
      particle.isShowingBack(),
      container.canvas.render.settings,
    );

    context.globalAlpha = defaultOpacity;
  }

  /**
   * Initializes the card shape on the particle
   * @param _container - The container to handle
   * @param particle - The particle to process
   */
  particleInit(_container: Container, particle: CardParticle): void {
    const shape = particle.shapeData;

    if (!shape) {
      return;
    }

    particle.cardData = deepExtend({}, shape) as ICardData;
  }
}
