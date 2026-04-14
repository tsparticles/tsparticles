<svelte:options accessors={true} />

<script lang="ts">
	import { afterUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';
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

	const dispatch = createEventDispatcher<{
			particlesLoaded: { particles?: Container };
		}>(),
		particlesLoadedEvent = 'particlesLoaded';

	let oldId = id;
	let currentContainer: Container | undefined;

	function destroyOldContainer() {
		currentContainer?.destroy();
		currentContainer = undefined;
	}

	onDestroy(() => {
		destroyOldContainer();
	});

	onMount(() => {
		mounted = true;
		void loadParticles();
	});

	async function loadParticles(): Promise<void> {
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

		if (!mounted) {
			return;
		}

		if (id) {
			const cb = (container?: Container) => {
				dispatch(particlesLoadedEvent, {
					particles: container
				});

				oldId = id;
			};

			const container = await tsParticles.load({
				id,
				options,
				url
			});

			currentContainer = container;

			cb(container);
		} else {
			dispatch(particlesLoadedEvent, {
				particles: undefined
			});
		}
	}

	afterUpdate(async () => {
		await loadParticles();
	});
</script>

<div {id} class={cssClass} {style}></div>
