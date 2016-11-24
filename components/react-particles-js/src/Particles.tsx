/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';

import P from './ext/ParticlesLibrary';

export default class Particles extends Component<{}, { increment: number; }>{

	canvas: HTMLCanvasElement;
	p: P;
	interval: any;

	constructor( props: any ){
		super( props );
	}

	componentDidMount(){

		this.p = new P( this.canvas );
		this.p.start();
	}

	componentWillUnmount(){
		this.p.destroy();
	}

	render(){
		return (
			<div>
				<div id='particles-js'>
					<canvas ref={(c) => this.canvas = c} style={{
						width: "100%",
						height: "100%"
					}}>
					</canvas>
				</div>
			</div>
		);
	}

}