/* eslint-disable */
import { describe, expect, it, vi } from 'vitest';
import {
	initParticlesEngine,
	isParticlesEngineInitialized,
	waitForParticlesEngineInitialization
} from '../src/lib/utils.js';
import type { Engine } from '@tsparticles/engine';

function makeEngine(): Engine {
	return { init: vi.fn(async () => undefined) } as unknown as Engine;
}

describe('explicit wrapper initialization', () => {
	it('initializes the supplied engine once and shares concurrent work', async () => {
		const engine = makeEngine(),
			init = vi.fn(async () => undefined);
		await Promise.all([initParticlesEngine(engine, init), initParticlesEngine(engine, init)]);
		await initParticlesEngine(engine, init);
		expect(init).toHaveBeenCalledExactlyOnceWith(engine);
		expect(engine.init).toHaveBeenCalledOnce();
		expect(isParticlesEngineInitialized(engine)).toBe(true);
	});

	it('keeps independent engines and pending initialization separate', async () => {
		const a = makeEngine(),
			b = makeEngine(),
			gate = Promise.withResolvers<void>();
		const first = initParticlesEngine(a, () => gate.promise);
		await initParticlesEngine(b);
		expect(isParticlesEngineInitialized(a)).toBe(false);
		expect(isParticlesEngineInitialized(b)).toBe(true);
		gate.resolve();
		await first;
		await waitForParticlesEngineInitialization(a);
		expect(a.init).toHaveBeenCalledOnce();
	});

	it('retries failed initialization without affecting another engine', async () => {
		const a = makeEngine(),
			b = makeEngine(),
			failure = new Error('registration failed');
		await initParticlesEngine(b);
		await expect(
			initParticlesEngine(a, async () => {
				throw failure;
			})
		).rejects.toBe(failure);
		expect(isParticlesEngineInitialized(a)).toBe(false);
		await initParticlesEngine(a);
		expect(isParticlesEngineInitialized(a)).toBe(true);
		expect(b.init).toHaveBeenCalledOnce();
	});

	it('waits for an explicitly supplied engine with no registrar', async () => {
		const engine = makeEngine();
		const waiting = waitForParticlesEngineInitialization(engine);
		await Promise.resolve();
		expect(engine.init).not.toHaveBeenCalled();
		await initParticlesEngine(engine);
		await waiting;
		expect(engine.init).toHaveBeenCalledOnce();
	});
});
