import type { EditorContainer } from "../../../../Editors/EditorContainer";
import type { Container } from "tsparticles/dist/Core/Container";
import { IEvents } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IEvents";
import { ClickMode, AbsorberClickMode, EmitterClickMode, HoverMode } from "tsparticles";
import { EditorSelectInput } from "../../../../Editors/EditorSelectInput";

export class EventsOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IEvents) {
        this.container = parent.addContainer("events", "Events");
        this.particles = this.container.particles;

        this.addClick();
        this.addHover();
        this.addEvents();
    }

    private addClick(): void {
        const particles = this.container.particles;
        const options = this.options.onClick;
        const clickContainer = this.container.addContainer("onClick", "Mouse Click");

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

    private addHover(): void {
        const particles = this.container.particles;
        const options = this.options.onHover;
        const hoverContainer = this.container.addContainer("onHover", "Mouse Hover");

        hoverContainer.addProperty(
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

        const modeSelectInput = hoverContainer.addProperty(
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

        modeSelectInput.addItem(HoverMode.attract);
        modeSelectInput.addItem(HoverMode.bubble);
        modeSelectInput.addItem(HoverMode.connect);
        modeSelectInput.addItem(HoverMode.grab);
        modeSelectInput.addItem(HoverMode.repulse);
        modeSelectInput.addItem(HoverMode.slow);
        modeSelectInput.addItem(HoverMode.trail);
    }

    private addEvents(): void {
        const particles = this.container.particles;
        const options = this.options;

        this.container.addProperty(
            "resize",
            "Resize",
            options.resize,
            typeof options.resize,
            async (value: string | number | boolean) => {
                if (typeof value === "boolean") {
                    options.resize = value;

                    await particles.refresh();
                }
            }
        );
    }
}
