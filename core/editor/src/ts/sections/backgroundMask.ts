import { Container } from "tsparticles/dist/Core/Container";
import { changeHandler } from "../utils";

const addBackgroundMask = (container: Container): void => {
    /*const fBgMask = addFolder("backgroundMask");
    const fCover = fBgMask.addFolder("cover");
    const fCoverColor = fBgMask.addFolder("color");

    fCoverColor
        .addColor(container.options.backgroundMask.cover.color, "value")
        .onChange(async () => changeHandler(container));

    fCover.add(container.options.backgroundMask.cover, "opacity").onChange(async () => changeHandler(container));

    fBgMask.add(container.options.backgroundMask, "enable").onChange(async () => changeHandler(container));
     */
};

export { addBackgroundMask };
