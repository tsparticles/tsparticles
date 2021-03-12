import { EditorGroup, EditorType } from "object-gui";
import type { Container } from "tsparticles-engine";
import type { IEvents } from "tsparticles-engine/Options/Interfaces/Interactivity/Events/IEvents";
import { ClickEventsOptionsEditor } from "./ClickEventsOptionsEditor";
import { HoverEventsOptionsEditor } from "./HoverEventsOptionsEditor";
import { DivsEventsOptionsEditor } from "./DivsEventsOptionsEditor";
import { EditorBase } from "../../../../EditorBase";

export class EventsOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IEvents;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("events", "Events");
        this.options = this.group.data as IEvents;

        this.addClick();
        this.addDivs();
        this.addHover();
        this.addProperties();
    }

    private addClick(): void {
        const clickEditor = new ClickEventsOptionsEditor(this.particles);

        clickEditor.addToGroup(this.group);
    }

    private addDivs(): void {
        const divsEditor = new DivsEventsOptionsEditor(this.particles);

        divsEditor.addToGroup(this.group);
    }

    private addHover(): void {
        const hoverEditor = new HoverEventsOptionsEditor(this.particles);

        hoverEditor.addToGroup(this.group);
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("resize", "Resize", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }
}
