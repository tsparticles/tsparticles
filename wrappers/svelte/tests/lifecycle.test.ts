import { expect, it, vi } from 'vitest';
import Particles from '../src/lib/Particles.svelte';
import { createClassComponent } from 'svelte/legacy';
import { initParticlesEngine } from '../src/lib/utils.js';

const { loadMock } = vi.hoisted(() => ({ loadMock: vi.fn() }));

const engine = {
	load: loadMock,
	init: vi.fn(async () => undefined)
} as unknown as import('@tsparticles/engine').Engine;

vi.mock('@tsparticles/engine', () => ({
	getLogger: () => ({ error: vi.fn() }),
	tsParticles: { load: loadMock }
}));

it('replaces the host when the scene id changes during startup', async () => {
	const stale = { destroy: vi.fn() },
		pending = Promise.withResolvers<typeof stale>(),
		current = { destroy: vi.fn() },
		loaded = vi.fn(),
		host = document.createElement('div');

	await initParticlesEngine(engine);
	loadMock.mockReturnValueOnce(pending.promise).mockResolvedValueOnce(current);

	const component = createClassComponent({
		component: Particles,
		target: host,
		props: { engine, id: 'first' }
	});

	component.$on('particlesLoaded', loaded);

	try {
		await vi.waitFor(() => expect(loadMock).toHaveBeenCalledOnce());

		const firstHost = host.querySelector('#first');

		expect(firstHost).toBeInstanceOf(HTMLDivElement);

		component.$set({ id: 'second' });

		await vi.waitFor(() => expect(loaded).toHaveBeenCalledOnce());
		const secondHost = host.querySelector('#second');

		expect(secondHost).toBeInstanceOf(HTMLDivElement);
		expect(secondHost).not.toBe(firstHost);

		pending.resolve(stale);

		await vi.waitFor(() => expect(stale.destroy).toHaveBeenCalledOnce());
		expect(loaded).toHaveBeenCalledOnce();
	} finally {
		component.$destroy();
	}
});
