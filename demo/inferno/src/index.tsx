import { Component, render, version } from 'inferno';
import { Incrementer } from './components/Incrementer';
import Particles from "inferno-particles";
import './main.css';
import { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { basic } from 'tsparticles-demo-configs';

const container = document.getElementById('app');

class MyComponent extends Component<any, any> {
	private readonly tsxVersion: number;

	constructor(props, context) {
		super(props, context);

		this.tsxVersion = 3.21; /* This is typed value */
	}

	particlesInit = async (engine: Engine) => {
		await loadFull(engine);
	}

	public render() {
		return (
			<div>
				<Particles id="tsparticles" options={basic} init={ this.particlesInit.bind(this) }/>
				<h1>{ `Welcome to Inferno ${ version } TSX ${ this.tsxVersion }` }</h1>
				<Incrementer name={ 'Crazy button' }/>
			</div>
		);
	}
}

render(<MyComponent/>, container);
