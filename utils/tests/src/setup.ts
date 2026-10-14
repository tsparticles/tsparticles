/* eslint-disable */
// Test-environment shims for browser APIs that jsdom does not provide.

if (!("AudioContext" in globalThis)) {
  Object.defineProperty(globalThis, "AudioContext", {
    value: class {
      readonly currentTime = 0;
      readonly destination = {};
      close(): Promise<void> {
        return Promise.resolve();
      }
      createGain(): never {
        throw new Error("AudioContext.createGain not implemented in tests");
      }
      createOscillator(): never {
        throw new Error("AudioContext.createOscillator not implemented in tests");
      }
      createBufferSource(): never {
        throw new Error("AudioContext.createBufferSource not implemented in tests");
      }
    },
    configurable: true,
  });
}

if (!("MediaRecorder" in globalThis)) {
  Object.defineProperty(globalThis, "MediaRecorder", {
    value: class {
      static isTypeSupported(): boolean {
        return false;
      }
    },
    configurable: true,
  });
}
