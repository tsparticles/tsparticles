import { Component, render, version } from 'inferno';
import { Incrementer } from './components/Incrementer';
import Particles from "inferno-particles";
import './main.css';
import { Main } from "tsparticles-engine";
import { loadFull } from "tsparticles";

const container = document.getElementById('app');

class MyComponent extends Component<any, any> {
	private readonly tsxVersion: number;

	constructor(props, context) {
		super(props, context);

		this.tsxVersion = 3.21; /* This is typed value */
	}

	particlesInit = (main: Main) => {
		loadFull(main);
	}

	public render() {
		return (
			<div>
				<Particles id="tsparticles" options={ {
					background: {
						color: "#000000",
					},
					particles: {
						number: { value: 100 },
						move: { enable: true },
						links: {
							enable: true,
						},
						color: {
							value: "#ff0000",
							animation: {
								enable: true,
								speed: 20
							}
						}
					}
				} } init={ this.particlesInit.bind(this) }/>
				<h1>{ `Welcome to Inferno ${ version } TSX ${ this.tsxVersion }` }</h1>
				<Incrementer name={ 'Crazy button' }/>
			</div>
		);
	}
}

render(<MyComponent/>, container);
