import type { EditorGroup } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IEvents } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IEvents";
import { ClickEventsOptionsEditor } from "./ClickEventsOptionsEditor";
import { HoverEventsOptionsEditor } from "./HoverEventsOptionsEditor";
import { DivsEventsOptionsEditor } from "./DivsEventsOptionsEditor";

export class EventsOptionsEditor {
    public readonly group: EditorGroup;
    private readonly particles: Container;

    constructor(private readonly parent: EditorGroup, private readonly options: IEvents) {
        this.group = parent.addGroup("events", "Events");
        this.particles = this.group.data as Container;

        this.addClick();
        this.addDivs();
        this.addHover();
        this.addProperties();
    }

    private addClick(): void {
        const clickEditor = new ClickEventsOptionsEditor(this.group, this.options.onClick);
    }

    private addDivs(): void {
        const divsEditor = new DivsEventsOptionsEditor(this.group, this.options.onDiv);
    }

    private addHover(): void {
        const hoverEditor = new HoverEventsOptionsEditor(this.group, this.options.onHover);
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;

        this.group.addProperty(
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
