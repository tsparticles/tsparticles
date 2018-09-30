import * as React from "react";
import { Component } from "react";

import { IParams, ParticlesLibrary, deepAssign, RecursivePartial } from "./lib";

export interface ParticlesProps {
	width: string;
	height: string;
	params: RecursivePartial<IParams>;
	style: any;
	className?: string;
	canvasClassName?: string;
}

export interface ParticlesState {
	canvas?: HTMLCanvasElement;
	library?: ParticlesLibrary;
}

export default class Particles extends Component<
	ParticlesProps,
	ParticlesState
> {
	public static defaultProps: ParticlesProps = {
		width: "100%",
		height: "100%",
		params: {},
		style: {}
	};

	constructor(props: ParticlesProps) {
		super(props);
		this.state = {
			canvas: undefined,
			library: undefined
		};
		this.loadCanvas = this.loadCanvas.bind(this);
	}

	private buildParticlesLibrary(params: RecursivePartial<IParams>) {
		try{if (window === undefined) return null; } catch{ return null; } // SSR
		return new ParticlesLibrary(params);
	}

	private refresh(props: Readonly<ParticlesProps>): void {
		if (this.state.canvas) {
			this.destroy();
			this.setState(
				{
					library: this.buildParticlesLibrary(props.params)
				},
				() => {
					this.loadCanvas(this.state.canvas);
				}
			);
		}
	}

	destroy() {
		this.state.library.destroy();
	}

	loadCanvas(canvas: HTMLCanvasElement) {
		if (canvas) {
			this.setState(
				{
					canvas
				},
				() => {
					this.state.library.loadCanvas(this.state.canvas);
					this.state.library.start();
				}
			);
		}
	}

	shouldComponentUpdate(nextProps: Readonly<ParticlesProps>) {
		return nextProps !== this.props;
	}

	componentWillUpdate(nextProps: Readonly<ParticlesProps>) {
		this.refresh(nextProps);
	}

	forceUpdate() {
		this.refresh(this.props);
		super.forceUpdate();
	}

	componentWillMount() {
		this.setState({
			library: this.buildParticlesLibrary(this.props.params)
		});
	}

	componentWillUnmount() {
		this.destroy();
		this.setState({
			library: undefined
		});
	}

	render() {
		let { width, height, className, canvasClassName } = this.props;
		return (
			<div className={className}>
				<canvas
					ref={this.loadCanvas}
					className={canvasClassName}
					style={{
						...this.props.style,
						width,
						height
					}}
				/>
			</div>
		);
	}
}
