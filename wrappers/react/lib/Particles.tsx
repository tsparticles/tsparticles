import { FC, useEffect, useRef } from "react";
import type { IParticlesProps } from "./IParticlesProps";
import { getLogger, tsParticles, type Container } from "@tsparticles/engine";
import { useParticlesProvider } from "./ParticlesProvider";

const Particles: FC<IParticlesProps> = props => {
  const { className, id, options, particlesLoaded, style, url } = props;
  const { loaded } = useParticlesProvider();
  const containerRef = useRef<Container | undefined>(undefined);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    const particleId = id ?? "tsparticles";

    let cancelled = false;

    void tsParticles
      .load({ id: particleId, url, options })
      .then(c => {
        if (cancelled) {
          /* a newer effect owns the animation now, so a container from this load is not referenced anymore */
          c?.destroy();

          return;
        }

        if (c?.destroyed) {
          return;
        }

        if (!document.getElementById(particleId)) {
          c?.destroy();

          return;
        }

        containerRef.current = c;

        particlesLoaded?.(c);
      })
      .catch(error => {
        if (!cancelled) {
          getLogger().error("Particles: error loading particles", error);
        }
      });

    return () => {
      cancelled = true;

      containerRef.current?.destroy();

      containerRef.current = undefined;
    };
  }, [id, loaded, options, particlesLoaded, url]);

  return <div id={id ?? "tsparticles"} className={className} style={style}></div>;
};

export default Particles;
