import type { EditorContainer } from "../../Editors/EditorContainer";
import { BackgroundOptionsEditor } from "./Background/BackgroundOptionsEditor";
import { ParticlesOptionsEditor } from "./Particles/ParticlesOptionsEditor";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";

export class OptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;
    private readonly options: IOptions;

    constructor(private readonly parent: EditorContainer) {
        this.container = parent.addContainer("options", "Options");
        this.particles = this.container.particles;
        this.options = this.particles.options;

        this.addBackground();
        this.addBackgroundMask();
        this.addInteractivity();
        this.addInfection();
        this.addParticles();

        this.addProperties();
    }

    private addProperties(): void {
        const particles = this.container.particles;
        const options = particles.options;

        this.container.addProperty(
            "fpsLimit",
            "FPS Limit",
            options.fpsLimit,
            typeof options.fpsLimit,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.fpsLimit = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "detectRetina",
            "Detect Retina",
            options.detectRetina,
            typeof options.detectRetina,
            async (value: string | number | boolean) => {
                if (typeof value === "boolean") {
                    options.detectRetina = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "pauseOnBlur",
            "Pause on Blur",
            options.pauseOnBlur,
            typeof options.pauseOnBlur,
            async (value: string | number | boolean) => {
                if (typeof value === "boolean") {
                    options.pauseOnBlur = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addBackground(): void {
        const options = new BackgroundOptionsEditor(this.container, this.options.background);
    }

    private addBackgroundMask(): void {}

    private addInteractivity(): void {}

    private addInfection(): void {}

    private addParticles(): void {
        const options = new ParticlesOptionsEditor(this.container, this.options.particles);
    }
}
