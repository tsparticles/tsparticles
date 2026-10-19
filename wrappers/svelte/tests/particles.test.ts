/* eslint-disable */
import { describe, expect, it, vi } from 'vitest';

const { initMock, loadMock } = vi.hoisted(() => ({
	initMock: vi.fn(async () => Promise.resolve()),
	loadMock: vi.fn(async () => Promise.resolve({ destroy: vi.fn() }))
}));

vi.mock('@tsparticles/engine', () => ({
	tsParticles: {
		init: initMock,
		load: loadMock
	}
}));

type UtilsModule = typeof import('../src/lib/utils.js');

async function loadUtils(): Promise<UtilsModule> {
	vi.resetModules();

	return await import('../src/lib/utils.js');
}

describe('svelte initParticlesEngine', () => {
	it('calls the init callback with the engine and initializes it', async () => {
		const module = await loadUtils(),
			{ tsParticles } = await import('@tsparticles/engine'),
			init = vi.fn(async () => Promise.resolve());

		(tsParticles.init as ReturnType<typeof vi.fn>).mockClear();

		await module.initParticlesEngine(init);

		expect(init).toHaveBeenCalledTimes(1);
		expect(init).toHaveBeenCalledWith(tsParticles);
		expect(tsParticles.init).toHaveBeenCalledTimes(1);
		expect(module.isParticlesEngineInitialized()).toBe(true);
	});

	it('does not re-run the init when already initialized', async () => {
		const module = await loadUtils(),
			init = vi.fn(async () => Promise.resolve());

		await module.initParticlesEngine(init);
		await module.initParticlesEngine(init);

		expect(init).toHaveBeenCalledTimes(1);
	});

	it('throws when the init callback changes across the app lifecycle', async () => {
		const module = await loadUtils(),
			first = module.initParticlesEngine(async () => Promise.resolve());

		await expect(module.initParticlesEngine(async () => Promise.resolve())).rejects.toThrow(
			/stable across the app lifecycle/i
		);

		await first;
	});

	it('resolves the wait helper even before initialization', async () => {
		const module = await loadUtils();

		await expect(module.waitForParticlesEngineInitialization()).resolves.toBeUndefined();
	});
});
