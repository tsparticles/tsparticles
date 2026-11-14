import { Component, type InfernoNode } from "inferno";
import { type Engine, getLogger } from "@tsparticles/engine";
import { type ParticlesPluginRegistrar, initParticlesEngine } from "./initParticlesEngine";

export interface IParticlesProviderProps {
	engine: Engine;
	init?: ParticlesPluginRegistrar;
	children?: InfernoNode;
}

export interface IParticlesProviderContext {
	engine?: Engine;
}

export class ParticlesProvider extends Component<IParticlesProviderProps, IParticlesProviderContext> {
	#generation = 0;
	componentDidMount(): void {
		void this.startInit();
	}
	componentDidUpdate(previous: IParticlesProviderProps): void {
		if (previous.engine !== this.props.engine || previous.init !== this.props.init) {
			void this.startInit();
		}
	}
	componentWillUnmount(): void {
		this.#generation++;
	}
	async startInit(): Promise<void> {
		const generation = ++this.#generation,
			{ engine, init } = this.props;
		this.setState({ engine: undefined });
		try {
			await initParticlesEngine(engine, init);
			if (generation === this.#generation) {
				this.setState({ engine });
			}
		} catch (error: unknown) {
			if (generation === this.#generation) {
				getLogger().error("ParticlesProvider: engine init failed", error);
			}
		}
	}
	render(): InfernoNode {
		return this.state?.engine === this.props.engine ? this.props.children : null;
	}
}

export default ParticlesProvider;
