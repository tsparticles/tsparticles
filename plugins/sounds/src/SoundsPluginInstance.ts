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
  percentDenominator,
  safeDocument,
} from "@tsparticles/engine";
import { ImageDisplay, SoundsEventType } from "./enums.js";
import type { ImageMargins, InitImageData, SoundsContainer } from "./types.js";
import { getNoteFrequency, isWindowMuted, unmuteWindow } from "./utils.js";
import { mouseDownEvent, touchStartEvent } from "./constants.js";
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
  const img = safeDocument().createElement("img"),
    { clickCb, container, display, iconOptions, margin, options, pos, rightOffsets } = data,
    { width, path, style, svg } = iconOptions,
    defaultAccumulator = 0;

  setIconStyle(
    img,
    pos.top + margin,
    pos.right -
      (margin * (rightOffsets.length + rightOffset) + width + rightOffsets.reduce((a, b) => a + b, defaultAccumulator)),
    display,
    options.fullScreen.zIndex + zIndexOffset,
    width,
    margin,
    style,
  );

  img.src = path ?? (svg ? `data:image/svg+xml;base64,${btoa(svg)}` : "");

  const parent = container.canvas.domElement?.parentNode ?? safeDocument().body;

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
  icon.style.position = "absolute";
  icon.style.top = `${(top + margin).toString()}px`;
  icon.style.left = `${(left - margin - width).toString()}px`;
  icon.style.display = display;
  icon.style.zIndex = (zIndex + zIndexOffset).toString();
  icon.style.cssText += style;
}

export class SoundsPluginInstance implements IContainerPlugin {
  /** Map of audio source URLs to decoded audio buffers */
  #audioMap: Map<string, AudioBuffer>;
  /** Array of active audio source nodes */
  readonly #audioSources: AudioScheduledSourceNode[];
  /** The particles container */
  readonly #container;
  /** The particles engine */
  readonly #engine;
  /** The gain node for volume control */
  #gain?: GainNode;
  /** The mute icon image element */
  #muteImg?: HTMLImageElement;
  /** The unmute icon image element */
  #unmuteImg?: HTMLImageElement;
  /** The current volume level */
  #volume: number;
  /** The volume down icon image element */
  #volumeDownImg?: HTMLImageElement;
  /** The volume up icon image element */
  #volumeUpImg?: HTMLImageElement;

  /**
   * Creates a new SoundsPluginInstance
   * @param container - the container using this plugin
   * @param engine - the engine instance
   */
  constructor(container: SoundsContainer, engine: Engine) {
    this.#container = container;
    this.#engine = engine;
    this.#volume = 0;
    this.#audioSources = [];
    this.#audioMap = new Map<string, AudioBuffer>();
  }

  /** @inheritDoc */
  async init(): Promise<void> {
    const container = this.#container,
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
        },
        listenerOptions = {
          capture: true,
          once: true,
        };

      addEventListener(mouseDownEvent, firstClickHandler, listenerOptions);
      addEventListener(touchStartEvent, firstClickHandler, listenerOptions);
    }

    this.#volume = soundsOptions.volume.value;

    const events = soundsOptions.events;

    this.#audioMap = new Map<string, AudioBuffer>();

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
          audioContext = this.#getAudioContext(),
          audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        this.#audioMap.set(audio.source, audioBuffer);
      });

      if (promises instanceof Promise) {
        await promises;
      } else {
        await Promise.allSettled(promises);
      }
    }
  }

  /** Mutes the audio */
  async mute(): Promise<void> {
    if (!this.#container.muted) {
      await this.toggleMute();
    }
  }

  /** @inheritDoc */
  async start(): Promise<void> {
    const container = this.#container,
      options = container.actualOptions,
      soundsOptions = options.sounds;

    if (!soundsOptions?.enable || !container.canvas.domElement) {
      return;
    }

    container.muted = true;

    const canvas = container.canvas.domElement,
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

    this.#muteImg = initImage({
      container,
      options,
      pos,
      display,
      iconOptions: mute,
      margin,
      rightOffsets: [volumeDown.width, volumeUp.width],
      clickCb: toggleMute,
    });

    this.#unmuteImg = initImage({
      container,
      options,
      pos,
      display: ImageDisplay.None,
      iconOptions: unmute,
      margin,
      rightOffsets: [volumeDown.width, volumeUp.width],
      clickCb: toggleMute,
    });

    this.#volumeDownImg = initImage({
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

    this.#volumeUpImg = initImage({
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

  /** @inheritDoc */
  stop(): void {
    this.#container.muted = true;

    void (async (): Promise<void> => {
      await this.#mute();

      removeImage(this.#muteImg);
      removeImage(this.#unmuteImg);
      removeImage(this.#volumeDownImg);
      removeImage(this.#volumeUpImg);
    })();
  }

  /** Toggles between mute and unmute */
  async toggleMute(): Promise<void> {
    const container = this.#container;

    container.muted = !container.muted;

    this.#updateMuteIcons();
    await this.#updateMuteStatus();
  }

  /** Unmutes the audio */
  async unmute(): Promise<void> {
    if (this.#container.muted) {
      await this.toggleMute();
    }
  }

  /** Decreases the volume by the configured step */
  async volumeDown(): Promise<void> {
    const container = this.#container,
      soundsOptions = container.actualOptions.sounds;

    if (!soundsOptions?.enable) {
      return;
    }

    if (container.muted) {
      this.#volume = 0;
    }

    this.#volume -= soundsOptions.volume.step;

    await this.#updateVolume();
  }

  /** Increases the volume by the configured step */
  async volumeUp(): Promise<void> {
    const container = this.#container,
      soundsOptions = container.actualOptions.sounds;

    if (!soundsOptions?.enable) {
      return;
    }

    this.#volume += soundsOptions.volume.step;

    await this.#updateVolume();
  }

  #addBuffer(audioCtx: AudioContext): AudioBufferSourceNode {
    const buffer = audioCtx.createBufferSource();

    this.#audioSources.push(buffer);

    return buffer;
  }

  #addOscillator(audioCtx: AudioContext): OscillatorNode {
    const oscillator = audioCtx.createOscillator();

    this.#audioSources.push(oscillator);

    return oscillator;
  }

  #getAudioContext(): AudioContext {
    const container = this.#container;

    container.audioContext ??= new AudioContext();

    return container.audioContext;
  }

  #initEvents(): void {
    const container = this.#container,
      soundsOptions = container.actualOptions.sounds;

    if (!soundsOptions?.enable || !container.canvas.domElement) {
      return;
    }

    for (const event of soundsOptions.events) {
      const cb = (args?: CustomEventArgs): void => {
        if (!args) {
          return;
        }

        void (async (): Promise<void> => {
          const filterNotValid = event.filter && !event.filter(args);

          if (this.#container !== args.container) {
            return;
          }

          if (!!this.#container.muted || this.#container.destroyed) {
            executeOnSingleOrMultiple(event.event, item => {
              this.#engine.removeEventListener(item, cb);
            });

            return;
          }

          if (filterNotValid) {
            return;
          }

          const defaultNoteIndex = 0;

          if (event.audio) {
            const audio = itemFromSingleOrMultiple(event.audio);

            if (!audio) {
              return;
            }

            this.#playBuffer(audio);
          } else if (event.melodies) {
            const melody = itemFromArray(event.melodies);

            if (!melody) {
              return;
            }

            if (melody.melodies.length) {
              await Promise.allSettled(
                melody.melodies.map(m => this.#playNote(m.notes, defaultNoteIndex, melody.loop)),
              );
            } else {
              await this.#playNote(melody.notes, defaultNoteIndex, melody.loop);
            }
          } else if (event.notes) {
            const note = itemFromArray(event.notes);

            if (!note) {
              return;
            }

            await this.#playNote([note], defaultNoteIndex, false);
          }
        })();
      };

      executeOnSingleOrMultiple(event.event, item => {
        this.#engine.addEventListener(item, cb);
      });
    }
  }

  async #mute(): Promise<void> {
    const container = this.#container,
      audioContext = this.#getAudioContext();

    for (const source of this.#audioSources) {
      this.#removeAudioSource(source);
    }

    if (this.#gain) {
      this.#gain.disconnect();
    }

    await audioContext.close();

    container.audioContext = undefined;

    this.#container.dispatchEvent(SoundsEventType.mute);
  }

  #playBuffer(audio: SoundsAudio): void {
    const audioBuffer = this.#audioMap.get(audio.source);

    if (!audioBuffer) {
      return;
    }

    const audioCtx = this.#container.audioContext;

    if (!audioCtx) {
      return;
    }

    const source = this.#addBuffer(audioCtx);

    source.loop = audio.loop;
    source.buffer = audioBuffer;

    source.connect(this.#gain ?? audioCtx.destination);
    source.start();
  }

  async #playFrequency(frequency: number, duration: number): Promise<void> {
    if (!this.#gain || this.#container.muted) {
      return;
    }

    const audioContext = this.#getAudioContext(),
      oscillator = this.#addOscillator(audioContext);

    oscillator.connect(this.#gain);

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    oscillator.start();

    return new Promise<void>(resolve => {
      setTimeout(() => {
        this.#removeAudioSource(oscillator);

        resolve();
      }, duration);
    });
  }

  #playMuteSound(): void {
    if (this.#container.muted) {
      return;
    }

    const audioContext = this.#getAudioContext(),
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
  }

  async #playNote(notes: SoundsNote[], noteIdx: number, loop: boolean): Promise<void> {
    if (this.#container.muted) {
      return;
    }

    const note = notes[noteIdx];

    if (!note) {
      return;
    }

    const value = note.value,
      promises = executeOnSingleOrMultiple(value, async (_, idx) => {
        return this.#playNoteValue(notes, noteIdx, idx);
      });

    await (isArray(promises) ? Promise.allSettled(promises) : promises);

    const indexOffset = 1;

    let nextNoteIdx = noteIdx + indexOffset;

    if (loop && nextNoteIdx >= notes.length) {
      nextNoteIdx = nextNoteIdx % notes.length;
    }

    await this.#playNote(notes, nextNoteIdx, loop);
  }

  async #playNoteValue(notes: SoundsNote[], noteIdx: number, valueIdx: number): Promise<void> {
    const note = notes[noteIdx];

    if (!note) {
      return;
    }

    const value = itemFromSingleOrMultiple(note.value, valueIdx, true);

    if (!value) {
      return;
    }

    try {
      const freq = getNoteFrequency(value);

      if (!isNumber(freq)) {
        return;
      }

      await this.#playFrequency(freq, note.duration);
    } catch (e) {
      getLogger().error(e);
    }
  }

  #removeAudioSource(source: AudioScheduledSourceNode): void {
    source.stop();
    source.disconnect();

    const deleteCount = 1;

    this.#audioSources.splice(this.#audioSources.indexOf(source), deleteCount);
  }

  #unmute(): void {
    const container = this.#container,
      options = container.actualOptions,
      soundsOptions = options.sounds;

    if (!soundsOptions) {
      return;
    }

    const audioContext = this.#getAudioContext(),
      gain = audioContext.createGain();

    gain.connect(audioContext.destination);

    gain.gain.value = soundsOptions.volume.value / percentDenominator;

    this.#gain = gain;

    this.#initEvents();

    this.#container.dispatchEvent(SoundsEventType.unmute);
  }

  #updateMuteIcons(): void {
    const container = this.#container,
      soundsOptions = container.actualOptions.sounds;

    if (!soundsOptions?.enable || !soundsOptions.icons.enable) {
      return;
    }

    const muteImg = this.#muteImg,
      unmuteImg = this.#unmuteImg;

    if (muteImg) {
      muteImg.style.display = container.muted ? "block" : "none";
    }

    if (unmuteImg) {
      unmuteImg.style.display = container.muted ? "none" : "block";
    }
  }

  async #updateMuteStatus(): Promise<void> {
    const container = this.#container,
      audioContext = this.#getAudioContext();

    if (container.muted) {
      await audioContext.suspend();
      await this.#mute();
    } else {
      await audioContext.resume();
      this.#unmute();

      this.#playMuteSound();
    }
  }

  async #updateVolume(): Promise<void> {
    const container = this.#container,
      soundsOptions = container.actualOptions.sounds;

    if (!soundsOptions?.enable) {
      return;
    }

    clamp(this.#volume, soundsOptions.volume.min, soundsOptions.volume.max);

    let stateChanged = false;

    if (this.#volume <= minVolume && !container.muted) {
      this.#volume = 0;

      container.muted = true;
      stateChanged = true;
    } else if (this.#volume > minVolume && container.muted) {
      container.muted = false;
      stateChanged = true;
    }

    if (stateChanged) {
      this.#updateMuteIcons();
      await this.#updateMuteStatus();
    }

    if (this.#gain?.gain) {
      this.#gain.gain.value = this.#volume / percentDenominator;
    }
  }
}
