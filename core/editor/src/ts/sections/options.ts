import { EditorContainer } from "../editors/EditorContainer";

export class OptionsEditor {
    public readonly container: EditorContainer;

    constructor(private readonly parent: EditorContainer) {
        this.container = parent.addContainer("options", "Options");

        this.addBackground();
        this.addBackgroundMask();
        this.addInteractivity();
        this.addInfection();
        this.addParticles();

        this.addProperties();
    }

    private addProperties(): void {
        this.container.addProperty("fpsLimit", "FPS Limit");
        this.container.addProperty("detectRetina", "Detect Retina");
        this.container.addProperty("pauseOnBlur", "Pause on Blur");
    }

    private addBackground(): void {}

    private addBackgroundMask(): void {}

    private addInteractivity(): void {}

    private addInfection(): void {}

    private addParticles(): void {}
}
