import { FC, useEffect } from "react";
import type { IParticlesProps } from "./IParticlesProps";
import { tsParticles, type Container } from "@tsparticles/engine";
import { useParticlesProvider } from "./ParticlesProvider";

const Particles: FC<IParticlesProps> = props => {
  const { className, id, options, particlesLoaded, style, url } = props;
  const { loaded } = useParticlesProvider();

  useEffect(() => {
    if (!loaded) {
      return;
    }

    let container: Container | undefined;

    tsParticles.load({ id: id ?? "tsparticles", url, options }).then(c => {
      container = c;

      particlesLoaded?.(c);
    });

    return () => {
      container?.destroy();
    };
  }, [id, loaded, options, particlesLoaded, url]);

  return <div id={id ?? "tsparticles"} className={className} style={style}></div>;
};

export default Particles;
