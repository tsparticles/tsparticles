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
        const options = this.container.container.options;

        this.container.addProperty(
            "fpsLimit",
            "FPS Limit",
            typeof options.fpsLimit,
            (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.fpsLimit = value;
                }
            }
        );
        this.container.addProperty(
            "detectRetina",
            "Detect Retina",
            typeof options.detectRetina,
            (value: string | number | boolean) => {
                if (typeof value === "boolean") {
                    options.detectRetina = value;
                }
            }
        );
        this.container.addProperty(
            "pauseOnBlur",
            "Pause on Blur",
            typeof options.pauseOnBlur,
            (value: string | number | boolean) => {
                if (typeof value === "boolean") {
                    options.pauseOnBlur = value;
                }
            }
        );
    }

    private addBackground(): void {}

    private addBackgroundMask(): void {}

    private addInteractivity(): void {}

    private addInfection(): void {}

    private addParticles(): void {}
}
