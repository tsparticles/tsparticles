import { type FC, type PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Engine } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void>;

const states = new WeakMap<Engine, { loaded: boolean; promise: Promise<void> }>();

async function initializeEngine(engine: Engine, init?: ParticlesPluginRegistrar): Promise<void> {
  const existing = states.get(engine);
  if (existing) {
    return existing.promise;
  }
  const state = { loaded: false, promise: Promise.resolve() };
  states.set(engine, state);
  state.promise = Promise.resolve()
    .then(async () => {
      await init?.(engine);
      await engine.init();
      state.loaded = true;
    })
    .catch((error: unknown) => {
      states.delete(engine);
      throw error;
    });
  return state.promise;
}

export interface IParticlesProviderProps extends PropsWithChildren {
  engine: Engine;
  init?: ParticlesPluginRegistrar;
}

interface IParticlesProviderContext {
  engine: Engine;
  loaded: boolean;
}

const ParticlesProviderContext = createContext<IParticlesProviderContext | undefined>(undefined);

export const ParticlesProvider: FC<IParticlesProviderProps> = ({ children, engine, init }) => {
  const [readyEngine, setReadyEngine] = useState<Engine>();

  useEffect(() => {
    let cancelled = false;
    if (states.get(engine)?.loaded) {
      setReadyEngine(engine);
      return;
    }
    setReadyEngine(undefined);

    void (async () => {
      await initializeEngine(engine, init);
      if (!cancelled) {
        setReadyEngine(engine);
      }
    })().catch(() => {
      if (!cancelled) {
        setReadyEngine(undefined);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [engine, init]);

  const loaded = readyEngine === engine;
  const value = useMemo<IParticlesProviderContext>(() => ({ engine, loaded }), [engine, loaded]);

  return (
    <ParticlesProviderContext.Provider value={value}>{loaded ? children : null}</ParticlesProviderContext.Provider>
  );
};

export function useParticlesProvider(): IParticlesProviderContext {
  const context = useContext(ParticlesProviderContext);
  if (!context) {
    throw new Error("Particles requires a ParticlesProvider with an explicit engine.");
  }
  return context;
}
