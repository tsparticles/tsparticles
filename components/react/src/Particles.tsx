import React, { Component, MutableRefObject, ReactNode } from "react";
import { tsParticles, Container } from "tsparticles-engine";
import equal from "fast-deep-equal/react";
import type { IParticlesProps } from "./IParticlesProps";
import type { IParticlesState } from "./IParticlesState";
import type { ISourceOptions } from "tsparticles-engine";

const defaultId = "tsparticles";

/**
 * @param {{id?: string,width?: string,height?: string,options?: ISourceOptions,params?: ISourceOptions,style?: CSSProperties,className?: string,canvasClassName?: string,container?: RefObject<Container>}}
 */
export default class Particles extends Component<IParticlesProps, IParticlesState> {
    static defaultProps: IParticlesProps = {
        width: "100%",
        height: "100%",
        options: {},
        style: {},
        url: undefined,
        id: defaultId,
    };

    constructor(props: IParticlesProps) {
        super(props);

        this.state = {
            init: false,
            library: undefined,
        };
    }

    destroy(): void {
        if (!this.state.library) {
            return;
        }

        this.state.library.destroy();

        this.setState({
            library: undefined,
        });
    }

    shouldComponentUpdate(nextProps: Readonly<IParticlesProps>): boolean {
        return !equal(nextProps, this.props);
    }

    componentDidUpdate(): void {
        this.refresh();
    }

    forceUpdate(): void {
        this.refresh().then(() => {
            super.forceUpdate();
        });
    }

    componentDidMount(): void {
        (async () => {
            if (this.props.init) {
                await this.props.init(tsParticles);
            }

            this.setState(
                {
                    init: true,
                },
                async () => {
                    await this.loadParticles();
                }
            );
        })();
    }

    componentWillUnmount(): void {
        this.destroy();
    }

    render(): ReactNode {
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

    private async refresh(): Promise<void> {
        this.destroy();

        await this.loadParticles();
    }

    private async loadParticles(): Promise<void> {
        if (!this.state.init) {
            return;
        }

        const cb = async (container?: Container) => {
            if (this.props.container) {
                (this.props.container as MutableRefObject<Container | undefined>).current = container;
            }

            this.setState({
                library: container,
            });

            if (this.props.loaded) {
                await this.props.loaded(container);
            }
        };

        const id = this.props.id ?? Particles.defaultProps.id ?? defaultId,
            container = this.props.url
                ? await tsParticles.loadJSON(id, this.props.url)
                : await tsParticles.load(id, this.props.params ?? this.props.options);

        await cb(container);
    }
}
