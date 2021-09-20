import type { Container, ICoordinates, IMovePathGenerator } from "tsparticles-engine";
import type { PolygonPathParticle } from "./PolygonPathParticle";
import { Vector } from "tsparticles-engine";

const dirsList: ICoordinates[] = [];

const cfg = {
    sides: 6,
    turnSteps: 20,
    angle: 30,
};

function createDirs() {
    for (let i = 0; i < 360; i += 360 / cfg.sides) {
        const angle = cfg.angle + i;
        const x = Math.cos((angle * Math.PI) / 180);
        const y = Math.sin((angle * Math.PI) / 180);

        dirsList.push({ x, y });
    }
}

class PolygonPathGenerator implements IMovePathGenerator {
    generate(p: PolygonPathParticle) {
        if (p.hexStep === undefined) {
            p.hexStep = 0;
        }

        if (p.hexDirection === undefined) {
            p.hexDirection = cfg.sides === 6 ? ((Math.random() * 3) | 0) * 2 : (Math.random() * cfg.sides) | 0;
        }

        if (p.hexSpeed === undefined) {
            p.hexSpeed = p.velocity.length;
        }

        if (p.hexStep % cfg.turnSteps === 0) {
            p.hexDirection =
                Math.random() > 0.5 ? (p.hexDirection + 1) % cfg.sides : (p.hexDirection + cfg.sides - 1) % cfg.sides;
        }

        p.velocity.x = 0;
        p.velocity.y = 0;

        p.hexStep++;

        return Vector.create(dirsList[p.hexDirection].x * p.hexSpeed, dirsList[p.hexDirection].y * p.hexSpeed);
    }

    init(container: Container) {
        const options = container.actualOptions.particles.move.path.options;

        cfg.sides = (options.sides as number) || 6;
        cfg.angle = (options.angle as number) || 30;
        cfg.turnSteps = (options.turnSteps as number) || 20;

        createDirs();
    }

    update() {
        // do nothing
    }
}

export const polygonPathGenerator = new PolygonPathGenerator();
