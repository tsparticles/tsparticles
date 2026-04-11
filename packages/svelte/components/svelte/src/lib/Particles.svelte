<svelte:options accessors={true} />

<script lang="ts">
	import { afterUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';
	import type { Container, ISourceOptions } from '@tsparticles/engine';
	import { tsParticles } from '@tsparticles/engine';
	import { initialized } from './utils.js';

	let cssClass = '';
	export { cssClass as class };
	let canStart = false;
	let mounted = false;

	let style = '';
	export { style };
	export let options: ISourceOptions = {};
	export let url = '';
	export let id = 'tsparticles';

	const dispatch = createEventDispatcher<{
			particlesLoaded: { container: Container };
		}>(),
		particlesLoadedEvent = 'particlesLoaded';

	let oldId = id;

	function destroyOldContainer() {
		if (oldId) {
			const oldContainer = tsParticles.dom().find((c) => c.id.toString() === oldId);

			if (oldContainer) {
				oldContainer.destroy();
			}
		}
	}

	const unsub = initialized.subscribe((value) => {
		canStart = value;

		loadParticles();
	});

	onDestroy(() => {
		unsub();

		destroyOldContainer();
	});

	onMount(() => {
		mounted = true;
		void loadParticles();
	});

	async function loadParticles(): Promise<void> {
		destroyOldContainer();

		if (!canStart || !mounted) {
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

<div {id} class={cssClass} {style} />
