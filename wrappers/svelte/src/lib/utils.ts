import type { Engine } from '@tsparticles/engine';
import { tsParticles } from '@tsparticles/engine';

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

let isInitialized = false;
let initPromise: Promise<void> | undefined;
let initCallback: ParticlesPluginRegistrar | undefined;

export async function initParticlesEngine(init?: ParticlesPluginRegistrar): Promise<void> {
	if (isInitialized) {
		return;
	}

	if (initPromise) {
		if (initCallback !== init) {
			throw new Error('initParticlesEngine callback must be stable across the app lifecycle.');
		}

		await initPromise;

		return;
	}

	initCallback = init;
	initPromise = (async () => {
		if (init) {
			await init(tsParticles);
		}

		isInitialized = true;
	})().catch((error: unknown) => {
		initPromise = undefined;
		initCallback = undefined;
		isInitialized = false;

		throw error;
	});

	await initPromise;
}

export function isParticlesEngineInitialized(): boolean {
	return isInitialized;
}

export async function waitForParticlesEngineInitialization(): Promise<void> {
	await (initPromise ?? Promise.resolve());
}
