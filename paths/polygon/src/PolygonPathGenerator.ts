import type { Container, ICoordinates, IMovePathGenerator } from "tsparticles-engine";
import type { IPolygonPathOptions } from "./IPolygonPathOptions";
import type { PolygonPathParticle } from "./PolygonPathParticle";
import { Vector } from "tsparticles-engine";

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

    generate(p: PolygonPathParticle): Vector {
        if (p.hexStep === undefined) {
            p.hexStep = 0;
        }

        if (p.hexDirection === undefined) {
            p.hexDirection =
                this.options.sides === 6 ? ((Math.random() * 3) | 0) * 2 : (Math.random() * this.options.sides) | 0;
        }

        if (p.hexSpeed === undefined) {
            p.hexSpeed = p.velocity.length;
        }

        if (p.hexStep % this.options.turnSteps === 0) {
            p.hexDirection =
                Math.random() > 0.5
                    ? (p.hexDirection + 1) % this.options.sides
                    : (p.hexDirection + this.options.sides - 1) % this.options.sides;
        }

        p.velocity.x = 0;
        p.velocity.y = 0;

        p.hexStep++;

        return Vector.create(
            this.dirsList[p.hexDirection].x * p.hexSpeed,
            this.dirsList[p.hexDirection].y * p.hexSpeed
        );
    }

    init(container: Container): void {
        const options = container.actualOptions.particles.move.path.options;

        this.options.sides = (options.sides as number) > 0 ? (options.sides as number) : 6;
        this.options.angle = (options.angle as number) ?? 30;
        this.options.turnSteps = (options.turnSteps as number) >= 0 ? (options.turnSteps as number) : 20;

        this.createDirs();
    }

    update(): void {
        // do nothing
    }

    private createDirs(): void {
        this.dirsList = [];

        for (let i = 0; i < 360; i += 360 / this.options.sides) {
            const angle = this.options.angle + i;

            this.dirsList.push(Vector.create(Math.cos((angle * Math.PI) / 180), Math.sin((angle * Math.PI) / 180)));
        }
    }
}
