import * as React from "react";
import { Component } from "react";
import isEqual from "lodash/isEqual";
import type { IOptions } from "tsparticles/dist/Interfaces/Options/IOptions";
import { Container } from "tsparticles/dist/Classes/Container";
import type { RecursivePartial } from "tsparticles/dist/Types/RecursivePartial";
import { defaultParams } from "./DefaultOptions";
import { Options } from "tsparticles/dist/Classes/Options/Options";
import { tsParticles } from "tsparticles";

export interface ParticlesProps {
    id: string;
    width: string;
    height: string;
    params: RecursivePartial<IOptions>;
    style: any;
    className?: string;
    canvasClassName?: string;
    particlesRef?: React.RefObject<Container>
}

export interface ParticlesState {
    canvas?: HTMLCanvasElement;
    library?: Container;
}

export default class Particles extends Component<ParticlesProps,
    ParticlesState> {
    public static defaultProps: ParticlesProps = {
        width: "100%",
        height: "100%",
        params: defaultParams,
        style: {},
        id: "tsparticles"
    };

    constructor(props: ParticlesProps) {
        super(props);
        this.state = {
            canvas: undefined,
            library: undefined
        };
        this.loadCanvas = this.loadCanvas.bind(this);
    }

    private buildParticlesLibrary(tagId: string, params?: RecursivePartial<IOptions>) {
        try {
            if (window === undefined) return null;
        } catch {
            return null;
        } // SSR
        const options = new Options();

        options.load(defaultParams);
        options.load(params);

        tsParticles.init();

        const container = new Container(tagId, options);

        if (this.props.particlesRef) {
            (this.props.particlesRef as React.MutableRefObject<Container>).current = container;
        }

        return container;
    }

    private refresh(props: Readonly<ParticlesProps>): void {
        const { canvas } = this.state;
        if (canvas) {
            this.destroy();
            this.setState({
                    library: this.buildParticlesLibrary(props.id, props.params)
                },
                () => {
                    this.loadCanvas(canvas);
                }
            );
        }
    }

    destroy() {
        if (this.state.library) {
            this.state.library.destroy();
        }
    }

    loadCanvas(canvas: HTMLCanvasElement) {
        if (canvas) {
            this.setState({
                    canvas
                },
                () => {
                    const { library } = this.state;

                    if (!library) {
                        return;
                    }

                    library.canvas.loadCanvas(canvas);
                    library.start();
                }
            );
        }
    }

    shouldComponentUpdate(nextProps: Readonly<ParticlesProps>) {
        return !this.state.library || !isEqual(nextProps, this.props);
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
            library: this.buildParticlesLibrary(this.props.id, this.props.params)
        });
    }

    componentWillUnmount() {
        this.destroy();
        this.setState({
            library: undefined
        });
    }

    render() {
        let { width, height, className, canvasClassName, id } = this.props;
        return (
            <div className={className} id={id}>
                <canvas
                    ref={this.loadCanvas}
                    className={canvasClassName}
                    style={{
                        ...this.props.style,
                        width,
                        height
                    }}
                />
            </div>
        );
    }
}
