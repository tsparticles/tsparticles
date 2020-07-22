import { EditorContainer } from "../../../Editors/EditorContainer";
import { Container } from "tsparticles/dist/Core/Container";
import { IInteractivity } from "tsparticles/dist/Options/Interfaces/Interactivity/IInteractivity";
import { InteractivityDetect } from "tsparticles";
import { EditorSelectInput } from "../../../Editors/EditorSelectInput";
import { ModesOptionsEditor } from "./Modes/ModesOptionsEditor";
import { EventsOptionsEditor } from "./Events/EventsOptionsEditor";

export class InteractivityOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IInteractivity) {
        this.container = parent.addContainer("interactivity", "Interactivity", true);
        this.particles = this.container.particles;

        this.addEvents();
        this.addModes();

        this.addProperties();
    }

    private addModes(): void {
        const options = new ModesOptionsEditor(this.container, this.options.modes);
    }

    private addEvents(): void {
        const options = new EventsOptionsEditor(this.container, this.options.events);
    }

    private addProperties(): void {
        const particles = this.container.particles;

        const selectDetect = this.container.addProperty(
            "detectsOn",
            "Detects On",
            this.options.detectsOn,
            "select",
            async (value: string | number | boolean) => {
                if (
                    value === InteractivityDetect.canvas ||
                    value === InteractivityDetect.window ||
                    value === InteractivityDetect.parent
                ) {
                    this.options.detectsOn = value;

                    await particles.refresh();
                }
            }
        ) as EditorSelectInput;

        selectDetect.addItem(InteractivityDetect.canvas, InteractivityDetect.canvas);
        selectDetect.addItem(InteractivityDetect.parent, InteractivityDetect.parent);
        selectDetect.addItem(InteractivityDetect.window, InteractivityDetect.window);
    }
}
