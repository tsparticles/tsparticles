import type { Container, IContainerPlugin } from "tsparticles-core";
import { Infecter } from "./Infecter";
import { itemFromArray } from "tsparticles-core";

export class InfectionInstance implements IContainerPlugin {
    public readonly infecter: Infecter;

    constructor(private readonly container: Container) {
        this.infecter = new Infecter(this.container);
    }

    public particlesSetup(): void {
        for (let i = 0; i < this.container.options.infection.infections; i++) {
            const notInfected = this.container.particles.array.filter((p) => p.infection.stage === undefined);
            const infected = itemFromArray(notInfected);

            this.infecter.startInfection(infected, 0);
        }
    }
}
