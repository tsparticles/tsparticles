import { afterEach, beforeAll, beforeEach, expect, it, vi } from "vitest";
import Vue from "vue";
import Particles from "../src/Particles/vue-particles.vue";
import { ensureParticlesInitialization } from "../src/Particles/event-bus";

const { errorMock, loadMock } = vi.hoisted(() => ({ errorMock: vi.fn(), loadMock: vi.fn() }));

vi.mock("@tsparticles/engine", () => ({
  getLogger: () => ({ error: errorMock }),
  tsParticles: { init: vi.fn(), load: loadMock },
}));

let view: Vue | undefined;

beforeAll(async () => {
  await ensureParticlesInitialization();
});

beforeEach(() => {
  errorMock.mockClear();
  loadMock.mockReset();
});

afterEach(() => {
  view?.$destroy();
  view = undefined;
});

function mount(particlesLoaded: (container: unknown) => void): Vue {
  view = new Vue({
    data: () => ({ id: "initial" }),
    render(createElement) {
      return createElement(Particles, { props: { id: this.id, particlesLoaded } });
    },
  }).$mount();

  return view;
}

it("reports engine and callback failures separately and retries when the id changes", async () => {
  const engineError = new Error("engine failed"),
    callbackError = new Error("callback failed"),
    current = { destroy: vi.fn() },
    loaded = vi.fn().mockRejectedValueOnce(callbackError);

  loadMock.mockRejectedValueOnce(engineError).mockResolvedValueOnce(current);

  const parent = mount(loaded);

  await vi.waitFor(() => expect(errorMock).toHaveBeenCalledWith("VueParticles: error loading particles", engineError));
  expect(loaded).not.toHaveBeenCalled();

  parent.$data.id = "updated";

  await vi.waitFor(() =>
    expect(errorMock).toHaveBeenCalledWith("VueParticles: error in particlesLoaded callback", callbackError),
  );
  expect(loaded).toHaveBeenCalledExactlyOnceWith(current);
});

it("destroys a load result that arrives after unmount without calling the consumer", async () => {
  const stale = { destroy: vi.fn() },
    pending = Promise.withResolvers<typeof stale>(),
    loaded = vi.fn();

  loadMock.mockReturnValueOnce(pending.promise);

  const parent = mount(loaded);

  await vi.waitFor(() => expect(loadMock).toHaveBeenCalledOnce());
  parent.$destroy();
  view = undefined;
  pending.resolve(stale);

  await vi.waitFor(() => expect(stale.destroy).toHaveBeenCalledOnce());
  expect(loaded).not.toHaveBeenCalled();
});

it("replaces the host before a new id starts loading", async () => {
  const stale = { destroy: vi.fn() },
    pending = Promise.withResolvers<typeof stale>(),
    current = { destroy: vi.fn() },
    loaded = vi.fn();

  loadMock.mockReturnValueOnce(pending.promise).mockResolvedValueOnce(current);

  const parent = mount(loaded),
    firstHost = parent.$el;

  await vi.waitFor(() => expect(loadMock).toHaveBeenCalledOnce());
  parent.$data.id = "updated";

  await vi.waitFor(() => expect(loaded).toHaveBeenCalledExactlyOnceWith(current));
  expect(parent.$el).not.toBe(firstHost);

  pending.resolve(stale);

  await vi.waitFor(() => expect(stale.destroy).toHaveBeenCalledOnce());
  expect(loaded).toHaveBeenCalledOnce();
});
