import React, { Component } from "preact/compat";
import type { ComponentChild } from "preact";
import isEqual from "lodash/isEqual";
import type { IOptions, RecursivePartial } from "tsparticles";
import { tsParticles, Container } from "tsparticles";
import type { IParticlesProps } from "./IParticlesProps";
import type { IParticlesState } from "./IParticlesState";
import { MutableRefObject } from "react";

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
        this.loadCanvas = this.loadCanvas.bind(this);
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

    public loadCanvas(canvas: HTMLCanvasElement): void {
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

                library.start().catch((err) => {
                    console.log(err);
                });
            }
        );
    }

    public shouldComponentUpdate(nextProps: Readonly<IParticlesProps>): boolean {
        return !this.state.library || !isEqual(nextProps, this.props);
    }

    public componentDidUpdate(): void {
        this.refresh(this.props);
    }

    public forceUpdate(): void {
        this.refresh(this.props);

        super.forceUpdate();
    }

    public componentDidMount(): void {
        this.setState({
            library: this.buildParticlesLibrary(this.props.id, this.props.params ?? this.props.options),
        });
    }

    public componentWillUnmount(): void {
        this.destroy();
    }

    public render(): ComponentChild {
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

    private buildParticlesLibrary(tagId: string, options?: RecursivePartial<IOptions>): Container | null {
        try {
            if (window === undefined) return null;
        } catch {
            return null;
        } // SSR

        tsParticles.init();

        const container = new Container(tagId, options);

        if (this.props.container) {
            (this.props.container as MutableRefObject<Container>).current = container;
        }

        return container;
    }

    private refresh(props: Readonly<IParticlesProps>): void {
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
}
