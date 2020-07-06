import Particles from "svelte-particles";
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export { Particles }
export default app;
