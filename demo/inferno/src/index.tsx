import { Component, render, version } from "inferno";
import { Incrementer } from "./components/Incrementer";
import Particles, { initParticlesEngine } from "@tsparticles/inferno";
import "./main.css";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

void initParticlesEngine(async engine => {
	await loadFull(engine);
});

const container = document.getElementById("app");

class MyComponent extends Component<any, any> {
	constructor(props, context) {
		super(props, context);
	}

	public render() {
		return (
			<div>
				<Particles id="tsparticles" options={configs.basic} />
				<h1>{`Welcome to Inferno ${version} TSX`}</h1>
				<Incrementer name={"Crazy button"} />
			</div>
		);
	}
}

render(<MyComponent />, container);
