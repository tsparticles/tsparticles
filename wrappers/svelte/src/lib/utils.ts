import type { Engine } from '@tsparticles/engine';
import { tsParticles } from '@tsparticles/engine';
import { writable } from 'svelte/store';

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

const initialized = writable<boolean>(false);

let isInitialized = false;
let initPromise: Promise<void> | undefined;
let initCallback: ParticlesPluginRegistrar | undefined;

async function initParticlesEngine(init?: ParticlesPluginRegistrar): Promise<void> {
	if (isInitialized) {
		initialized.set(true);

		return;
	}

	if (initPromise) {
		if (initCallback && init && initCallback !== init) {
			throw new Error('particlesInit callback must be stable across the app lifecycle.');
		}

		await initPromise;
		initialized.set(isInitialized);

		return;
	}

	initCallback = init;
	initPromise = (async () => {
		if (init) {
			await init(tsParticles);
		}

		isInitialized = true;
		initialized.set(true);
	})().catch((error: unknown) => {
		initPromise = undefined;
		initCallback = undefined;
		isInitialized = false;
		initialized.set(false);

		throw error;
	});

	await initPromise;
}

export { initialized, initParticlesEngine, isInitialized };
