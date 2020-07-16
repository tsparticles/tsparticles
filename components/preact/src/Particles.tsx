import * as React from "react";
import { Component } from "react";
import isEqual from "lodash/isEqual";
import type { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
import { Container } from "tsparticles/dist/Core/Container";
import type { RecursivePartial } from "tsparticles/dist/Types/RecursivePartial";
import { tsParticles } from "tsparticles";
import { IPolygonMaskOptions } from "tsparticles/dist/Plugins/PolygonMask/PolygonMaskPlugin";
import { IAbsorberOptions } from "tsparticles/dist/Plugins/Absorbers/AbsorbersPlugin";
import { IEmitterOptions } from "tsparticles/dist/Plugins/Emitters/EmittersPlugin";

export interface ParticlesProps {
  id: string;
  width: string;
  height: string;
  options: RecursivePartial<IOptions & IPolygonMaskOptions & IAbsorberOptions & IEmitterOptions>;
  params?: RecursivePartial<IOptions & IPolygonMaskOptions & IAbsorberOptions & IEmitterOptions>;
  style: any;
  className?: string;
  canvasClassName?: string;
  container?: React.RefObject<Container>;
}

export interface ParticlesState {
  canvas?: HTMLCanvasElement;
  library?: Container;
}

export default class Particles extends Component<ParticlesProps, ParticlesState> {
  public static defaultProps: ParticlesProps = {
    width: "100%",
    height: "100%",
    options: {},
    style: {},
    id: "tsparticles",
  };

  constructor(props: ParticlesProps) {
    super(props);
    this.state = {
      canvas: undefined,
      library: undefined,
    };
    this.loadCanvas = this.loadCanvas.bind(this);
  }

  private buildParticlesLibrary(tagId: string, options?: RecursivePartial<IOptions>) {
    try {
      if (window === undefined) return null;
    } catch {
      return null;
    } // SSR

    tsParticles.init();

    const container = new Container(tagId, options);

    if (this.props.container) {
      (this.props.container as React.MutableRefObject<Container>).current = container;
    }

    return container;
  }

  private refresh(props: Readonly<ParticlesProps>): void {
    const { canvas } = this.state;

    if (!canvas) {
      return;
    }

    this.destroy();

    this.setState(
      {
        library: this.buildParticlesLibrary(props.id, props.params ?? props.options),
      },
      () => {
        this.loadCanvas(canvas);
      }
    );
  }

  destroy() {
    if (!this.state.library) {
      return;
    }

    this.state.library.destroy();

    this.setState({
      library: undefined,
    });
  }

  loadCanvas(canvas: HTMLCanvasElement) {
    if (!canvas) {
      return;
    }

    this.setState(
      {
        canvas,
      },
      () => {
        const { library } = this.state;

        if (!library?.canvas) {
          return;
        }

        library.canvas.loadCanvas(canvas);
        library.start();
      }
    );
  }

  shouldComponentUpdate(nextProps: Readonly<ParticlesProps>) {
    return !isEqual(nextProps, this.props);
  }

  componentDidUpdate() {
    this.refresh(this.props);
  }

  forceUpdate() {
    this.refresh(this.props);

    super.forceUpdate();
  }

  componentDidMount() {
    this.setState({
      library: this.buildParticlesLibrary(this.props.id, this.props.params ?? this.props.options),
    });
  }

  componentWillUnmount() {
    this.destroy();
  }

  render() {
    const { width, height, className, canvasClassName, id } = this.props;
    return (
      <div className={className} id={id}>
        <canvas
          ref={this.loadCanvas}
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
}
