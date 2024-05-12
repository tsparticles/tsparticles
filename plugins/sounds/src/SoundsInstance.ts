import {
    type CustomEventArgs,
    type Engine,
    type IContainerPlugin,
    clamp,
    executeOnSingleOrMultiple,
    getLogger,
    isArray,
    isNumber,
    itemFromArray,
    itemFromSingleOrMultiple,
    mouseDownEvent,
    percentDenominator,
    touchStartEvent,
} from "@tsparticles/engine";
import { ImageDisplay, SoundsEventType } from "./enums.js";
import type { ImageMargins, InitImageData, SoundsContainer } from "./types.js";
import { getNoteFrequency, isWindowMuted, unmuteWindow } from "./utils.js";
import type { SoundsAudio } from "./Options/Classes/SoundsAudio.js";
import type { SoundsNote } from "./Options/Classes/SoundsNote.js";

const zIndexOffset = 1,
    rightOffset = 1,
    minVolume = 0;

/**
 * @param data -
 * @returns the image element
 */
function initImage(data: InitImageData): HTMLImageElement {
    const img = document.createElement("img"),
        { clickCb, container, display, iconOptions, margin, options, pos, rightOffsets } = data,
        { width, path, style, svg } = iconOptions,
        defaultAccumulator = 0;

    setIconStyle(
        img,
        pos.top + margin,
        pos.right -
            (margin * (rightOffsets.length + rightOffset) +
                width +
                rightOffsets.reduce((a, b) => a + b, defaultAccumulator)),
        display,
        options.fullScreen.zIndex + zIndexOffset,
        width,
        margin,
        style,
    );

    img.src = path ?? (svg ? `data:image/svg+xml;base64,${btoa(svg)}` : "");

    const parent = container.canvas.element?.parentNode ?? document.body;

    parent.append(img);

    img.addEventListener("click", (): void => {
        void clickCb();
    });

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
 * @param style -
 */
function setIconStyle(
    icon: HTMLImageElement,
    top: number,
    left: number,
    display: "block" | "none",
    zIndex: number,
    width: number,
    margin: number,
    style: string,
): void {
    icon.style.userSelect = "none";
    icon.style.webkitUserSelect = "none";
    icon.style.position = "absolute";
    icon.style.top = `${top + margin}px`;
    icon.style.left = `${left - margin - width}px`;
    icon.style.display = display;
    icon.style.zIndex = `${zIndex + zIndexOffset}`;
    icon.style.cssText += style;
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

        if (soundsOptions.autoPlay && isWindowMuted()) {
            const firstClickHandler = (): void => {
                removeEventListener(mouseDownEvent, firstClickHandler);
                removeEventListener(touchStartEvent, firstClickHandler);

                unmuteWindow();

                void this.unmute();
            };

            const listenerOptions = {
                capture: true,
                once: true,
            };

            addEventListener(mouseDownEvent, firstClickHandler, listenerOptions);
            addEventListener(touchStartEvent, firstClickHandler, listenerOptions);
        }

        this._volume = soundsOptions.volume.value;

        const events = soundsOptions.events;

        this._audioMap = new Map<string, AudioBuffer>();

        for (const event of events) {
            if (!event.audio) {
                continue;
            }

            const promises = executeOnSingleOrMultiple(event.audio, async audio => {
                const response = await fetch(audio.source);

                if (!response.ok) {
                    return;
                }

                const arrayBuffer = await response.arrayBuffer(),
                    audioContext = this._getAudioContext(),
                    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

                this._audioMap.set(audio.source, audioBuffer);
            });

            if (promises instanceof Promise) {
                await promises;
            } else {
                await Promise.allSettled(promises);
            }
        }
    }

    async mute(): Promise<void> {
        if (!this._container.muted) {
            await this.toggleMute();
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
            margin = 10,
            toggleMute = async (): Promise<void> => {
                await this.toggleMute();
            },
            enableIcons = soundsOptions.icons.enable,
            display = enableIcons ? ImageDisplay.Block : ImageDisplay.None;

        this._muteImg = initImage({
            container,
            options,
            pos,
            display,
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
            display,
            iconOptions: volumeDown,
            margin,
            rightOffsets: [volumeUp.width],
            clickCb: async (): Promise<void> => {
                await this.volumeDown();
            },
        });

        this._volumeUpImg = initImage({
            container,
            options,
            pos,
            display,
            iconOptions: volumeUp,
            margin,
            rightOffsets: [],
            clickCb: async (): Promise<void> => {
                await this.volumeUp();
            },
        });

        if (!isWindowMuted() && soundsOptions.autoPlay) {
            await this.unmute();
        }
    }

    stop(): void {
        this._container.muted = true;

        void (async (): Promise<void> => {
            await this._mute();

            removeImage(this._muteImg);
            removeImage(this._unmuteImg);
            removeImage(this._volumeDownImg);
            removeImage(this._volumeUpImg);
        })();
    }

    async toggleMute(): Promise<void> {
        const container = this._container;

        container.muted = !container.muted;

        this._updateMuteIcons();
        await this._updateMuteStatus();
    }

    async unmute(): Promise<void> {
        if (this._container.muted) {
            await this.toggleMute();
        }
    }

    async volumeDown(): Promise<void> {
        const container = this._container,
            soundsOptions = container.actualOptions.sounds;

        if (!soundsOptions?.enable) {
            return;
        }

        if (container.muted) {
            this._volume = 0;
        }

        this._volume -= soundsOptions.volume.step;

        await this._updateVolume();
    }

    async volumeUp(): Promise<void> {
        const container = this._container,
            soundsOptions = container.actualOptions.sounds;

        if (!soundsOptions?.enable) {
            return;
        }

        this._volume += soundsOptions.volume.step;

        await this._updateVolume();
    }

    private readonly _addBuffer: (audioCtx: AudioContext) => AudioBufferSourceNode = audioCtx => {
        const buffer = audioCtx.createBufferSource();

        this._audioSources.push(buffer);

        return buffer;
    };

    private readonly _addOscillator: (audioCtx: AudioContext) => OscillatorNode = audioCtx => {
        const oscillator = audioCtx.createOscillator();

        this._audioSources.push(oscillator);

        return oscillator;
    };

    private _getAudioContext(): AudioContext {
        const container = this._container;

        if (!container.audioContext) {
            container.audioContext = new AudioContext();
        }

        return container.audioContext;
    }

    private readonly _initEvents: () => void = () => {
        const container = this._container,
            soundsOptions = container.actualOptions.sounds;

        if (!soundsOptions?.enable || !container.canvas.element) {
            return;
        }

        for (const event of soundsOptions.events) {
            const cb = (args: CustomEventArgs): void => {
                void (async (): Promise<void> => {
                    const filterNotValid = event.filter && !event.filter(args);

                    if (this._container !== args.container) {
                        return;
                    }

                    if (!this._container || !!this._container.muted || this._container.destroyed) {
                        executeOnSingleOrMultiple(event.event, item => {
                            this._engine.removeEventListener(item, cb);
                        });

                        return;
                    }

                    if (filterNotValid) {
                        return;
                    }

                    const defaultNoteIndex = 0;

                    if (event.audio) {
                        this._playBuffer(itemFromSingleOrMultiple(event.audio));
                    } else if (event.melodies) {
                        const melody = itemFromArray(event.melodies);

                        if (melody.melodies.length) {
                            await Promise.allSettled(
                                melody.melodies.map(m => this._playNote(m.notes, defaultNoteIndex, melody.loop)),
                            );
                        } else {
                            await this._playNote(melody.notes, defaultNoteIndex, melody.loop);
                        }
                    } else if (event.notes) {
                        const note = itemFromArray(event.notes);

                        await this._playNote([note], defaultNoteIndex, false);
                    }
                })();
            };

            executeOnSingleOrMultiple(event.event, item => {
                this._engine.addEventListener(item, cb);
            });
        }
    };

    private readonly _mute: () => Promise<void> = async () => {
        const container = this._container,
            audioContext = this._getAudioContext();

        for (const source of this._audioSources) {
            this._removeAudioSource(source);
        }

        if (this._gain) {
            this._gain.disconnect();
        }

        await audioContext.close();

        container.audioContext = undefined;

        this._engine.dispatchEvent(SoundsEventType.mute, { container: this._container });
    };

    private readonly _playBuffer: (audio: SoundsAudio) => void = audio => {
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
        duration,
    ) => {
        if (!this._gain || this._container.muted) {
            return;
        }

        const audioContext = this._getAudioContext(),
            oscillator = this._addOscillator(audioContext);

        oscillator.connect(this._gain);

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;

        oscillator.start();

        return new Promise<void>(resolve => {
            setTimeout(() => {
                this._removeAudioSource(oscillator);

                resolve();
            }, duration);
        });
    };

    private readonly _playMuteSound: () => void = () => {
        if (this._container.muted) {
            return;
        }

        const audioContext = this._getAudioContext(),
            gain = audioContext.createGain();

        gain.connect(audioContext.destination);
        gain.gain.value = 0;

        const oscillator = audioContext.createOscillator();

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
        loop,
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

        await (isArray(promises) ? Promise.allSettled(promises) : promises);

        const indexOffset = 1;

        let nextNoteIdx = noteIdx + indexOffset;

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
        valueIdx,
    ) => {
        const note = notes[noteIdx];

        if (!note) {
            return;
        }

        const value = itemFromSingleOrMultiple(note.value, valueIdx, true);

        try {
            const freq = getNoteFrequency(value);

            if (!isNumber(freq)) {
                return;
            }

            await this._playFrequency(freq, note.duration);
        } catch (e) {
            getLogger().error(e);
        }
    };

    private readonly _removeAudioSource: (source: AudioScheduledSourceNode) => void = source => {
        source.stop();
        source.disconnect();

        const deleteCount = 1;

        this._audioSources.splice(this._audioSources.indexOf(source), deleteCount);
    };

    private readonly _unmute: () => void = () => {
        const container = this._container,
            options = container.actualOptions,
            soundsOptions = options.sounds;

        if (!soundsOptions) {
            return;
        }

        const audioContext = this._getAudioContext();

        if (!this._audioSources) {
            this._audioSources = [];
        }

        const gain = audioContext.createGain();

        gain.connect(audioContext.destination);

        gain.gain.value = soundsOptions.volume.value / percentDenominator;

        this._gain = gain;

        this._initEvents();

        this._engine.dispatchEvent(SoundsEventType.unmute, { container: this._container });
    };

    private readonly _updateMuteIcons: () => void = () => {
        const container = this._container,
            soundsOptions = container.actualOptions.sounds;

        if (!soundsOptions?.enable || !soundsOptions.icons.enable) {
            return;
        }

        const muteImg = this._muteImg,
            unmuteImg = this._unmuteImg;

        if (muteImg) {
            muteImg.style.display = container.muted ? "block" : "none";
        }

        if (unmuteImg) {
            unmuteImg.style.display = container.muted ? "none" : "block";
        }
    };

    private readonly _updateMuteStatus: () => Promise<void> = async () => {
        const container = this._container,
            audioContext = this._getAudioContext();

        if (container.muted) {
            await audioContext?.suspend();
            await this._mute();
        } else {
            await audioContext?.resume();
            this._unmute();

            this._playMuteSound();
        }
    };

    private readonly _updateVolume: () => Promise<void> = async () => {
        const container = this._container,
            soundsOptions = container.actualOptions.sounds;

        if (!soundsOptions?.enable) {
            return;
        }

        clamp(this._volume, soundsOptions.volume.min, soundsOptions.volume.max);

        let stateChanged = false;

        if (this._volume <= minVolume && !container.muted) {
            this._volume = 0;

            container.muted = true;
            stateChanged = true;
        } else if (this._volume > minVolume && container.muted) {
            container.muted = false;
            stateChanged = true;
        }

        if (stateChanged) {
            this._updateMuteIcons();
            await this._updateMuteStatus();
        }

        if (this._gain?.gain) {
            this._gain.gain.value = this._volume / percentDenominator;
        }
    };
}
