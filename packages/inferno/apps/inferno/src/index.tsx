import { Component, render, version } from 'inferno';
import { Incrementer } from './components/Incrementer';
import Particles from "inferno-particles";
import './main.css';
import { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { basic } from 'tsparticles-demo-configs';

const container = document.getElementById('app');

class MyComponent extends Component<any, any> {
	constructor(props, context) {
		super(props, context);
	}

	particlesInit = async (engine: Engine) => {
		await loadFull(engine);
	}

	public render() {
		return (
			<div>
				<Particles id="tsparticles" options={basic} init={ this.particlesInit.bind(this) }/>
				<h1>{ `Welcome to Inferno ${ version } TSX` }</h1>
				<Incrementer name={ 'Crazy button' }/>
			</div>
		);
	}
}

render(<MyComponent/>, container);
