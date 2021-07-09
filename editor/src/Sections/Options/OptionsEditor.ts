import { BackgroundOptionsEditor } from "./Background/BackgroundOptionsEditor";
import { ParticlesOptionsEditor } from "./Particles/ParticlesOptionsEditor";
import type { Container, IOptions } from "tsparticles";
import { InteractivityOptionsEditor } from "./Interactivity/InteractivityOptionsEditor";
import { BackgroundMaskOptionsEditor } from "./BackgroundMask/BackgroundMaskOptionsEditor";
import { InfectionOptionsEditor } from "./Infection/InfectionOptionsEditor";
import { Editor, EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../EditorBase";
import { FullScreenOptionsEditor } from "./FullScreen/FullScreenOptionsEditor";
import { MotionOptionsEditor } from "./Motion/MotionOptionsEditor";

export class OptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IOptions;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup | Editor): void {
        this.group = parent.addGroup("options", "Options", true);
        this.options = this.group.data as IOptions;

        this.addBackground();
        this.addBackgroundMask();
        this.addFullScreen();
        this.addInfection();
        this.addInteractivity();
        this.addMotion();
        this.addParticles();

        this.addProperties();
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("autoPlay", "Auto Play", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("detectRetina", "Detect Retina", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("fpsLimit", "FPS Limit", EditorType.number).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("pauseOnBlur", "Pause on Blur", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group
            .addProperty("pauseOnOutsideViewport", "Pause on Outside Viewport", EditorType.boolean)
            .change(async () => {
                await particles.refresh();
            });
    }

    private addBackground(): void {
        const options = new BackgroundOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addBackgroundMask(): void {
        const options = new BackgroundMaskOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addFullScreen(): void {
        const options = new FullScreenOptionsEditor(this.particles);

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

    private addMotion(): void {
        const options = new MotionOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addParticles(): void {
        const options = new ParticlesOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }
}
