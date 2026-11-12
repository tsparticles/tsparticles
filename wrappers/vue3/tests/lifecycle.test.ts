import { createApp, h, ref } from "vue";
import { expect, it, vi } from "vitest";
import Particles from "../src/components/vue-particles.vue";
import { particlesProviderKey } from "../src/components/particles-provider.js";

const { loadMock } = vi.hoisted(() => ({ loadMock: vi.fn() }));

vi.mock("@tsparticles/engine", () => ({
  tsParticles: { load: loadMock },
}));

it("replaces the host when its id changes during a pending load", async () => {
  const stale = { destroy: vi.fn() },
    pending = Promise.withResolvers<typeof stale>(),
    current = { destroy: vi.fn() },
    loaded = vi.fn(),
    id = ref("first"),
    host = document.createElement("div"),
    app = createApp(() => h(Particles, { id: id.value, onParticlesLoaded: loaded }));

  loadMock.mockReturnValueOnce(pending.promise).mockResolvedValueOnce(current);
  app.provide(particlesProviderKey, { loaded: true });
  app.mount(host);

  try {
    await vi.waitFor(() => expect(loadMock).toHaveBeenCalledOnce());

    const firstHost = host.querySelector("#first");

    expect(firstHost).toBeInstanceOf(HTMLDivElement);

    id.value = "second";

    await vi.waitFor(() => expect(loaded).toHaveBeenCalledExactlyOnceWith(current));
    expect(host.querySelector("#second")).not.toBe(firstHost);

    pending.resolve(stale);

    await vi.waitFor(() => expect(stale.destroy).toHaveBeenCalledOnce());
    expect(loaded).toHaveBeenCalledOnce();
  } finally {
    app.unmount();
  }
});
