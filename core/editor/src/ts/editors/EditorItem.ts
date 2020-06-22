export abstract class EditorItem {
    public readonly element!: HTMLElement;

    protected constructor() {
        this.element = this.createElement();
    }

    public abstract createElement(): HTMLElement;
}
