import React, { Component, MutableRefObject, ReactNode } from "react";
import type { ISourceOptions } from "tsparticles";
import { tsParticles, Container } from "tsparticles";
import { isEqual } from "lodash";
import type { IParticlesProps } from "./IParticlesProps";
import type { IParticlesState } from "./IParticlesState";

/**
 * @param {{id?: string,width?: string,height?: string,options?: ISourceOptions,params?: ISourceOptions,style?: CSSProperties,className?: string,canvasClassName?: string,container?: RefObject<Container>}}
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

                if (!library) {
                    return;
                }

                library.canvas.loadCanvas(canvas);
                library.start();
            }
        );
    }

    public shouldComponentUpdate(nextProps: Readonly<IParticlesProps>): boolean {
        return !isEqual(nextProps, this.props);
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

    public render(): ReactNode {
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

    private buildParticlesLibrary(tagId?: string, options?: ISourceOptions): Container | undefined {
        try {
            if (window === undefined) {
                return;
            }
        } catch {
            return;
        } // SSR

        tsParticles.init();

        const container = new Container(tagId ?? Particles.defaultProps.id, options);

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
