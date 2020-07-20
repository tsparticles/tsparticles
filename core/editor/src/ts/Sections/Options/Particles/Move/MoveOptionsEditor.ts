import type { EditorContainer } from "../../../../Editors/EditorContainer";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IParticlesNumber } from "tsparticles/dist/Options/Interfaces/Particles/IParticlesNumber";
import { IMove } from "tsparticles/dist/Options/Interfaces/Particles/IMove";

export class MoveOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IMove) {
        this.container = parent.addContainer("move", "Move", true);
        this.particles = this.container.particles;

        this.addMove();
    }

    private addMove(): void {
        const particles = this.container.particles;
        const options = this.options;

        this.container.addProperty(
            "angle",
            "Angle",
            options.angle,
            typeof options.angle,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.angle = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "enable",
            "Enable",
            options.enable,
            typeof options.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.enable = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "speed",
            "Speed",
            options.speed,
            typeof options.speed,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.speed = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "warp",
            "Warp",
            options.warp,
            typeof options.warp,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.warp = value;

                    await particles.refresh();
                }
            }
        );
    }
}
