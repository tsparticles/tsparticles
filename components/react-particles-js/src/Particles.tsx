import * as React from 'react';
import {PureComponent} from 'react';
import deepClone = require('lodash.clonedeep');

import {IParams, ParticlesLibrary, deepExtend} from './lib';

export interface ParticlesProps{
	width: string;
	height: string;
	params: any;
	style: any;
	className?: string;
	canvasClassName?: string;
}

export interface ParticlesState{
	canvas?: HTMLCanvasElement;
	library?: ParticlesLibrary;
}

export default class Particles extends PureComponent<ParticlesProps, ParticlesState>{

	public static defaultProps: ParticlesProps = {
		width: "100%",
		height: "100%",
		params: {},
		style: {}
	};

	constructor( props: ParticlesProps ){
		super( props );
		this.state = {
			canvas: undefined,
			library: undefined
		}
		this.loadCanvas = this.loadCanvas.bind( this );
	}

	destroy(){
		this.state.library.destroy();
	}

	loadCanvas( canvas: HTMLCanvasElement ){
		if( canvas ){
			this.setState({
				canvas
			}, () => {
				this.state.library.loadCanvas( this.state.canvas );
				this.state.library.start();
			});
		}
	}

	componentWillMount(){
		this.setState({
			library: new ParticlesLibrary( this.props.params )
		});
	}
	
	componentWillUnmount(){
		this.state.library.destroy();
		this.setState({
			library: undefined
		})
	}

	render(){
		let {width, height, className, canvasClassName} = this.props;
		return (
			<div className={className}>
				<canvas ref={this.loadCanvas} className={canvasClassName} style={
					deepExtend(deepClone(this.props.style), {
						width,
						height
					})
				}>
				</canvas>
			</div>
		);
	}

}