import type { Container, IHoverEvent } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";
import { HoverMode } from "tsparticles-engine";

export class HoverEventsOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IHoverEvent;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("onHover", "Hover Events");
        this.options = this.group.data as () => IHoverEvent;

        this.addParallax();
        this.addProperties();
    }

    private addParallax(): void {
        const parallax = this.group.addGroup("parallax", "Parallax");

        parallax.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        parallax.addProperty("force", "Force", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        parallax.addProperty("smooth", "Smooth", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addProperties(): void {
        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group
            .addProperty("mode", "Mode", EditorType.select)
            .change(async () => {
                await this.particles().refresh();
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
