import type { CustomEventArgs, Engine, IContainerPlugin } from "tsparticles-engine";
import type { SoundsContainer } from "./types";
import type { SoundsNote } from "./Options/Classes/SoundsNote";
import { executeOnSingleOrMultiple } from "tsparticles-engine";
import { getNoteFrequency } from "./utils";
import { itemFromArray } from "tsparticles-engine";
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
    private _audioMap: Map<string, AudioBuffer>;
    private _audioSources: AudioScheduledSourceNode[];
    private readonly _container;
    private readonly _engine;
    private _muteImg?: HTMLImageElement;
    private _source?: AudioNode;
    private _unmuteImg?: HTMLImageElement;

    constructor(container: SoundsContainer, engine: Engine) {
        this._container = container;
        this._engine = engine;
        this._audioSources = [];
        this._audioMap = new Map<string, AudioBuffer>();
    }

    async init(): Promise<void> {
        const container = this._container,
            options = container.actualOptions,
            soundsOptions = options.sounds;

        if (!soundsOptions?.enable) {
            return;
        }

        const events = soundsOptions.events;

        this._audioMap = new Map<string, AudioBuffer>();

        for (const event of events) {
            if (!event.audio) {
                continue;
            }

            executeOnSingleOrMultiple(event.audio, async (audio) => {
                const response = await fetch(audio);

                if (!response.ok) {
                    return;
                }

                const arrayBuffer = await response.arrayBuffer();

                container.audioContext = new AudioContext();

                const audioBuffer = await container.audioContext.decodeAudioData(arrayBuffer);

                this._audioMap.set(audio, audioBuffer);
            });
        }
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

                this._playMuteSound();
            }
        };

        muteImg.addEventListener("click", toggleMute);
        unmuteImg.addEventListener("click", toggleMute);
    }

    stop(): void {
        this._container.muted = true;

        this._mute();

        if (this._muteImg) {
            this._muteImg.remove();
        }

        if (this._unmuteImg) {
            this._unmuteImg.remove();
        }
    }

    private _addBuffer(audioCtx: AudioContext): AudioBufferSourceNode {
        const buffer = audioCtx.createBufferSource();

        this._audioSources.push(buffer);

        return buffer;
    }

    private _addOscillator(audioCtx: AudioContext): OscillatorNode {
        const oscillator = audioCtx.createOscillator();

        this._audioSources.push(oscillator);

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

                if (event.audio) {
                    this._playBuffer(itemFromSingleOrMultiple(event.audio));
                } else if (event.melodies) {
                    const melody = itemFromArray(event.melodies);

                    await this._playNote(melody.notes, 0);
                } else if (event.notes) {
                    const note = itemFromArray(event.notes);

                    await this._playNote([note], 0);
                }
            };

            executeOnSingleOrMultiple(event.event, (item) => {
                this._engine.addEventListener(item, cb);
            });
        }
    }

    private _mute(): void {
        const container = this._container;

        if (!container.audioContext) {
            return;
        }

        for (const source of this._audioSources) {
            this._removeAudioSource(source);
        }

        if (this._source) {
            this._source.disconnect();
        }

        container.audioContext.close();
        container.audioContext = undefined;
    }

    private _playBuffer(audio: string): void {
        const audioBuffer = this._audioMap.get(audio);

        if (!audioBuffer) {
            return;
        }

        const audioCtx = this._container.audioContext;

        if (!audioCtx) {
            return;
        }

        const source = this._addBuffer(audioCtx);

        source.buffer = audioBuffer;

        source.connect(this._source ?? audioCtx.destination);
        source.start();
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
                this._removeAudioSource(oscillator);

                resolve();
            }, duration);
        });
    }

    private _playMuteSound(): void {
        const container = this._container;

        if (!container.audioContext) {
            return;
        }

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

    private async _playNote(notes: SoundsNote[], noteIdx: number): Promise<void> {
        const note = notes[noteIdx];

        if (!note) {
            return;
        }

        const value = note.value;

        const promises = executeOnSingleOrMultiple(value, async (_, idx) => {
            return this._playNoteValue(notes, noteIdx, idx);
        });

        await (promises instanceof Array ? Promise.allSettled(promises) : promises);

        await this._playNote(notes, noteIdx + 1);
    }

    private async _playNoteValue(notes: SoundsNote[], noteIdx: number, valueIdx: number): Promise<void> {
        const note = notes[noteIdx];

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

    private _removeAudioSource(source: AudioScheduledSourceNode): void {
        source.stop();
        source.disconnect();

        this._audioSources.splice(this._audioSources.indexOf(source), 1);
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

        if (!this._audioSources) {
            this._audioSources = [];
        }

        const gain = container.audioContext.createGain();

        gain.connect(container.audioContext.destination);

        gain.gain.value = soundsOptions.volume / 100;

        this._source = gain;

        this._initEvents();
    }
}
