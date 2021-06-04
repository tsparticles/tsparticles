import { Component, InfernoNode } from "inferno";
import equal from "fast-deep-equal/react";
import { tsParticles, Container } from "tsparticles";
import type { IParticlesProps } from "./IParticlesProps";
import type { IParticlesState } from "./IParticlesState";
import type { ISourceOptions } from "tsparticles";

interface MutableRefObject<T> {
	current: T | null;
}

/**
 * @param {{id?: string,width?: string,height?: string,options?: ISourceOptions,params?: ISourceOptions,url?: string,style?: CSSProperties,className?: string,canvasClassName?: string,container?: RefObject<Container>}}
 */
export default class Particles extends Component<IParticlesProps,
	IParticlesState> {
	static defaultProps: IParticlesProps = {
		width: "100%",
		height: "100%",
		options: {},
		style: {},
		id: "tsparticles",
	};

	constructor(props: IParticlesProps) {
		super(props);

		this.state = {
			library: undefined,
		};
	}

	destroy(): void {
		if (!this.state.library) {
			return;
		}

		this.state.library.destroy();

		this.setState({
			library: undefined,
		});
	}

	shouldComponentUpdate(nextProps: Readonly<IParticlesProps>): boolean {
		return !equal(nextProps, this.props);
	}

	componentDidUpdate(): void {
		this.refresh();
	}

	forceUpdate(): void {
		this.refresh();

		super.forceUpdate();
	}

	componentDidMount(): void {
		if (this.props.init) {
			this.props.init(tsParticles);
		}

		this.loadParticles();
	}

	componentWillUnmount(): void {
		this.destroy();
	}

	render(): InfernoNode {
		const { width, height, className, canvasClassName, id } = this.props;

		return (
			<div className={ className } id={ id }>
				<canvas
					className={ canvasClassName }
					style={ {
						...this.props.style,
						width,
						height,
					} }
				/>
			</div>
		);
	}

	private refresh(): void {
		this.destroy();

		this.loadParticles();
	}

	private loadParticles(): void {
		const cb = (container?: Container) => {
			if (this.props.container) {
				(this.props.container as MutableRefObject<Container>).current =
					container;
			}

			this.setState({
				library: container,
			});

			if (this.props.loaded) {
				this.props.loaded(container);
			}
		};

		if (this.props.url) {
			tsParticles.loadJSON(this.props.id, this.props.url).then(cb);
		} else {
			tsParticles
			.load(this.props.id, this.props.params ?? this.props.options)
			.then(cb);
		}
	}
}
