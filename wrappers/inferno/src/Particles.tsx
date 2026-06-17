import { Component } from "inferno";
import type { IParticlesProps } from "./IParticlesProps";
import { type Container, tsParticles, getLogger } from "@tsparticles/engine";
import { waitForParticlesEngineInitialization } from "./initParticlesEngine";

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
		// Apply theme change without full reload
		if (prevProps.theme !== this.props.theme && this._container) {
			(this._container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(this.props.theme);
		}

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

			const { id, url, options, loaded, particlesLoaded, container, theme } = this.props;

			const newContainer = await tsParticles.load({ id: id ?? "tsparticles", url, options });

			if (this._cancelled) {
				newContainer?.destroy();

				return;
			}

			this._container = newContainer;

			if (container) {
				container.current = newContainer;
			}

			if (newContainer && theme) {
				(newContainer as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(theme);
			}

			if (newContainer) {
				await loaded?.(newContainer);
				await particlesLoaded?.(newContainer);
			}
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
