import { EditorGroup, EditorType } from "object-gui";
import type { Container } from "tsparticles-engine";
import { HoverMode } from "tsparticles-engine";
import type { IHoverEvent } from "tsparticles-engine/Options/Interfaces/Interactivity/Events/IHoverEvent";
import { EditorBase } from "../../../../EditorBase";

export class HoverEventsOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IHoverEvent;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("onHover", "Hover Events");
        this.options = this.group.data as IHoverEvent;

        this.addParallax();
        this.addProperties();
    }

    private addParallax(): void {
        const particles = this.particles;
        const parallax = this.group.addGroup("parallax", "Parallax");

        parallax.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        parallax.addProperty("force", "Force", EditorType.number).change(async () => {
            await particles.refresh();
        });

        parallax.addProperty("smooth", "Smooth", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group
            .addProperty("mode", "Mode", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems([
                {
                    value: HoverMode.attract,
                },
                {
                    value: HoverMode.bubble,
                },
                {
                    value: HoverMode.connect,
                },
                {
                    value: HoverMode.grab,
                },
                {
                    value: HoverMode.light,
                },
                {
                    value: HoverMode.repulse,
                },
                {
                    value: HoverMode.slow,
                },
                {
                    value: HoverMode.trail,
                },
            ]);
    }
}
