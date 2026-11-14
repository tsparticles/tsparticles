const states = new WeakMap();
function getInitializationState(engine) {
  const existing = states.get(engine);
  if (existing) {
    return existing;
  }
  let resolve = () => {},
    reject = _error => {};
  const promise = new Promise((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  const state = { loaded: false, started: false, promise, resolve, reject };
  states.set(engine, state);
  return state;
}
export async function initParticlesEngine(engine, init) {
  const state = getInitializationState(engine);
  if (!state.started) {
    state.started = true;
    void Promise.resolve()
      .then(async () => {
        await init?.(engine);
        await engine.init();
        state.loaded = true;
        state.resolve();
      })
      .catch(error => {
        states.delete(engine);
        state.reject(error);
      });
  }
  return state.promise;
}
export function isParticlesEngineInitialized(engine) {
  return states.get(engine)?.loaded ?? false;
}
export async function waitForParticlesEngineInitialization(engine) {
  await getInitializationState(engine).promise;
}
