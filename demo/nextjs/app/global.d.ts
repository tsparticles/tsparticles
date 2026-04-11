import type { Container } from "@tsparticles/engine";

declare global {
  var particlesContainer:
    | (Container & {
        loadTheme: (themeName: string) => Promise<void>;
      })
    | undefined;
}

export {};
