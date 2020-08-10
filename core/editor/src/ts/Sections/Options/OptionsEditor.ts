import { BackgroundOptionsEditor } from "./Background/BackgroundOptionsEditor";
import { ParticlesOptionsEditor } from "./Particles/ParticlesOptionsEditor";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
import { InteractivityOptionsEditor } from "./Interactivity/InteractivityOptionsEditor";
import { BackgroundMaskOptionsEditor } from "./BackgroundMask/BackgroundMaskOptionsEditor";
import { InfectionOptionsEditor } from "./Infection/InfectionOptionsEditor";
import { EditorGroup } from "object-gui";
import { EditorBase } from "../../EditorBase";

export class OptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IOptions;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
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
        const options = new BackgroundOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addBackgroundMask(): void {
        const options = new BackgroundMaskOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addInfection(): void {
        const options = new InfectionOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addInteractivity(): void {
        const options = new InteractivityOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addParticles(): void {
        const options = new ParticlesOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }
}
