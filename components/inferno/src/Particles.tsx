import { Component, InfernoNode } from "inferno";
import { isEqual } from "lodash";
import { tsParticles, Container } from "tsparticles";
import type { IParticlesProps } from "./IParticlesProps";
import type { IParticlesState } from "./IParticlesState";

interface MutableRefObject<T> {
	current: T | null;
}

/**
 * @param {{id?: string,width?: string,height?: string,options?: ISourceOptions,params?: ISourceOptions,url?: string,style?: CSSProperties,className?: string,canvasClassName?: string,container?: RefObject<Container>}}
 */
export default class Particles extends Component<IParticlesProps, IParticlesState> {
	public static defaultProps: IParticlesProps = {
		width: "100%",
		height: "100%",
		options: {},
		style: {},
		id: "tsparticles",
	};

	constructor(props: IParticlesProps) {
		super(props);

		this.state = {
			canvas: undefined,
			library: undefined,
		};
	}

	public destroy(): void {
		if (!this.state.library) {
			return;
		}

		this.state.library.destroy();

		this.setState({
			library: undefined,
		});
	}

	public shouldComponentUpdate(nextProps: Readonly<IParticlesProps>): boolean {
		return !isEqual(nextProps, this.props);
	}

	public componentDidUpdate(): void {
		this.refresh();
	}

	public forceUpdate(): void {
		this.refresh();

		super.forceUpdate();
	}

	public componentDidMount(): void {
		if (this.props.init) {
			this.props.init(tsParticles);
		}

		this.loadParticles();
	}

	public componentWillUnmount(): void {
		this.destroy();
	}

	public render(): InfernoNode {
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
		const { canvas } = this.state;

		if (!canvas) {
			return;
		}

		this.destroy();

		this.loadParticles();
	}

	private loadParticles(): void {
		const cb = (container?: Container) => {
			if (this.props.container) {
				(this.props.container as MutableRefObject<Container>).current = container;
			}

			this.setState({
				library: container
			});
		};

		if (this.props.url) {
			tsParticles.loadJSON(this.props.id, this.props.url).then(cb);
		} else {
			tsParticles.load(this.props.id, this.props.params ?? this.props.options).then(cb);
		}
	}
}
