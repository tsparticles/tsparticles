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

        this.updateStyle(input.value);

        input.addEventListener("change", () => {
            const currentValue = (this.element as HTMLInputElement).value;

            this.change(currentValue);

            this.updateStyle(currentValue);
        });
    }

    protected createElement(): HTMLElement {
        const element = document.createElement("input");

        element.setAttribute("type", "text");

        return element;
    }

    private updateStyle(bgColor: string) {
        this.element.style.backgroundColor = bgColor;

        const textColor = this.textColor(bgColor);

        if (textColor !== undefined) {
            this.element.style.color = textColor;
        }
    }

    private textColor(value: string | undefined): string | undefined {
        if (value === undefined) {
            return undefined;
        }

        const rgb = ColorUtils.stringToRgb(value);

        if (!rgb) {
            return undefined;
        }

        const color = Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);

        return color > 125 ? "#000" : "#fff";
    }
}
