import { Component, InfernoNode } from "inferno";
import equal from "fast-deep-equal/react";
import { tsParticles, Container } from "tsparticles-engine";
import type { IParticlesProps } from "./IParticlesProps";
import type { IParticlesState } from "./IParticlesState";

interface MutableRefObject<T> {
	current: T | null;
}

/**
 * @param {IParticlesProps}
 */
export default class Particles extends Component<
	IParticlesProps,
	IParticlesState
> {
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
			init: false,
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
		(async () => {
			if (this.props.init) {
				await this.props.init(tsParticles);
			}

			this.setState(
				{
					init: true,
				},
				() => {
					this.loadParticles();
				}
			);
		})();
	}

	componentWillUnmount(): void {
		this.destroy();
	}

	render(): InfernoNode {
		const { width, height, className, canvasClassName, id } = this.props;

		return (
			<div className={className} id={id}>
				<canvas
					className={canvasClassName}
					style={{
						...this.props.style,
						width,
						height,
					}}
				/>
			</div>
		);
	}

	private refresh(): void {
		this.destroy();

		this.loadParticles();
	}

	private loadParticles(): void {
		if (!this.state.init) {
			return;
		}

		const cb = async (container?: Container) => {
			if (this.props.container) {
				(this.props.container as MutableRefObject<Container>).current =
					container;
			}

			this.setState({
				library: container,
			});

			if (this.props.loaded) {
				await this.props.loaded(container);
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
