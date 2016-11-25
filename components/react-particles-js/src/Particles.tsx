/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';

import {IParams, ParticlesLibrary} from './lib';

export interface ParticlesProps{
	width: string;
	height: string;
	params: any;
}

export default class Particles extends Component<ParticlesProps, {}>{

	public static defaultProps: ParticlesProps = {
		width: "100%",
		height: "100%",
		params: {}
	};

	canvas: HTMLCanvasElement;
	particlesLibrary: ParticlesLibrary;

	constructor( props: ParticlesProps ){
		super( props );
	}

	componentDidMount(){

		this.particlesLibrary = new ParticlesLibrary( this.canvas, this.props.params );
		this.particlesLibrary.start();
	}

	componentWillUnmount(){
		this.particlesLibrary.destroy();
	}

	render(){
		let {width, height} = this.props;
		return (
			<div>
				<canvas ref={(c) => this.canvas = c} style={{
					width,
					height
				}}>
				</canvas>
			</div>
		);
	}

}