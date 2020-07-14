import { Container } from "tsparticles/dist/Core/Container";
import { changeHandler } from "../utils";

const addBackground = (container: Container): void => {
    /*const fBg = gui.addFolder("background");
    const fBgColor = fBg.addFolder("color");

    fBgColor.addColor(container.options.background.color, "value").onChange(async () => changeHandler(container));
    fBgColor.open();

    fBg.add(container.options.background, "image").onChange(async () => changeHandler(container));
    fBg.add(container.options.background, "opacity")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange(async () => changeHandler(container));
    fBg.add(container.options.background, "position").onChange(async () => changeHandler(container));
    fBg.add(container.options.background, "repeat").onChange(async () => changeHandler(container));
    fBg.add(container.options.background, "size").onChange(async () => changeHandler(container));

    fBg.open();
     */
};

export { addBackground };
