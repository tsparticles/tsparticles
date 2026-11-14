import { Container, getLogger } from "@tsparticles/engine";
import { isParticlesEngineInitialized, waitForParticlesEngineInitialization } from "./initParticlesEngine";
import { Component } from "preact/compat";
import { ComponentChild } from "preact";
import type { IParticlesProps } from "./IParticlesProps";
import type { IParticlesState } from "./IParticlesState";
import { MutableRefObject } from "react";
import React from "preact/compat";
import { deepCompare } from "./Utils";

/**
 * @param {IParticlesProps}
 */
export default class Particles extends Component<IParticlesProps, IParticlesState> {
  #container?: Container;
  #loadId = 0;
  #mounted = false;

  static defaultProps: Partial<IParticlesProps> = {
    width: "100%",
    height: "100%",
    options: {},
    style: {},
    id: "tsparticles",
  };

  constructor(props: IParticlesProps) {
    super(props);

    this.state = {
      init: isParticlesEngineInitialized(this.props.engine),
      library: undefined,
    };
  }

  destroy(): void {
    this.#loadId++;

    const container = this.#container;

    if (!container) {
      return;
    }

    this.#container = undefined;
    container.destroy();

    if (this.#mounted) {
      this.setState({ library: undefined });
    }
  }

  shouldComponentUpdate(nextProps: Readonly<IParticlesProps>, nextState: Readonly<IParticlesState>): boolean {
    return (
      nextState.init !== this.state.init ||
      nextProps.url !== this.props.url ||
      nextProps.engine !== this.props.engine ||
      nextProps.id !== this.props.id ||
      nextProps.canvasClassName !== this.props.canvasClassName ||
      nextProps.className !== this.props.className ||
      nextProps.height !== this.props.height ||
      nextProps.width !== this.props.width ||
      !deepCompare(nextProps.style, this.props.style) ||
      nextProps.particlesLoaded !== this.props.particlesLoaded ||
      nextProps.theme !== this.props.theme ||
      !deepCompare(nextProps.options ?? nextProps.params, this.props.options ?? this.props.params, key =>
        key.startsWith("_"),
      )
    );
  }

  componentDidUpdate(prevProps: Readonly<IParticlesProps>): void {
    if (prevProps.theme !== this.props.theme && this.#container) {
      void this.loadTheme(this.#container);
    }

    if (
      prevProps.url !== this.props.url ||
      prevProps.engine !== this.props.engine ||
      prevProps.id !== this.props.id ||
      prevProps.canvasClassName !== this.props.canvasClassName ||
      prevProps.className !== this.props.className ||
      prevProps.height !== this.props.height ||
      prevProps.width !== this.props.width ||
      !deepCompare(prevProps.style, this.props.style) ||
      prevProps.particlesLoaded !== this.props.particlesLoaded ||
      !deepCompare(prevProps.options ?? prevProps.params, this.props.options ?? this.props.params, key =>
        key.startsWith("_"),
      )
    ) {
      void this.refresh();
    }
  }

  forceUpdate(): void {
    this.refresh().then(() => {
      if (this.#mounted) {
        super.forceUpdate();
      }
    });
  }

  componentDidMount(): void {
    this.#mounted = true;

    void (async () => {
      if (!this.state.init) {
        await waitForParticlesEngineInitialization(this.props.engine);

        if (!isParticlesEngineInitialized(this.props.engine)) {
          throw new Error("initParticlesEngine(...) must be called once before rendering <Particles /> components.");
        }
      }

      if (!this.#mounted) {
        return;
      }

      this.setState(
        {
          init: true,
        },
        () => {
          void this.loadParticles();
        },
      );
    })().catch((error: unknown) => {
      if (this.#mounted) {
        getLogger().error("Particles: error initializing engine", error);
      }
    });
  }

  componentWillUnmount(): void {
    this.#mounted = false;
    this.destroy();
  }

  render(): ComponentChild {
    const { width, height, className, canvasClassName, id } = this.props;

    return (
      <div className={className} id={id}>
        <canvas
          key={id}
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
    if (!this.state.init || !this.#mounted) {
      return;
    }

    const loadId = ++this.#loadId;
    let container: Container | undefined;

    try {
      container = await this.props.engine.load({
        url: this.props.url,
        options: this.props.options,
        id: this.props.id,
      });
    } catch (error: unknown) {
      if (loadId === this.#loadId) {
        getLogger().error("Particles: error loading particles", error);
      }

      return;
    }

    if (loadId !== this.#loadId) {
      container?.destroy();

      return;
    }

    this.#container = container;

    if (this.props.container) {
      (this.props.container as MutableRefObject<Container | undefined>).current = container;
    }

    this.setState({ library: container });

    if (container && this.props.theme) {
      await this.loadTheme(container);
    }

    if (loadId === this.#loadId) {
      try {
        await this.props.particlesLoaded?.(container);
      } catch (error: unknown) {
        getLogger().error("Particles: error in particlesLoaded callback", error);
      }
    }
  }

  private async loadTheme(container: Container): Promise<void> {
    try {
      await (container as Container & { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(this.props.theme);
    } catch (error: unknown) {
      if (this.#container === container) {
        getLogger().error("Particles: error loading theme", error);
      }
    }
  }
}
