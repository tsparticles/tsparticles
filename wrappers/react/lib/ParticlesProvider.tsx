import type { Engine } from "@tsparticles/engine";
import { tsParticles } from "@tsparticles/engine";
import { createContext, type FC, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void>;

export interface IParticlesProviderProps extends PropsWithChildren {
  init: ParticlesPluginRegistrar;
}

interface IParticlesProviderContext {
  loaded: boolean;
}

let initialized = false;
let initPromise: Promise<void> | undefined;
let initCallback: ParticlesPluginRegistrar | undefined;

const ParticlesProviderContext = createContext<IParticlesProviderContext>({ loaded: false });

export const ParticlesProvider: FC<IParticlesProviderProps> = ({ children, init }) => {
  const [loaded, setLoaded] = useState(initialized);

  useEffect(() => {
    let cancelled = false;

    if (initialized) {
      return;
    }

    if (!initPromise) {
      initCallback = init;

      initPromise = (async () => {
        await init(tsParticles);

        initialized = true;
      })().catch(error => {
        initPromise = undefined;
        initCallback = undefined;

        throw error;
      });
    } else if (initCallback && initCallback !== init) {
      throw new Error("ParticlesProvider init callback must be stable across the app lifecycle.");
    }

    initPromise
      .then(() => {
        if (!cancelled) {
          setLoaded(true);
        }
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setLoaded(false);
      });

    return () => {
      cancelled = true;
    };
  }, [init]);

  const value = useMemo<IParticlesProviderContext>(() => ({ loaded }), [loaded]);

  return (
    <ParticlesProviderContext.Provider value={value}>{loaded ? children : null}</ParticlesProviderContext.Provider>
  );
};

export function useParticlesProvider(): IParticlesProviderContext {
  return useContext(ParticlesProviderContext);
}
