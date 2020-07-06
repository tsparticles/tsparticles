<script>
	import Particles from "svelte-particles";
	export let name;
</script>

<main>
	<svelte-particles options={{
		particles: {
			color: {
				value: '#000'
			},
			links: {
				enable: true,
				color: '#000'
			}
		}
	}}></svelte-particles>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	#tsparticles {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
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
