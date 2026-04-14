import { Component } from "inferno";
import equal from "fast-deep-equal/react";
import { tsParticles, Container } from "@tsparticles/engine";
import type { IParticlesProps } from "./IParticlesProps";
import type { IParticlesState } from "./IParticlesState";
import { isParticlesEngineInitialized, waitForParticlesEngineInitialization } from "./initParticlesEngine";

interface MutableRefObject<T> {
	current: T | null;
}

/**
 * @param {IParticlesProps}
 */
export default class Particles extends Component<IParticlesProps, IParticlesState> {
	static defaultProps = {
		width: "100%",
		height: "100%",
		options: {},
		style: {},
		id: "tsparticles",
	};

	constructor(props: IParticlesProps) {
		super(props);

		this.state = {
			init: isParticlesEngineInitialized(),
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
		this.refresh().then(() => {
			super.forceUpdate();
		});
	}

	componentDidMount(): void {
		(async () => {
			if (!this.state.init) {
				await waitForParticlesEngineInitialization();

				if (!isParticlesEngineInitialized()) {
					throw new Error("initParticlesEngine(...) must be called once before rendering <Particles /> components.");
				}
			}

			this.setState(
				{
					init: true,
				},
				async () => {
					await this.loadParticles();
				},
			);
		})();
	}

	componentWillUnmount(): void {
		this.destroy();
	}

	render() {
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

	private async refresh(): Promise<void> {
		this.destroy();

		await this.loadParticles();
	}

	private async loadParticles(): Promise<void> {
		if (!this.state.init) {
			return;
		}

		const cb = async (container?: Container) => {
			if (this.props.container) {
				(this.props.container as MutableRefObject<Container>).current = container;
			}

			this.setState({
				library: container,
			});

			if (this.props.loaded) {
				await this.props.loaded(container);
			}
		};

		const container = await tsParticles.load({
			id: this.props.id,
			options: this.props.params ?? this.props.options,
			url: this.props.url,
		});

		await cb(container);
	}
}
