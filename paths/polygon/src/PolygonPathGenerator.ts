/* eslint-disable @typescript-eslint/no-magic-numbers */

import { type Container, type ICoordinates, type IMovePathGenerator, Vector, getRandom } from "@tsparticles/engine";
import type { IPolygonPathOptions } from "./IPolygonPathOptions.js";
import type { PolygonPathParticle } from "./PolygonPathParticle.js";

export class PolygonPathGenerator implements IMovePathGenerator {
    dirsList: ICoordinates[];
    readonly options: IPolygonPathOptions;

    constructor() {
        this.dirsList = [];
        this.options = {
            sides: 6,
            turnSteps: 20,
            angle: 30,
        };
    }

    generate(p: PolygonPathParticle): Promise<Vector> {
        const { sides } = this.options;

        if (p.hexStep === undefined) {
            p.hexStep = 0;
        }

        if (p.hexDirection === undefined) {
            p.hexDirection = sides === 6 ? ((getRandom() * 3) | 0) * 2 : (getRandom() * sides) | 0;
        }

        if (p.hexSpeed === undefined) {
            p.hexSpeed = p.velocity.length;
        }

        if (p.hexStep % this.options.turnSteps === 0) {
            p.hexDirection = getRandom() > 0.5 ? (p.hexDirection + 1) % sides : (p.hexDirection + sides - 1) % sides;
        }

        p.velocity.x = 0;
        p.velocity.y = 0;

        p.hexStep++;

        const direction = this.dirsList[p.hexDirection];

        return Promise.resolve(Vector.create(direction.x * p.hexSpeed, direction.y * p.hexSpeed));
    }

    async init(container: Container): Promise<void> {
        const options = container.actualOptions.particles.move.path.options;

        this.options.sides = (options.sides as number) > 0 ? (options.sides as number) : 6;
        this.options.angle = (options.angle as number) ?? 30;
        this.options.turnSteps = (options.turnSteps as number) >= 0 ? (options.turnSteps as number) : 20;

        this._createDirs();

        await Promise.resolve();
    }

    reset(particle: PolygonPathParticle): void {
        delete particle.hexStep;
        delete particle.hexDirection;
        delete particle.hexSpeed;
    }

    update(): void {
        // do nothing
    }

    private readonly _createDirs: () => void = () => {
        this.dirsList = [];

        for (let i = 0; i < 360; i += 360 / this.options.sides) {
            const angle = this.options.angle + i;

            this.dirsList.push(Vector.create(Math.cos((angle * Math.PI) / 180), Math.sin((angle * Math.PI) / 180)));
        }
    };
}
