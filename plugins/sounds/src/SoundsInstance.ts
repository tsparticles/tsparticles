import type { CustomEventArgs, Engine, IContainerPlugin } from "tsparticles-engine";
import type { SoundsContainer } from "./types";
import { executeOnSingleOrMultiple } from "tsparticles-engine";
import { getNoteFrequency } from "./utils";

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
        container.maxOscillators = Math.max(
            ...soundsOptions.events.map((t) =>
                Math.max(...t.notes.map((t) => (t.value instanceof Array ? t.value.length : 1)))
            )
        );

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

            if (container.muted) {
                if (container.oscillators) {
                    container.oscillators.forEach((t) => t.stop(0));
                    container.oscillators = undefined;
                }

                if (container.audioContext) {
                    container.audioContext = undefined;
                }
            } else {
                if (!container.audioContext) {
                    container.audioContext = new AudioContext();
                }

                if (!container.oscillators) {
                    container.oscillators = [];

                    const maxOscillators = container.maxOscillators ?? 0;

                    for (let i = 0; i < maxOscillators; i++) {
                        const oscillator = container.audioContext.createOscillator();

                        oscillator.type = "sine";

                        oscillator.connect(container.audioContext.destination);

                        container.oscillators.push(oscillator);
                    }
                }

                this._initEvents();
            }
        };

        muteImg.addEventListener("click", toggleMute);
        unmuteImg.addEventListener("click", toggleMute);
    }

    private _initEvents(): void {
        const container = this._container,
            soundsOptions = container.actualOptions.sounds;

        if (!soundsOptions?.enable || !container.canvas.element) {
            return;
        }

        for (const event of soundsOptions.events) {
            const playNote = (value: string, idx: number, noteIdx: number): void => {
                const note = event.notes[idx];

                if (!note || !this._container.oscillators) {
                    return;
                }

                try {
                    const freq = getNoteFrequency(value);

                    console.log("freq", value, freq);

                    if (typeof freq !== "number") {
                        return;
                    }

                    const oscillator = this._container.oscillators[noteIdx];

                    oscillator.frequency.value = freq;
                    oscillator.start(0);

                    setTimeout(() => {
                        oscillator.stop(0);

                        playNote(value, idx + 1, noteIdx);
                    }, note.duration);
                } catch (e) {
                    console.error(e);
                }
            };

            const playNotes = (idx: number): void => {
                const note = event.notes[idx];

                if (!note) {
                    return;
                }

                if (note.value instanceof Array) {
                    note.value.forEach((value, valueIdx) => {
                        playNote(value, idx, valueIdx);
                    });
                } else {
                    playNote(note.value, idx, 0);
                }
            };

            const cb = (args: CustomEventArgs): void => {
                if (this._container !== args.container) {
                    return;
                }

                if (!this._container || this._container.muted || this._container.destroyed) {
                    executeOnSingleOrMultiple(event.event, (item) => {
                        this._engine.removeEventListener(item, cb);
                    });

                    return;
                }

                for (let i = 0; i < event.notes.length; i++) {
                    playNotes(i);
                }
            };

            executeOnSingleOrMultiple(event.event, (item) => {
                this._engine.addEventListener(item, cb);
            });
        }
    }
}
