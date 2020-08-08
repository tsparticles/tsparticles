import { BackgroundOptionsEditor } from "./Background/BackgroundOptionsEditor";
import { ParticlesOptionsEditor } from "./Particles/ParticlesOptionsEditor";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
import { InteractivityOptionsEditor } from "./Interactivity/InteractivityOptionsEditor";
import { BackgroundMaskOptionsEditor } from "./BackgroundMask/BackgroundMaskOptionsEditor";
import { InfectionOptionsEditor } from "./Infection/InfectionOptionsEditor";
import { EditorGroup } from "object-gui";

export class OptionsEditor {
    public readonly group: EditorGroup;
    private readonly options: IOptions;

    constructor(private readonly parent: EditorGroup, private readonly particles: Container) {
        this.group = parent.addGroup("options", "Options", undefined, false);
        this.options = this.group.data as IOptions;

        this.addBackground();
        this.addBackgroundMask();
        this.addInfection();
        this.addInteractivity();
        this.addParticles();

        this.addProperties();
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = particles.options;

        this.group.addProperty("autoPlay", "Auto Play", options.autoPlay, typeof options.autoPlay, async () => {
            await particles.refresh();
        });

        this.group.addProperty(
            "detectRetina",
            "Detect Retina",
            options.detectRetina,
            typeof options.detectRetina,
            async () => {
                await particles.refresh();
            }
        );

        this.group.addProperty("fpsLimit", "FPS Limit", options.fpsLimit, typeof options.fpsLimit, async () => {
            await particles.refresh();
        });

        this.group.addProperty(
            "pauseOnBlur",
            "Pause on Blur",
            options.pauseOnBlur,
            typeof options.pauseOnBlur,
            async () => {
                await particles.refresh();
            }
        );
    }

    private addBackground(): void {
        const options = new BackgroundOptionsEditor(this.group, this.particles);
    }

    private addBackgroundMask(): void {
        const options = new BackgroundMaskOptionsEditor(this.group, this.particles);
    }

    private addInfection(): void {
        const options = new InfectionOptionsEditor(this.group, this.particles);
    }

    private addInteractivity(): void {
        const options = new InteractivityOptionsEditor(this.group, this.particles);
    }

    private addParticles(): void {
        const options = new ParticlesOptionsEditor(this.group, this.particles);
    }
}
