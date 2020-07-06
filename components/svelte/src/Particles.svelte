<script>
	import particles from "tsparticles";

	export let options;

	onMount(() => particles.tsParticles.load("tsparticles", options));
</script>

<svelte:options tag="svelte-particles" immutable={true} />

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<div id="tsparticles" options={options}></div>
