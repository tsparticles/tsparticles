import { Container } from "tsparticles/dist/Core/Container";

export abstract class EditorItem {
    public readonly element!: HTMLElement;

    protected constructor(public readonly particles: Container) {
        this.element = this.createElement();
    }

    protected abstract createElement(): HTMLElement;
}
