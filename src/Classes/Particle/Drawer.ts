"use strict";

import {Bubbler} from "./Bubbler";
import {Container} from "../Container";
import {ISide} from "../../Interfaces/ISide";
import {ICoordinates} from "../../Interfaces/ICoordinates";
import {Particle} from "../Particle";
import {ShapeType} from "../../Enums/ShapeType";

/**
 * Particle draw manager
 */
export class Drawer {
    private readonly particle: Particle;
    private readonly container: Container;
    private readonly text?: string;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public draw(): void {
        const container = this.container;
        const particle = this.particle;

        container.canvas.drawParticle(particle);
    }
}
