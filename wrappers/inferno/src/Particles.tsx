import { type Container, getLogger } from "@tsparticles/engine";
import { Component } from "inferno";
import type { IParticlesProps } from "./IParticlesProps";
import { waitForParticlesEngineInitialization } from "./initParticlesEngine";

// Class-based Particles component to avoid relying on Inferno hooks at
// runtime. This ensures compatibility with Inferno builds that do not
// expose hooks as named exports or when consumers prefer class-style
// components.
export default class Particles extends Component<IParticlesProps> {
	_container?: Container;
	_cancelled = false;
	_loadId = 0;
	_themeLoadId = 0;
	_themeLoads = new WeakMap<Container, Promise<void>>();
	_themePlaybackStates = new WeakMap<Container, { activeRequests: number; wasPlaying: boolean }>();

	componentDidMount() {
		this._cancelled = false;

		void this.loadContainer();
	}

	componentDidUpdate(prevProps: IParticlesProps) {
		// Apply theme change without full reload
		const container = this._container,
			theme = this.props.theme;

		if (prevProps.theme !== theme && container && theme) {
			const themeLoad = this.loadTheme(container, theme, () => !this._cancelled && this._container === container),
				themeLoadId = this._themeLoadId,
				isCurrentRequest = () => themeLoadId === this._themeLoadId && !this._cancelled && this._container === container;

			void themeLoad.catch(error => {
				getLogger().error("Particles: error during theme recovery", error);

				if (isCurrentRequest() && !container.destroyed) {
					void this.reloadContainer();
				}
			});
		}

		// Reload the container if relevant props changed
		if (
			prevProps.engine !== this.props.engine ||
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
		const loadId = ++this._loadId;

		try {
			await waitForParticlesEngineInitialization(this.props.engine);

			if (this._cancelled || loadId !== this._loadId) {
				return;
			}

			const { id, url, options, loaded, particlesLoaded, container } = this.props;

			const newContainer = await this.props.engine.load({ id: id ?? "tsparticles", url, options });

			if (this._cancelled || loadId !== this._loadId) {
				newContainer?.destroy();

				return;
			}

			const theme = this.props.theme;

			this._container = newContainer;

			if (newContainer && theme) {
				await this.loadTheme(newContainer, theme, () => !this._cancelled && loadId === this._loadId);
			}

			if (newContainer) {
				let pending = this._themeLoads.get(newContainer);

				while (pending) {
					await pending;
					const latest = this._themeLoads.get(newContainer);

					if (latest === pending) {
						break;
					}
					pending = latest;
				}
			}

			if (this._cancelled || loadId !== this._loadId) {
				newContainer?.destroy();

				return;
			}

			if (container) {
				container.current = newContainer;
			}

			if (newContainer) {
				await loaded?.(newContainer);
				await particlesLoaded?.(newContainer);
			}
		} catch (e) {
			getLogger().error("Particles: error during load", e);
		}
	}

	loadTheme(container: Container, theme: string, isCurrent: () => boolean = () => true): Promise<void> {
		const pending = this.refreshTheme(container, theme, isCurrent);

		this._themeLoads.set(container, pending);

		return pending;
	}

	async refreshTheme(container: Container, theme: string, isCurrent: () => boolean): Promise<void> {
		const themeLoadId = ++this._themeLoadId,
			isCurrentRequest = () => themeLoadId === this._themeLoadId && isCurrent();
		let playbackState = this._themePlaybackStates.get(container);

		if (!playbackState) {
			playbackState = { activeRequests: 0, wasPlaying: container.animationStatus };
			this._themePlaybackStates.set(container, playbackState);
		}

		playbackState.activeRequests++;

		try {
			await (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(theme);
		} catch (e) {
			getLogger().error("Particles: error during theme load", e);

			if (playbackState.wasPlaying && isCurrentRequest() && !container.destroyed) {
				await container.refresh();
			}
		} finally {
			playbackState.activeRequests--;

			if (playbackState.activeRequests === 0) {
				this._themePlaybackStates.delete(container);
			}
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
