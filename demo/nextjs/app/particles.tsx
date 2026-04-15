"use client";

import { NextParticles } from "@tsparticles/nextjs";
import type { Container } from "@tsparticles/engine";
import { useCallback, useMemo, useRef } from "react";

export default function ParticlesComponent(props: { id: string }) {
  const containerRef = useRef<Container | undefined>(undefined);

  const particlesLoaded = useCallback(
    (container?: Container) => {
      containerRef.current = container;

      globalThis.particlesContainer = container as typeof globalThis.particlesContainer;
    },
    [containerRef],
  );

  const options = useMemo(
    () => ({
      fullScreen: {
        zIndex: -1,
      },
      particles: {
        number: {
          value: 100,
        },
        links: {
          enable: true,
        },
        move: {
          enable: true,
        },
        size: {
          value: 3,
        },
      },
      themes: [
        {
          name: "light",
          default: {
            value: true,
            auto: true,
            mode: "light",
          },
          options: {
            background: {
              color: "#ffffff",
            },
            particles: {
              paint: {
                fill: {
                  color: {
                    value: "#000000",
                  },
                  enable: true,
                },
              },
              links: {
                color: "#000000",
              },
            },
          },
        },
        {
          name: "dark",
          default: {
            value: true,
            auto: true,
            mode: "dark",
          },
          options: {
            background: {
              color: "#000000",
            },
            particles: {
              paint: {
                fill: {
                  color: {
                    value: "#ffffff",
                  },
                  enable: true,
                },
              },
              links: {
                color: "#ffffff",
              },
            },
          },
        },
      ],
    }),
    [],
  );

  return <NextParticles id={props.id} particlesLoaded={particlesLoaded} options={options} />;
}
