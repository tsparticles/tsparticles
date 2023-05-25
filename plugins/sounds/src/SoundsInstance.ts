import {
    type CustomEventArgs,
    type Engine,
    type IContainerPlugin,
    type Options,
    clamp,
    executeOnSingleOrMultiple,
    itemFromArray,
    itemFromSingleOrMultiple,
} from "tsparticles-engine";
import type { SoundsAudio } from "./Options/Classes/SoundsAudio";
import type { SoundsContainer } from "./types";
import { SoundsEventType } from "./enums";
import type { SoundsIcon } from "./Options/Classes/SoundsIcon";
import type { SoundsNote } from "./Options/Classes/SoundsNote";
import { getNoteFrequency } from "./utils";

/**
 * @param container -
 * @param options -
 * @param containerTop -
 * @param containerRight -
 * @param display -
 * @param iconOptions -
 * @param marginTop -
 * @param marginRight -
 * @param clickCb -
 * @returns the image element
 */
function initImage(
    container: SoundsContainer,
    options: Options,
    containerTop: number,
    containerRight: number,
    display: "block" | "none",
    iconOptions: SoundsIcon,
    marginTop: number,
    marginRight: number,
    clickCb: () => void
): HTMLImageElement {
    const img = document.createElement("img"),
        { width, path, svg } = iconOptions;

    setIconStyle(
        img,
        containerTop + marginTop,
        containerRight - marginRight,
        display,
        options.fullScreen.zIndex + 1,
        width,
        marginTop
    );

    img.src = path ?? (svg ? `data:image/svg+xml;base64,${btoa(svg)}` : "");

    const parent = container.canvas.element?.parentNode || document.body;

    parent.append(img);

    img.addEventListener("click", () => {
        clickCb();
    });

    return img;
}

/**
 * @param icon -
 * @param top -
 * @param left -
 * @param display -
 * @param zIndex -
 * @param width -
 * @param margin -
 */
function setIconStyle(
    icon: HTMLImageElement,
    top: number,
    left: number,
    display: "block" | "none",
    zIndex: number,
    width: number,
    margin: number
): void {
    icon.style.userSelect = "none";
    icon.style.webkitUserSelect = "none";
    icon.style.position = "absolute";
    icon.style.top = `${top + margin}px`;
    icon.style.left = `${left - margin - width}px`;
    icon.style.display = display;
    icon.style.zIndex = `${zIndex + 1}`;
}

export class SoundsInstance implements IContainerPlugin {
    private _audioMap: Map<string, AudioBuffer>;
    private _audioSources: AudioScheduledSourceNode[];
    private readonly _container;
    private readonly _engine;
    private _gain?: GainNode;
    private _muteImg?: HTMLImageElement;
    private _unmuteImg?: HTMLImageElement;
    private _volume: number;
    private _volumeDownImg?: HTMLImageElement;
    private _volumeUpImg?: HTMLImageElement;

    constructor(container: SoundsContainer, engine: Engine) {
        this._container = container;
        this._engine = engine;
        this._volume = 0;
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

        this._volume = soundsOptions.volume.value;

        const events = soundsOptions.events;

        this._audioMap = new Map<string, AudioBuffer>();

        for (const event of events) {
            if (!event.audio) {
                continue;
            }

            executeOnSingleOrMultiple(event.audio, async (audio) => {
                const response = await fetch(audio.source);

                if (!response.ok) {
                    return;
                }

                const arrayBuffer = await response.arrayBuffer();

                container.audioContext = new AudioContext();

                const audioBuffer = await container.audioContext.decodeAudioData(arrayBuffer);

                this._audioMap.set(audio.source, audioBuffer);
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

        const containerTop = container.canvas.element.offsetTop,
            containerRight = container.canvas.element.offsetLeft + container.canvas.element.offsetWidth,
            iconsOptions = soundsOptions.icons,
            muteOptions = iconsOptions.mute,
            unmuteOptions = iconsOptions.unmute,
            volumeDownOptions = iconsOptions.volumeDown,
            volumeUpOptions = iconsOptions.volumeUp,
            margin = 10;

        const toggleMute = (): void => {
            container.muted = !container.muted;

            this._updateMuteIcons();
            this._updateMuteStatus();
        };

        this._muteImg = initImage(
            container,
            options,
            containerTop,
            containerRight,
            "block",
            soundsOptions.icons.mute,
            margin,
            margin * 3 + muteOptions.width + volumeDownOptions.width + volumeUpOptions.width,
            toggleMute
        );
        this._unmuteImg = initImage(
            container,
            options,
            containerTop,
            containerRight,
            "none",
            soundsOptions.icons.unmute,
            margin,
            margin * 3 + unmuteOptions.width + volumeDownOptions.width + volumeUpOptions.width,
            toggleMute
        );
        this._volumeDownImg = initImage(
            container,
            options,
            containerTop,
            containerRight,
            "block",
            soundsOptions.icons.volumeDown,
            margin,
            margin * 2 + volumeDownOptions.width + volumeUpOptions.width,
            () => {
                if (container.muted) {
                    this._volume = 0;
                }

                this._volume -= soundsOptions.volume.step;

                this._updateVolume();
            }
        );
        this._volumeUpImg = initImage(
            container,
            options,
            containerTop,
            containerRight,
            "block",
            soundsOptions.icons.volumeUp,
            margin,
            margin + volumeUpOptions.width,
            (): void => {
                if (container.muted) {
                    this._volume = 0;
                }

                this._volume += soundsOptions.volume.step;

                this._updateVolume();
            }
        );
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

        if (this._volumeDownImg) {
            this._volumeDownImg.remove();
        }

        if (this._volumeUpImg) {
            this._volumeUpImg.remove();
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

                if (event.filter && !event.filter(args)) {
                    return;
                }

                if (event.audio) {
                    this._playBuffer(itemFromSingleOrMultiple(event.audio));
                } else if (event.melodies) {
                    const melody = itemFromArray(event.melodies);

                    if (melody.melodies.length) {
                        await Promise.allSettled(melody.melodies.map((m) => this._playNote(m.notes, 0, melody.loop)));
                    } else {
                        await this._playNote(melody.notes, 0, melody.loop);
                    }
                } else if (event.notes) {
                    const note = itemFromArray(event.notes);

                    await this._playNote([note], 0, false);
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

        if (this._gain) {
            this._gain.disconnect();
        }

        container.audioContext.close();
        container.audioContext = undefined;

        this._engine.dispatchEvent(SoundsEventType.mute, { container: this._container });
    }

    private _playBuffer(audio: SoundsAudio): void {
        const audioBuffer = this._audioMap.get(audio.source);

        if (!audioBuffer) {
            return;
        }

        const audioCtx = this._container.audioContext;

        if (!audioCtx) {
            return;
        }

        const source = this._addBuffer(audioCtx);

        source.loop = audio.loop;
        source.buffer = audioBuffer;

        source.connect(this._gain ?? audioCtx.destination);
        source.start();
    }

    private async _playFrequency(frequency: number, duration: number): Promise<void> {
        if (!this._container.audioContext || !this._gain) {
            return;
        }

        const oscillator = this._addOscillator(this._container.audioContext);

        oscillator.connect(this._gain);

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

    private async _playNote(notes: SoundsNote[], noteIdx: number, loop: boolean): Promise<void> {
        if (this._container.muted) {
            return;
        }

        const note = notes[noteIdx];

        if (!note) {
            return;
        }

        const value = note.value;

        const promises = executeOnSingleOrMultiple(value, async (_, idx) => {
            return this._playNoteValue(notes, noteIdx, idx);
        });

        await (promises instanceof Array ? Promise.allSettled(promises) : promises);

        let nextNoteIdx = noteIdx + 1;

        if (loop && nextNoteIdx >= notes.length) {
            nextNoteIdx = nextNoteIdx % notes.length;
        }

        if (this._container.muted) {
            return;
        }

        await this._playNote(notes, nextNoteIdx, loop);
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

        gain.gain.value = soundsOptions.volume.value / 100;

        this._gain = gain;

        this._initEvents();

        this._engine.dispatchEvent(SoundsEventType.unmute, { container: this._container });
    }

    private _updateMuteIcons(): void {
        const container = this._container,
            muteImg = this._muteImg,
            unmuteImg = this._unmuteImg;

        if (muteImg) {
            muteImg.style.display = container.muted ? "block" : "none";
        }

        if (unmuteImg) {
            unmuteImg.style.display = container.muted ? "none" : "block";
        }
    }

    private _updateMuteStatus(): void {
        const container = this._container;

        if (container.muted) {
            this._mute();
        } else {
            this._unmute();

            this._playMuteSound();
        }
    }

    private _updateVolume(): void {
        const container = this._container,
            soundsOptions = container.actualOptions.sounds;

        if (!soundsOptions?.enable) {
            return;
        }

        clamp(this._volume, soundsOptions.volume.min, soundsOptions.volume.max);

        let stateChanged = false;

        if (this._volume <= 0 && !container.muted) {
            this._volume = 0;

            container.muted = true;
            stateChanged = true;
        } else if (this._volume > 0 && container.muted) {
            container.muted = false;
            stateChanged = true;
        }

        if (stateChanged) {
            this._updateMuteIcons();
            this._updateMuteStatus();
        }

        if (this._gain?.gain) {
            this._gain.gain.value = this._volume / 100;
        }
    }
}
