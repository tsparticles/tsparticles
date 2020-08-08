import { EditorGroup, EditorSelectInput } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import { HoverMode } from "tsparticles";
import type { IHoverEvent } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IHoverEvent";

export class HoverEventsOptionsEditor {
    public readonly group: EditorGroup;
    private readonly options: IHoverEvent;

    constructor(private readonly parent: EditorGroup, private readonly particles: Container) {
        this.group = parent.addGroup("onHover", "Hover Events");
        this.options = this.group.data as IHoverEvent;

        this.addParallax();
        this.addProperties();
    }

    private addParallax(): void {
        const particles = this.particles;
        const options = this.options.parallax;
        const parallax = this.group.addGroup("parallax", "Parallax");

        parallax.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });

        parallax.addProperty("force", "Force", options.force, typeof options.force, async () => {
            await particles.refresh();
        });

        parallax.addProperty("smooth", "Smooth", options.smooth, typeof options.smooth, async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;

        this.group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });

        const modeSelectInput = this.group.addProperty("mode", "Mode", options.mode, "select", async () => {
            await particles.refresh();
        }) as EditorSelectInput;

        modeSelectInput.addItem(HoverMode.attract);
        modeSelectInput.addItem(HoverMode.bubble);
        modeSelectInput.addItem(HoverMode.connect);
        modeSelectInput.addItem(HoverMode.grab);
        modeSelectInput.addItem(HoverMode.repulse);
        modeSelectInput.addItem(HoverMode.slow);
        modeSelectInput.addItem(HoverMode.trail);
    }
}
