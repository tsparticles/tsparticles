import type { CustomEventArgs, Engine, IContainerPlugin } from "tsparticles-engine";
import type { SoundsContainer } from "./types";
import type { SoundsEvent } from "./Options/Classes/SoundsEvent";
import { executeOnSingleOrMultiple } from "tsparticles-engine";
import { getNoteFrequency } from "./utils";
import { itemFromSingleOrMultiple } from "tsparticles-engine";

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
    private _muteImg?: HTMLImageElement;
    private _oscillators: OscillatorNode[];
    private _source?: AudioNode;
    private _unmuteImg?: HTMLImageElement;

    constructor(container: SoundsContainer, engine: Engine) {
        this._container = container;
        this._engine = engine;
        this._oscillators = [];
    }

    async start(): Promise<void> {
        const container = this._container,
            options = container.actualOptions,
            soundsOptions = options.sounds;

        if (!soundsOptions?.enable || !container.canvas.element) {
            return;
        }

        container.muted = true;

        this._muteImg = document.createElement("img");
        this._unmuteImg = document.createElement("img");

        const muteImg = this._muteImg,
            unmuteImg = this._unmuteImg,
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
                this._mute();
            } else {
                this._unmute();

                if (container.audioContext) {
                    const gain = container.audioContext.createGain();

                    gain.connect(container.audioContext.destination);

                    gain.gain.value = 0;

                    const oscillator = container.audioContext.createOscillator();

                    oscillator.connect(gain);

                    oscillator.type = "sine";
                    oscillator.frequency.value = 1;

                    oscillator.start();

                    setTimeout(() => {
                        oscillator.stop();
                        oscillator.disconnect();
                        gain.disconnect();
                    });
                }
            }
        };

        muteImg.addEventListener("click", toggleMute);
        unmuteImg.addEventListener("click", toggleMute);
    }

    stop(): void {
        this._container.muted = true;

        if (this._muteImg) {
            this._muteImg.remove();
        }

        if (this._unmuteImg) {
            this._unmuteImg.remove();
        }
    }

    private _addOscillator(audioCtx: AudioContext): OscillatorNode {
        const oscillator = audioCtx.createOscillator();

        this._oscillators.push(oscillator);

        return oscillator;
    }

    private _initEvents(): void {
        const container = this._container,
            soundsOptions = container.actualOptions.sounds;

        if (!soundsOptions?.enable || !container.canvas.element) {
            return;
        }

        for (const event of soundsOptions.events) {
            const cb = async (args: CustomEventArgs): Promise<void> => {
                if (this._container !== args.container) {
                    return;
                }

                if (!this._container || this._container.muted || this._container.destroyed) {
                    executeOnSingleOrMultiple(event.event, (item) => {
                        this._engine.removeEventListener(item, cb);
                    });

                    return;
                }

                await this._playNote(event, 0);
            };

            executeOnSingleOrMultiple(event.event, (item) => {
                this._engine.addEventListener(item, cb);
            });
        }
    }

    private _mute(): void {
        const container = this._container;

        if (container.audioContext) {
            container.audioContext = undefined;
        }
    }

    private async _playFrequency(frequency: number, duration: number): Promise<void> {
        if (!this._container.audioContext || !this._source) {
            return;
        }

        const oscillator = this._addOscillator(this._container.audioContext);

        oscillator.connect(this._source);

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;

        oscillator.start();

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                this._removeOscillator(oscillator);

                resolve();
            }, duration);
        });
    }

    private async _playNote(event: SoundsEvent, noteIdx: number): Promise<void> {
        const note = event.notes[noteIdx];

        if (!note) {
            return;
        }

        const value = note.value;

        const promises = executeOnSingleOrMultiple(value, async (_, idx) => {
            return this._playNoteValue(event, noteIdx, idx);
        });

        await (promises instanceof Array ? Promise.allSettled(promises) : promises);

        await this._playNote(event, noteIdx + 1);
    }

    private async _playNoteValue(event: SoundsEvent, noteIdx: number, valueIdx: number): Promise<void> {
        const note = event.notes[noteIdx];

        if (!note) {
            return;
        }

        const value = itemFromSingleOrMultiple(note.value, valueIdx, true);

        try {
            const freq = getNoteFrequency(value);

            if (typeof freq !== "number") {
                return;
            }

            await this._playFrequency(freq, note.duration);
        } catch (e) {
            console.error(e);
        }
    }

    private _removeOscillator(oscillator: OscillatorNode): void {
        oscillator.stop();
        oscillator.disconnect();

        this._oscillators.splice(this._oscillators.indexOf(oscillator), 1);
    }

    private _unmute(): void {
        const container = this._container,
            options = container.actualOptions,
            soundsOptions = options.sounds;

        if (!soundsOptions) {
            return;
        }

        if (!container.audioContext) {
            container.audioContext = new AudioContext();
        }

        if (!this._oscillators) {
            this._oscillators = [];
        }

        const gain = container.audioContext.createGain();

        gain.connect(container.audioContext.destination);

        gain.gain.value = soundsOptions.volume / 100;

        this._source = gain;

        this._initEvents();
    }
}
