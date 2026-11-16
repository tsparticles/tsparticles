import {
  type CustomEventArgs,
  type Engine,
  type IContainerPlugin,
  clamp,
  executeOnSingleOrMultiple,
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
  minVolume = 0,
  millisecondsPerSecond = 1000,
  noteAttackDuration = 0.01,
  noteReleaseDuration = 0.03,
  muteSoundDuration = 0.01,
  defaultMaxVoices = 32,
  volumeTransitionTime = 0.015;

/**
 * @param data - The data to handle
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
 * @param image - The image
 */
function removeImage(image?: HTMLImageElement): void {
  if (!image) {
    return;
  }

  image.remove();
}

/**
 * @param icon - The icon
 * @param top - The top
 * @param left - The left
 * @param display - The display
 * @param zIndex - The zIndex
 * @param width - The width
 * @param margin - The margin
 * @param style - The style
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
  /** The registered sound event listeners */
  readonly #eventListeners: { callback: (args?: CustomEventArgs) => void; eventName: string }[];
  /** The pending first-click handler */
  #firstClickHandler?: () => void;
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
    this.#eventListeners = [];
  }

  async init(): Promise<void> {
    const container = this.#container,
      options = container.actualOptions,
      soundsOptions = options.sounds;

    if (!soundsOptions?.enable) {
      return;
    }

    if (soundsOptions.autoPlay && isWindowMuted()) {
      const firstClickHandler = (): void => {
          removeEventListener(mouseDownEvent, firstClickHandler, true);
          removeEventListener(touchStartEvent, firstClickHandler, true);
          this.#firstClickHandler = undefined;

          unmuteWindow();

          void this.unmute();
        },
        listenerOptions = {
          capture: true,
          once: true,
        };

      this.#firstClickHandler = firstClickHandler;

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
        try {
          const response = await fetch(audio.source);

          if (!response.ok) {
            throw new Error(`Failed to load audio "${audio.source}": ${response.status} ${response.statusText}`);
          }

          const arrayBuffer = await response.arrayBuffer(),
            audioContext = this.#getAudioContext(),
            audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

          this.#audioMap.set(audio.source, audioBuffer);
        } catch (error) {
          this.#container.engine.getLogger().error(error);
        }
      });

      await Promise.allSettled(isArray(promises) ? promises : [promises]);
    }
  }

  /** Mutes the audio */
  async mute(): Promise<void> {
    if (!this.#container.muted) {
      await this.toggleMute();
    }
  }

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

  stop(): void {
    const firstClickHandler = this.#firstClickHandler;

    if (firstClickHandler) {
      removeEventListener(mouseDownEvent, firstClickHandler, true);
      removeEventListener(touchStartEvent, firstClickHandler, true);
      this.#firstClickHandler = undefined;
    }

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
    this.#ensureVoiceCapacity();

    const buffer = audioCtx.createBufferSource();

    this.#audioSources.push(buffer);

    return buffer;
  }

  #addOscillator(audioCtx: AudioContext): OscillatorNode {
    this.#ensureVoiceCapacity();

    const oscillator = audioCtx.createOscillator();

    this.#audioSources.push(oscillator);

    return oscillator;
  }

  #ensureVoiceCapacity(): void {
    const maxVoices = this.#container.actualOptions.sounds?.maxVoices ?? defaultMaxVoices;

    while (this.#audioSources.length >= maxVoices) {
      const oldestSource = this.#audioSources[0];

      if (!oldestSource) {
        return;
      }

      this.#removeAudioSource(oldestSource);
    }
  }

  #getAudioContext(): AudioContext {
    const container = this.#container;

    container.audioContext ??= new AudioContext();

    return container.audioContext;
  }

  #initEvents(): void {
    this.#removeEventListeners();

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
            this.#removeEventListeners();

            return;
          }

          if (filterNotValid) {
            return;
          }

          const defaultNoteIndex = 0;

          if (event.audio) {
            const audio = itemFromSingleOrMultiple(
              event.audio,
              undefined,
              undefined,
              this.#container.engine.getRandomFn(),
            );

            if (!audio) {
              return;
            }

            this.#playBuffer(audio);
          } else if (event.melodies) {
            const melody = itemFromArray(event.melodies, undefined, true, this.#container.engine.getRandomFn());

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
            const note = itemFromArray(event.notes, undefined, true, this.#container.engine.getRandomFn());

            if (!note) {
              return;
            }

            await this.#playNote([note], defaultNoteIndex, false);
          }
        })();
      };

      executeOnSingleOrMultiple(event.event, item => {
        this.#engine.addEventListener(item, cb);
        this.#eventListeners.push({ eventName: item, callback: cb });
      });
    }
  }

  async #mute(): Promise<void> {
    const container = this.#container;

    this.#removeEventListeners();

    for (const source of [...this.#audioSources]) {
      this.#removeAudioSource(source);
    }

    if (this.#gain) {
      this.#gain.disconnect();
    }

    const audioContext = container.audioContext;

    if (audioContext) {
      await audioContext.close();

      container.audioContext = undefined;
    }

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
    source.addEventListener(
      "ended",
      () => {
        this.#removeAudioSource(source);
      },
      { once: true },
    );
    source.start();
  }

  async #playFrequency(
    frequency: number,
    duration: number,
    waveform: NonNullable<SoundsNote["waveform"]>,
  ): Promise<void> {
    if (!this.#gain || this.#container.muted) {
      return;
    }

    const audioContext = this.#getAudioContext(),
      oscillator = this.#addOscillator(audioContext),
      noteGain = audioContext.createGain(),
      now = audioContext.currentTime,
      end = now + Math.max(duration / millisecondsPerSecond, 0),
      attackEnd = Math.min(now + noteAttackDuration, end),
      releaseStart = Math.max(attackEnd, end - noteReleaseDuration);

    oscillator.connect(noteGain);
    noteGain.connect(this.#gain);

    oscillator.type = waveform;
    oscillator.frequency.value = frequency;

    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(1, attackEnd);
    noteGain.gain.setValueAtTime(1, releaseStart);
    noteGain.gain.linearRampToValueAtTime(0, end);

    return new Promise<void>(resolve => {
      oscillator.addEventListener(
        "ended",
        () => {
          this.#removeAudioSource(oscillator);
          noteGain.disconnect();
          resolve();
        },
        { once: true },
      );

      oscillator.start(now);
      oscillator.stop(end);
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
    oscillator.addEventListener(
      "ended",
      () => {
        oscillator.disconnect();
        gain.disconnect();
      },
      { once: true },
    );
    oscillator.start();
    oscillator.stop(audioContext.currentTime + muteSoundDuration);
  }

  async #playNote(notes: SoundsNote[], noteIdx: number, loop: boolean): Promise<void> {
    if (!notes.length) {
      return;
    }

    let currentNoteIdx = noteIdx;

    while (!this.#container.muted && !this.#container.destroyed) {
      if (currentNoteIdx >= notes.length) {
        if (!loop) {
          return;
        }

        currentNoteIdx = 0;
      }

      const note = notes[currentNoteIdx];

      if (!note) {
        return;
      }

      const value = note.value,
        promises = executeOnSingleOrMultiple(value, async (_, idx) => {
          return this.#playNoteValue(notes, currentNoteIdx, idx);
        });

      await (isArray(promises) ? Promise.allSettled(promises) : promises);

      currentNoteIdx++;
    }
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

      await this.#playFrequency(freq, note.duration, note.waveform);
    } catch (e) {
      this.#container.engine.getLogger().error(e);
    }
  }

  #removeAudioSource(source: AudioScheduledSourceNode): void {
    const sourceIndex = this.#audioSources.indexOf(source);

    if (sourceIndex < 0) {
      return;
    }

    try {
      source.stop();
    } catch {
      // The source may already have stopped.
    }

    source.disconnect();

    const deleteCount = 1;

    this.#audioSources.splice(sourceIndex, deleteCount);
  }

  #removeEventListeners(): void {
    for (const { eventName, callback } of this.#eventListeners) {
      this.#engine.removeEventListener(eventName, callback);
    }

    this.#eventListeners.length = 0;
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

    gain.gain.setTargetAtTime(
      soundsOptions.volume.value / percentDenominator,
      audioContext.currentTime,
      volumeTransitionTime,
    );

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
    const container = this.#container;

    if (container.muted) {
      await this.#mute();
    } else {
      const audioContext = this.#getAudioContext();

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

    this.#volume = clamp(this.#volume, soundsOptions.volume.min, soundsOptions.volume.max);

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
      this.#gain.gain.setTargetAtTime(
        this.#volume / percentDenominator,
        this.#gain.context.currentTime,
        volumeTransitionTime,
      );
    }
  }
}
