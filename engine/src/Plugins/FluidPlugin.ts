import { Container } from "../../Core/Container";
import { IPlugin } from "../../Interfaces/IPlugin";

export class FluidPlugin implements IPlugin {
    constructor(private readonly container: Container) {}

    public init(): void {
        // Initialization logic for the plugin goes here
    }

    public draw(): void {
        // Logic for the fluid-like movement goes here
    }

    public destroy(): void {
        // Cleanup logic for the plugin goes here
    }

    public play(): void {
        // Logic to start the fluid-like movement goes here
    }

    public pause(): void {
        // Logic to pause the fluid-like movement goes here
    }
}
