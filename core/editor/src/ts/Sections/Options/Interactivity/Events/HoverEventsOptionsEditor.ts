import { EditorGroup, EditorSelectInput } from "object-gui";
import { Container } from "tsparticles/dist/Core/Container";
import { HoverMode } from "tsparticles";
import type { IHoverEvent } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IHoverEvent";

export class HoverEventsOptionsEditor {
    public readonly group: EditorGroup;
    private readonly particles: Container;

    constructor(private readonly parent: EditorGroup, private readonly options: IHoverEvent) {
        this.group = parent.addGroup("onHover", "Hover Events");
        this.particles = this.group.data as Container;

        this.addHover();
    }

    private addHover(): void {
        const particles = this.particles;
        const options = this.options;
        const hoverGroup = this.group;

        hoverGroup.addProperty(
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

        const modeSelectInput = hoverGroup.addProperty(
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

        const parallaxGroup = hoverGroup.addGroup("parallax", "Parallax");
        const parallaxOptions = options.parallax;

        parallaxGroup.addProperty(
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

        parallaxGroup.addProperty(
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

        parallaxGroup.addProperty(
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
