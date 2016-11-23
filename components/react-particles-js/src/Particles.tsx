/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';

import P from './ext/ParticlesLibrary';



export default class Particles extends Component<{}, {}>{

	canvas: HTMLCanvasElement;

	componentDidMount(){

		let p: P = new P( this.canvas, {
			particles: {
				number: {
					value: 20
				}
			}
		} );

	}

	render(){
		return (
			<div id='particles-js'>
				<canvas ref={(c) => this.canvas = c} style={{
					width: "100%",
					height: "100%"
				}}></canvas>
			</div>
		);
	}

}