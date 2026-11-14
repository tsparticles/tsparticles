import { type Container, getLogger } from "@tsparticles/engine";
import { FC, useEffect, useRef } from "react";
import type { IParticlesProps } from "./IParticlesProps";
import { useParticlesProvider } from "./ParticlesProvider";

const Particles: FC<IParticlesProps> = props => {
  const { className, id, options, particlesLoaded, style, url } = props;
  const { engine, loaded } = useParticlesProvider();
  const containerRef = useRef<Container | undefined>(undefined);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    const particleId = id ?? "tsparticles";

    let cancelled = false;

    void engine
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

        void (async () => {
          try {
            await particlesLoaded?.(c);
          } catch (error) {
            getLogger().error("Particles: error in particlesLoaded callback", error);
          }
        })();
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
  }, [engine, id, loaded, options, particlesLoaded, url]);

  /* An unfinished load still owns its canvas until its cleanup completes. */
  return <div key={id ?? "tsparticles"} id={id ?? "tsparticles"} className={className} style={style}></div>;
};

export default Particles;
