import type { Container } from "tsparticles/dist/Core/Container";
import type { IClickEvent } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IClickEvent";
import { EditorSelectInput, EditorContainer } from "object-gui";
import { AbsorberClickMode, ClickMode, EmitterClickMode } from "tsparticles";

export class ClickEventsOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IClickEvent) {
        this.container = parent.addContainer("onClick", "Click Events");
        this.particles = this.container.data as Container;

        this.addClick();
    }

    private addClick(): void {
        const particles = this.particles;
        const options = this.options;
        const clickContainer = this.container;

        clickContainer.addProperty(
            "enable",
            "Enable",
            options.enable,
            typeof options.enable,
            async (value: string | number | boolean) => {
                if (typeof value === "boolean") {
                    options.enable = value;

                    await particles.refresh();
                }
            }
        );

        const modeSelectInput = clickContainer.addProperty(
            "mode",
            "Mode",
            options.mode,
            "select",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    options.mode = value;

                    await particles.refresh();
                }
            }
        ) as EditorSelectInput;

        modeSelectInput.addItem(ClickMode.attract);
        // modeSelectInput.addItem(ClickMode.bubble); // TODO: This mode seems buggy
        modeSelectInput.addItem(ClickMode.pause);
        modeSelectInput.addItem(ClickMode.push);
        modeSelectInput.addItem(ClickMode.remove);
        modeSelectInput.addItem(ClickMode.repulse);
        modeSelectInput.addItem(ClickMode.trail);

        if (typeof AbsorberClickMode !== "undefined") {
            const absorbersGroup = "Absorbers";

            modeSelectInput.addItemGroup(absorbersGroup);
            modeSelectInput.addItem(AbsorberClickMode.absorber, undefined, absorbersGroup);
        }

        if (typeof EmitterClickMode !== "undefined") {
            const emittersGroup = "Emitters";

            modeSelectInput.addItemGroup(emittersGroup);
            modeSelectInput.addItem(EmitterClickMode.emitter, undefined, emittersGroup);
        }
    }
}
