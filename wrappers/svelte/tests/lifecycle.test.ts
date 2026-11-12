import { createClassComponent } from 'svelte/legacy';
import { expect, it, vi } from 'vitest';
import Particles from '../src/lib/Particles.svelte';
import { initParticlesEngine } from '../src/lib/utils.js';

const { loadMock } = vi.hoisted(() => ({ loadMock: vi.fn() }));

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

	await initParticlesEngine();
	loadMock.mockReturnValueOnce(pending.promise).mockResolvedValueOnce(current);

	const component = createClassComponent({
		component: Particles,
		target: host,
		props: { id: 'first' }
	});

	component.$on('particlesLoaded', loaded);

	try {
		await vi.waitFor(() => expect(loadMock).toHaveBeenCalledOnce());

		const firstHost = host.querySelector('#first');

		expect(firstHost).toBeInstanceOf(HTMLDivElement);

		component.$set({ id: 'second' });

		await vi.waitFor(() => expect(loaded).toHaveBeenCalledOnce());
		expect(host.querySelector('#second')).not.toBe(firstHost);

		pending.resolve(stale);

		await vi.waitFor(() => expect(stale.destroy).toHaveBeenCalledOnce());
		expect(loaded).toHaveBeenCalledOnce();
	} finally {
		component.$destroy();
	}
});
