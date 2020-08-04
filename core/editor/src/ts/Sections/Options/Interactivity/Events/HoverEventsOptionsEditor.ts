import { EditorContainer, EditorSelectInput } from "object-gui";
import { Container } from "tsparticles/dist/Core/Container";
import { HoverMode } from "tsparticles";
import type { IHoverEvent } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IHoverEvent";

export class HoverEventsOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: IHoverEvent) {
        this.container = parent.addContainer("onHover", "Hover Events");
        this.particles = this.container.data as Container;

        this.addHover();
    }

    private addHover(): void {
        const particles = this.particles;
        const options = this.options;
        const hoverContainer = this.container;

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

        const parallaxContainer = hoverContainer.addContainer("parallax", "Parallax");
        const parallaxOptions = options.parallax;

        parallaxContainer.addProperty(
            "enable",
            "Enable",
            parallaxOptions.enable,
            typeof parallaxOptions.enable,
            async (value: string | number | boolean) => {
                if (typeof value === "boolean") {
                    parallaxOptions.enable = value;

                    await particles.refresh();
                }
            }
        );

        parallaxContainer.addProperty(
            "force",
            "Force",
            parallaxOptions.force,
            typeof parallaxOptions.force,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    parallaxOptions.force = value;

                    await particles.refresh();
                }
            }
        );

        parallaxContainer.addProperty(
            "smooth",
            "Smooth",
            parallaxOptions.smooth,
            typeof parallaxOptions.smooth,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    parallaxOptions.smooth = value;

                    await particles.refresh();
                }
            }
        );
    }
}
