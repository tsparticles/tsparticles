import * as React from "react";
import {Component} from "react";
import isEqual from 'lodash/isEqual';
import {IOptions} from "tsparticles/dist/Interfaces/Options/IOptions";
import {Container} from "tsparticles/dist/Classes/Container";
import {RecursivePartial} from "tsparticles/dist/Types/RecursivePartial";
import {defaultParams} from "./DefaultOptions";
import {Options} from "tsparticles/dist/Classes/Options/Options";

export interface ParticlesProps {
    id: string;
    width: string;
    height: string;
    params: RecursivePartial<IOptions>;
    style: any;
    className?: string;
    canvasClassName?: string;
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
        var options = new Options();

        options.load(defaultParams);
        options.load(params);

        const container = new Container(tagId, options);

        console.log(container);

        return container;
    }

    private refresh(props: Readonly<ParticlesProps>): void {
        console.log('refresh');
        const {canvas} = this.state;
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
            delete this.state.library;
        }
    }

    loadCanvas(canvas: HTMLCanvasElement) {
        if (canvas) {
            this.setState({
                    canvas
                },
                () => {
                    const {library} = this.state;

                    if (!library) {
                        return;
                    }

                    console.log(library.canvas.element);
                }
            );
        }
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
        console.log('didMount');
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
        let {width, height, className, canvasClassName, id} = this.props;
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
