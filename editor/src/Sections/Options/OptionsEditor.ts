import type { Container, IOptions } from "tsparticles-engine";
import type { Editor, EditorGroup } from "object-gui";
import { BackgroundMaskOptionsEditor } from "./BackgroundMask/BackgroundMaskOptionsEditor";
import { BackgroundOptionsEditor } from "./Background/BackgroundOptionsEditor";
import { EditorBase } from "../../EditorBase";
import { EditorType } from "object-gui";
import { FullScreenOptionsEditor } from "./FullScreen/FullScreenOptionsEditor";
import { InfectionOptionsEditor } from "./Infection/InfectionOptionsEditor";
import { InteractivityOptionsEditor } from "./Interactivity/InteractivityOptionsEditor";
import { MotionOptionsEditor } from "./Motion/MotionOptionsEditor";
import { ParticlesOptionsEditor } from "./Particles/ParticlesOptionsEditor";
import { editorChangedEvent } from "../../Utils";
import { tsParticles } from "tsparticles-engine";

export class OptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IOptions;

    constructor(particles: () => Container) {
        super(particles);

        tsParticles.addEventListener(editorChangedEvent, async (): Promise<void> => {
            await particles().refresh();

            this.options = (): IOptions => particles().options;
        });
    }

    addToGroup(parent: EditorGroup | Editor): void {
        this.group = parent.addGroup("options", "Options", true);
        this.options = (() => this.group.data()) as () => IOptions;

        this.addBackground();
        this.addBackgroundMask();
        this.addFullScreen();
        this.addInfection();
        this.addInteractivity();
        this.addMotion();
        this.addParticles();

        this.addProperties();
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

    private addProperties(): void {
        this.group.addProperty("autoPlay", "Auto Play", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("detectRetina", "Detect Retina", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("fpsLimit", "FPS Limit", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("pauseOnBlur", "Pause on Blur", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group
            .addProperty("pauseOnOutsideViewport", "Pause on Outside Viewport", EditorType.boolean)
            .change(async () => {
                await this.particles().refresh();
            });
    }
}
