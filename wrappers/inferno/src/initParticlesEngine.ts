import { type Engine, createBrowserEngine } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

let initialized = false;
let initPromise: Promise<void> | undefined;
const engine = createBrowserEngine();

export async function initParticlesEngine(init?: ParticlesPluginRegistrar): Promise<void> {
	if (initialized) {
		return;
	}

	if (initPromise) {
		// A previous initialization is already in progress. Don't throw if the
		// init callback identity changed (HMR or remounts) — just await the
		// existing initialization so callers see a consistent initialized state.
		await initPromise;

		return;
	}

	initPromise = (async () => {
		if (init) {
			await init(engine);
		}

		await engine.init();

		initialized = true;
	})().catch((error: unknown) => {
		initPromise = undefined;
		initialized = false;

		throw error;
	});

	await initPromise;
}

export function isParticlesEngineInitialized(): boolean {
	return initialized;
}

export async function waitForParticlesEngineInitialization(): Promise<void> {
	await (initPromise ?? Promise.resolve());
}
