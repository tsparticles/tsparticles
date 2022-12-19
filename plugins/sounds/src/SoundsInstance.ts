import type { Engine, IContainerPlugin } from "tsparticles-engine";
import type { SoundsContainer } from "./types";

function setIconStyle(
    icon: HTMLImageElement,
    top: number,
    left: number,
    display: "block" | "none",
    zIndex: number
): void {
    icon.style.position = "absolute";
    icon.style.top = `${top + 10}px`;
    icon.style.left = `${left - 34}px`;
    icon.style.display = display;
    icon.style.zIndex = `${zIndex + 1}`;
}

export class SoundsInstance implements IContainerPlugin {
    private readonly _container;
    private readonly _engine;

    constructor(container: SoundsContainer, engine: Engine) {
        this._container = container;
        this._engine = engine;
    }

    async init(): Promise<void> {
        const container = this._container,
            options = container.actualOptions,
            soundsOptions = options.sounds;

        if (!soundsOptions?.enable || !container.canvas.element) {
            return;
        }

        container.muted = true;

        const muteImg = document.createElement("img"),
            unmuteImg = document.createElement("img"),
            containerTop = container.canvas.element.offsetTop,
            containerRight = container.canvas.element.offsetLeft + container.canvas.element.offsetWidth,
            iconsOptions = soundsOptions.icons,
            muteOptions = iconsOptions.mute,
            unmuteOptions = iconsOptions.unmute;

        setIconStyle(muteImg, containerTop + 10, containerRight - 34, "block", options.fullScreen.zIndex + 1);
        setIconStyle(unmuteImg, containerTop + 10, containerRight - 34, "none", options.fullScreen.zIndex + 1);

        muteImg.src = muteOptions.path ?? (muteOptions.svg ? `data:image/svg+xml;base64,${btoa(muteOptions.svg)}` : "");
        unmuteImg.src =
            unmuteOptions.path ?? (unmuteOptions.svg ? `data:image/svg+xml;base64,${btoa(unmuteOptions.svg)}` : "");

        const parent = container.canvas.element.parentNode || document.body;

        parent.append(muteImg);
        parent.append(unmuteImg);

        const toggleMute = (): void => {
            container.muted = !container.muted;

            muteImg.style.display = container.muted ? "block" : "none";
            unmuteImg.style.display = container.muted ? "none" : "block";
        };

        muteImg.addEventListener("click", toggleMute);
        unmuteImg.addEventListener("click", toggleMute);
    }
}
