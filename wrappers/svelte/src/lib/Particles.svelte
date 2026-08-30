<svelte:options accessors={true} />

<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import type { Container, ISourceOptions } from '@tsparticles/engine';
	import { tsParticles } from '@tsparticles/engine';
	import * as particlesEngineInitialization from './utils.js';

	let cssClass = '';
	export { cssClass as class };
	let mounted = false;

	let style = '';
	export { style };
	export let options: ISourceOptions = {};
	export let url = '';
	export let id = 'tsparticles';
	export let theme: string | undefined = undefined;

	const dispatch = createEventDispatcher<{
			particlesLoaded: { particles?: Container };
		}>(),
		particlesLoadedEvent = 'particlesLoaded';

	let currentContainer: Container | undefined;
	let loadGeneration = 0;

	$: if (mounted && (id || url || options)) {
		void loadParticles();
	}

	$: if (mounted && theme && currentContainer) {
		(currentContainer as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(
			theme
		);
	}

	function destroyOldContainer() {
		currentContainer?.destroy();
		currentContainer = undefined;
	}

	onDestroy(() => {
		loadGeneration++;
		destroyOldContainer();
	});

	onMount(() => {
		mounted = true;
	});

	async function loadParticles(): Promise<void> {
		const generation = ++loadGeneration;

		destroyOldContainer();

		if (!mounted) {
			return;
		}

		await particlesEngineInitialization.waitForParticlesEngineInitialization();

		if (!particlesEngineInitialization.isParticlesEngineInitialized()) {
			throw new Error(
				'initParticlesEngine(...) must be called once before rendering <Particles /> components.'
			);
		}

		if (!mounted || generation !== loadGeneration) {
			return;
		}

		if (id) {
			const cb = (container?: Container) => {
				if (generation !== loadGeneration) {
					container?.destroy();
					return;
				}

				dispatch(particlesLoadedEvent, {
					particles: container
				});
			};

			const container = await tsParticles.load({
				id,
				options,
				url
			});

			if (generation !== loadGeneration) {
				container?.destroy();
				return;
			}

			currentContainer = container;

			if (container && theme) {
				(container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(
					theme
				);
			}

			cb(container);
		} else {
			dispatch(particlesLoadedEvent, {
				particles: undefined
			});
		}
	}
</script>

<div {id} class={cssClass} {style}></div>
