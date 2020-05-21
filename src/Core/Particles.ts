import { Container } from "./Container";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IMouseData } from "./Interfaces/IMouseData";
import type { IRgb } from "./Interfaces/IRgb";
import { Particle } from "./Particle";
import { InteractionManager } from "./Particle/Interactions/Particles/InteractionManager";
import { Utils } from "../Utils/Utils";
import { HoverMode } from "../Enums/Modes/HoverMode";
import { Grabber } from "./Particle/Interactions/Mouse/Grabber";
import { ClickMode } from "../Enums/Modes/ClickMode";
import { Repulser } from "./Particle/Interactions/Mouse/Repulser";
import { DivMode } from "../Enums/Modes/DivMode";
import { Bubbler } from "./Particle/Interactions/Mouse/Bubbler";
import { Connector } from "./Particle/Interactions/Mouse/Connector";
import { QuadTree } from "../Utils/QuadTree";
import { DestroyType } from "../Enums/DestroyType";
import { Point } from "../Utils/Point";
import { Rectangle } from "../Utils/Rectangle";

/**
 * Particles manager
 */
export class Particles {
  public get count(): number {
    return this.array.length;
  }

  public array: Particle[];
  public quadTree: QuadTree;
  //public spatialGrid: SpatialGrid;
  public pushing?: boolean;
  public lineLinkedColor?: IRgb | string;
  public grabLineColor?: IRgb | string;
  public noiseZ: number;

  private readonly container: Container;
  private interactionsEnabled: boolean;

  constructor(container: Container) {
    this.container = container;
    this.array = [];
    this.interactionsEnabled = false;
    //this.spatialGrid = new SpatialGrid(this.container.canvas.size);
    const canvasSize = this.container.canvas.size;
    this.noiseZ = 0;

    this.quadTree = new QuadTree(new Rectangle(0, 0, canvasSize.width, canvasSize.height), 4);
  }

  /* --------- tsParticles functions - particles ----------- */
  public init(): void {
    const container = this.container;
    const options = container.options;
    let handled = false;
    this.noiseZ = 0;

    for (const id in container.plugins) {
      const plugin = container.plugins[id];

      if (plugin.particlesInitialization !== undefined) {
        handled = plugin.particlesInitialization();
      }

      if (handled) {
        break;
      }
    }

    if (!handled) {
      for (let i = this.count; i < options.particles.number.value; i++) {
        this.addParticle(new Particle(container));
      }
    }

    this.interactionsEnabled = options.particles.lineLinked.enable ||
      options.particles.move.attract.enable ||
      options.particles.collisions.enable ||
      options.infection.enable;

    if (options.infection.enable) {
      for (let i = 0; i < options.infection.infections; i++) {
        const notInfected = this.array.filter((p) => p.infectionStage === undefined);
        const infected = Utils.itemFromArray(notInfected);

        infected.startInfection(0);
      }
    }
  }

  public redraw(): void {
    this.clear();
    this.init();
    this.draw(0);
  }

  public removeAt(index: number, quantity?: number): void {
    if (index >= 0 && index <= this.count) {
      for (const particle of this.array.splice(index, quantity ?? 1)) {
        particle.destroy();
      }
    }
  }

  public remove(particle: Particle): void {
    this.removeAt(this.array.indexOf(particle));
  }

  public update(delta: number): void {
    const container = this.container;
    const options = container.options;
    const particlesToDelete = [];

    for (let i = 0; i < this.count; i++) {
      /* the particle */
      const particle = this.array[i];

      Bubbler.reset(particle);

      // let d = ( dx = container.interactivity.mouse.click_pos_x - p.x ) * dx +
      //         ( dy = container.interactivity.mouse.click_pos_y - p.y ) * dy;
      // let f = -BANG_SIZE / d;
      // if ( d < BANG_SIZE ) {
      //     let t = Math.atan2( dy, dx );
      //     p.vx = f * Math.cos(t);
      //     p.vy = f * Math.sin(t);
      // }

      for (const id in container.plugins) {
        const plugin = container.plugins[id];

        if (particle.destroyed) {
          break;
        }

        if (plugin.particleUpdate) {
          plugin.particleUpdate(particle, delta);
        }
      }

      if (!particle.destroyed) {
        const sizeOpt = particle.particlesOptions.size;
        const sizeAnim = sizeOpt.animation;
        if (sizeAnim.enable) {
          switch (sizeAnim.destroy) {
            case DestroyType.max:
              if (particle.size.value >= sizeOpt.value * container.retina.pixelRatio) {
                particle.destroyed = true;
              }
              break;
            case DestroyType.min:
              if (particle.size.value <= sizeAnim.minimumValue * container.retina.pixelRatio) {
                particle.destroyed = true;
              }
              break;
          }
        }
      }

      if (particle.destroyed) {
        particlesToDelete.push(particle);
        continue;
      }

      particle.update(i, delta);

      //container.particles.spatialGrid.insert(particle);

      const pos = particle.getPosition();

      container.particles.quadTree.insert(new Point(pos.x, pos.y, particle));
    }

    for (const particle of particlesToDelete) {
      this.remove(particle);
    }

    if (container.options.interactivity.events.onDiv.enable ||
      (container.options.interactivity.events.onHover.enable && container.interactivity.mouse.position) ||
      (container.options.interactivity.events.onClick.enable && container.interactivity.mouse.clickPosition)) {
      const hoverMode = options.interactivity.events.onHover.mode;
      const clickMode = options.interactivity.events.onClick.mode;
      const divMode = options.interactivity.events.onDiv.mode;

      /* mouse events interactions */
      if (Utils.isInArray(HoverMode.grab, hoverMode)) {
        Grabber.grab(container, delta);
      }

      if (Utils.isInArray(HoverMode.repulse, hoverMode) ||
        Utils.isInArray(ClickMode.repulse, clickMode) ||
        Utils.isInArray(DivMode.repulse, divMode)) {
        Repulser.repulse(container, delta);
      }

      if (Utils.isInArray(HoverMode.bubble, hoverMode) || Utils.isInArray(ClickMode.bubble, clickMode)) {
        Bubbler.bubble(container, delta);
      }

      if (Utils.isInArray(HoverMode.connect, hoverMode)) {
        Connector.connect(container, delta);
      }
    }

    // this loop is required to be done after mouse interactions
    for (const particle of this.array) {
      /* interaction auto between particles */
      if (this.interactionsEnabled) {
        InteractionManager.interact(particle, container, delta);
      }
    }
  }

  public draw(delta: number): void {
    const container = this.container;

    /* clear canvas */
    container.canvas.clear();
    const canvasSize = this.container.canvas.size;

    this.quadTree = new QuadTree(new Rectangle(0, 0, canvasSize.width, canvasSize.height), 4);

    /* update each particles param */
    //this.spatialGrid.init(this.container.canvas.size);
    this.update(delta);
    //this.spatialGrid.setGrid(this.array, this.container.canvas.size);

    this.noiseZ += 0.0004;

    /* draw polygon shape in debug mode */
    for (const id in container.plugins) {
      const plugin = container.plugins[id];

      container.canvas.drawPlugin(plugin, delta);
    }

    /*if (container.canvas.context) {
        this.quadTree.draw(container.canvas.context);
    }*/

    /* draw each particle */
    for (const p of this.array) {
      p.draw(delta);
    }
  }

  public clear(): void {
    this.array = [];
  }

  /* ---------- tsParticles functions - modes events ------------ */
  public push(nb: number, mousePosition?: IMouseData): void {
    const container = this.container;
    const options = container.options;
    const limit = options.particles.number.limit * container.density;

    this.pushing = true;

    if (limit > 0) {
      const countToRemove = this.count + nb - limit;

      if (countToRemove > 0) {
        this.removeQuantity(countToRemove);
      }
    }

    let pos: ICoordinates | undefined;

    if (mousePosition) {
      pos = mousePosition.position ?? { x: 0, y: 0 };
    }

    for (let i = 0; i < nb; i++) {
      this.addParticle(new Particle(container, pos));
    }

    if (!options.particles.move.enable) {
      this.container.play();
    }

    this.pushing = false;
  }

  public addParticle(particle: Particle): void {
    this.array.push(particle);
  }

  public removeQuantity(quantity: number): void {
    const container = this.container;
    const options = container.options;

    this.removeAt(0, quantity);

    if (!options.particles.move.enable) {
      this.container.play();
    }
  }
}
