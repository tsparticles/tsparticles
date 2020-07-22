import { Container } from "tsparticles/dist/Core/Container";
import { EditorItem } from "./EditorItem";
import { ColorUtils } from "tsparticles";

export class EditorColorInput extends EditorItem {
    constructor(
        container: Container,
        private readonly name: string,
        private readonly label: string,
        private readonly value: string,
        private readonly change: (value: string) => void
    ) {
        super(container);
        const input = this.element as HTMLInputElement;

        input.id = `input_${this.name}`;
        input.value = this.value;

        this.element.style.backgroundColor = input.value;
        this.element.style.color = this.textColor(input.value);

        input.addEventListener("change", () => {
            const currentValue = (this.element as HTMLInputElement).value;

            this.change(currentValue);

            this.element.style.backgroundColor = currentValue;
            this.element.style.color = this.textColor(currentValue);
        });
    }

    createElement(): HTMLElement {
        const element = document.createElement("input");

        element.setAttribute("type", "text");

        return element;
    }

    textColor(value: string | undefined): string {
        if (value === undefined) {
            return "#000";
        }

        const rgb = ColorUtils.stringToRgb(value);

        if (!rgb) {
            return "#000";
        }

        const color = Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);

        return color > 125 ? "#000" : "#fff";
    }
}
