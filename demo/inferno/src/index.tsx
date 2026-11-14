import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import { render, version } from "inferno";
import { Incrementer } from "./components/Incrementer";
import { engine } from "../particlesEngine";
import "./main.css";

// Render the app inside the ParticlesProvider from the wrapper. The
// provider initializes the engine and only renders children once ready.
const container = document.getElementById("app");

function App() {
	return (
		<ParticlesProvider
			engine={engine}
			init={async engine => {
				// register the full feature set on the engine then return
				// (the provider will call initParticlesEngine internally)
				const { loadFull } = await import("tsparticles");

				await loadFull(engine);
			}}
		>
			<div>
				<Particles
					engine={engine}
					id="tsparticles"
					options={{
						particles: {
							paint: {
								color: {
									value: "#fff",
								},
								fill: {
									enable: true,
								},
							},
							links: {
								enable: true,
								color: "#fff",
							},
							move: {
								enable: true,
							},
							number: {
								value: 100,
							},
						},
					}}
				/>
				<h1>{`Welcome to Inferno ${version} TSX`}</h1>
				<Incrementer name={"Crazy button"} />
			</div>
		</ParticlesProvider>
	);
}

render(<App />, container);
