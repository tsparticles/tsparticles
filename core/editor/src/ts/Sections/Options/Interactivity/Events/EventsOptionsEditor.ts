import type { EditorGroup } from "object-gui";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IEvents } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IEvents";
import { ClickEventsOptionsEditor } from "./ClickEventsOptionsEditor";
import { HoverEventsOptionsEditor } from "./HoverEventsOptionsEditor";
import { DivsEventsOptionsEditor } from "./DivsEventsOptionsEditor";

export class EventsOptionsEditor {
    public readonly group: EditorGroup;
    private readonly options: IEvents;

    constructor(private readonly parent: EditorGroup, private readonly particles: Container) {
        this.group = parent.addGroup("events", "Events");
        this.options = this.group.data as IEvents;

        this.addClick();
        this.addDivs();
        this.addHover();
        this.addProperties();
    }

    private addClick(): void {
        const clickEditor = new ClickEventsOptionsEditor(this.group, this.particles);
    }

    private addDivs(): void {
        const divsEditor = new DivsEventsOptionsEditor(this.group, this.particles);
    }

    private addHover(): void {
        const hoverEditor = new HoverEventsOptionsEditor(this.group, this.particles);
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
                await particles.refresh();
            }
        );
    }
}
