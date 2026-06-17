"use client";

import { NextParticles } from "@tsparticles/nextjs";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  background: { color: { value: "#1a1a2e" } },
  fpsLimit: 60,
  particles: {
    number: { value: 80, density: { enable: true } },
    color: { value: ["#6c5ce7", "#a29bfe", "#fd79a8"] },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: { min: 1, max: 4 }, random: true },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      outModes: { default: "out" },
    },
  },
  detectRetina: true,
};

export default function Home() {
  return <NextParticles id="tsparticles" options={options} />;
}
