import {
    type CustomEventArgs,
    type Engine,
    type IContainerPlugin,
    clamp,
    executeOnSingleOrMultiple,
    itemFromArray,
    itemFromSingleOrMultiple,
} from "tsparticles-engine";
import { ImageDisplay, SoundsEventType } from "./enums";
import type { ImageMargins, InitImageData, SoundsContainer } from "./types";
import type { SoundsAudio } from "./Options/Classes/SoundsAudio";
import type { SoundsNote } from "./Options/Classes/SoundsNote";
import { getNoteFrequency } from "./utils";

/**
 * @param data -
 * @returns the image element
 */
function initImage(data: InitImageData): HTMLImageElement {
    const img = document.createElement("img"),
        { clickCb, container, display, iconOptions, margin, options, pos, rightOffsets } = data,
        { width, path, svg } = iconOptions;

    setIconStyle(
        img,
        pos.top + margin,
        pos.right - (margin * (rightOffsets.length + 1) + width + rightOffsets.reduce((a, b) => a + b, 0)),
        display,
        options.fullScreen.zIndex + 1,
        width,
        margin
    );

    img.src = path ?? (svg ? `data:image/svg+xml;base64,${btoa(svg)}` : "");

    const parent = container.canvas.element?.parentNode || document.body;

    parent.append(img);

    img.addEventListener("click", clickCb);

    return img;
}

/**
 *
 * @param image -
 */
function removeImage(image?: HTMLImageElement): void {
    if (!image) {
        return;
    }

    image.remove();
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

        const canvas = container.canvas.element,
            pos: ImageMargins = {
                top: canvas.offsetTop,
                right: canvas.offsetLeft + canvas.offsetWidth,
            },
            { mute, unmute, volumeDown, volumeUp } = soundsOptions.icons,
            margin = 10;

        const toggleMute = (): void => {
            container.muted = !container.muted;

            this._updateMuteIcons();
            this._updateMuteStatus();
        };

        this._muteImg = initImage({
            container,
            options,
            pos,
            display: ImageDisplay.Block,
            iconOptions: mute,
            margin,
            rightOffsets: [volumeDown.width, volumeUp.width],
            clickCb: toggleMute,
        });
        this._unmuteImg = initImage({
            container,
            options,
            pos,
            display: ImageDisplay.None,
            iconOptions: unmute,
            margin,
            rightOffsets: [volumeDown.width, volumeUp.width],
            clickCb: toggleMute,
        });
        this._volumeDownImg = initImage({
            container,
            options,
            pos,
            display: ImageDisplay.Block,
            iconOptions: volumeDown,
            margin,
            rightOffsets: [volumeUp.width],
            clickCb: () => {
                if (container.muted) {
                    this._volume = 0;
                }

                this._volume -= soundsOptions.volume.step;

                this._updateVolume();
            },
        });
        this._volumeUpImg = initImage({
            container,
            options,
            pos,
            display: ImageDisplay.Block,
            iconOptions: volumeUp,
            margin,
            rightOffsets: [],
            clickCb: (): void => {
                if (container.muted) {
                    this._volume = 0;
                }

                this._volume += soundsOptions.volume.step;

                this._updateVolume();
            },
        });
    }

    stop(): void {
        this._container.muted = true;

        this._mute();

        removeImage(this._muteImg);
        removeImage(this._unmuteImg);
        removeImage(this._volumeDownImg);
        removeImage(this._volumeUpImg);
    }

    private readonly _addBuffer: (audioCtx: AudioContext) => AudioBufferSourceNode = (audioCtx) => {
        const buffer = audioCtx.createBufferSource();

        this._audioSources.push(buffer);

        return buffer;
    };

    private readonly _addOscillator: (audioCtx: AudioContext) => OscillatorNode = (audioCtx) => {
        const oscillator = audioCtx.createOscillator();

        this._audioSources.push(oscillator);

        return oscillator;
    };

    private readonly _initEvents: () => void = () => {
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
    };

    private readonly _mute: () => void = () => {
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
    };

    private readonly _playBuffer: (audio: SoundsAudio) => void = (audio) => {
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
    };

    private readonly _playFrequency: (frequency: number, duration: number) => Promise<void> = async (
        frequency,
        duration
    ) => {
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
    };

    private readonly _playMuteSound: () => void = () => {
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
    };

    private readonly _playNote: (notes: SoundsNote[], noteIdx: number, loop: boolean) => Promise<void> = async (
        notes,
        noteIdx,
        loop
    ) => {
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
    };

    private readonly _playNoteValue: (notes: SoundsNote[], noteIdx: number, valueIdx: number) => Promise<void> = async (
        notes,
        noteIdx,
        valueIdx
    ) => {
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
    };

    private readonly _removeAudioSource: (source: AudioScheduledSourceNode) => void = (source) => {
        source.stop();
        source.disconnect();

        this._audioSources.splice(this._audioSources.indexOf(source), 1);
    };

    private readonly _unmute: () => void = () => {
        const container = this._container,
            options = container.actualOptions,
            soundsOptions = options.sounds;

        if (!soundsOptions) {
            return;
        }

        if (!container.audioContext) {
            container.audioContext = new AudioContext();
        }

        const { audioContext } = container;

        if (!this._audioSources) {
            this._audioSources = [];
        }

        const gain = audioContext.createGain();

        gain.connect(audioContext.destination);

        gain.gain.value = soundsOptions.volume.value / 100;

        this._gain = gain;

        this._initEvents();

        this._engine.dispatchEvent(SoundsEventType.unmute, { container: this._container });
    };

    private readonly _updateMuteIcons: () => void = () => {
        const container = this._container,
            muteImg = this._muteImg,
            unmuteImg = this._unmuteImg;

        if (muteImg) {
            muteImg.style.display = container.muted ? "block" : "none";
        }

        if (unmuteImg) {
            unmuteImg.style.display = container.muted ? "none" : "block";
        }
    };

    private readonly _updateMuteStatus: () => void = () => {
        const container = this._container;

        if (container.muted) {
            this._mute();
        } else {
            this._unmute();

            this._playMuteSound();
        }
    };

    private readonly _updateVolume: () => void = () => {
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
    };
}
