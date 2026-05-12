import { Component } from "inferno";
import type { IParticlesProps } from "./IParticlesProps";
import { createBrowserEngine, getLogger, type Container } from "@tsparticles/engine";
import { waitForParticlesEngineInitialization } from "./initParticlesEngine";

const engine = createBrowserEngine();

// Class-based Particles component to avoid relying on Inferno hooks at
// runtime. This ensures compatibility with Inferno builds that do not
// expose hooks as named exports or when consumers prefer class-style
// components.
export default class Particles extends Component<IParticlesProps> {
	_container?: Container;
	_cancelled = false;

	componentDidMount() {
		this._cancelled = false;

		void this.loadContainer();
	}

	componentDidUpdate(prevProps: IParticlesProps) {
		// Reload the container if relevant props changed
		if (
			prevProps.id !== this.props.id ||
			prevProps.url !== this.props.url ||
			prevProps.options !== this.props.options
		) {
			void this.reloadContainer();
		}
	}

	componentWillUnmount() {
		this._cancelled = true;

		try {
			this._container?.destroy();
		} catch {
			// ignore cleanup errors
		}
	}

	async loadContainer() {
		try {
			await waitForParticlesEngineInitialization();

			if (this._cancelled) {
				return;
			}

			const { id, url, options } = this.props;

			this._container = await engine.load({ id: id ?? "tsparticles", url, options });
		} catch (e) {
			getLogger().error("Particles: error during load", e);
		}
	}

	async reloadContainer() {
		try {
			this._container?.destroy();
		} catch {
			// ignore
		}

		this._container = undefined;

		await this.loadContainer();
	}

	render() {
		const { className, id, style } = this.props;

		return <div id={id ?? "tsparticles"} className={className} style={style} />;
	}
}
