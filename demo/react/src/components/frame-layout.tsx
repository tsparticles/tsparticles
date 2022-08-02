import React from 'react';
import { FrameThumbsContainer } from './frame-thumbs-container';
import { ParticlesContainer } from './particles-container';
import { Subscription } from 'rxjs';
import { onKeyPressed } from '../streams/key-pressed';
import type { ISourceOptions } from "tsparticles-engine";


const getFrameCode = (options: ISourceOptions) => {
    const paramsCode = JSON.stringify(options, null, 4)
        .split('\n')
        .map((x, i) => i > 0 ? `\t${x}` : x)
        .join('\n');
    return `<Particles
    options={${paramsCode}} />`;
}

interface IProps extends Partial<IDefaultProps> {
    name: string;
    backgroundColor: string;
    options?: ISourceOptions;
}

interface IDefaultProps {
    wrapperClassName: string;
}

interface IState {
    codeVisible: boolean;
    version: string;
}

export class FrameLayout extends React.Component<IProps, IState> {

    static defaultProps: IDefaultProps = {
        wrapperClassName: '',
    };

    private subscription: Subscription = new Subscription();

    constructor(props: IProps) {
        super(props);
        this.onCodeContainerClick = this.onCodeContainerClick.bind(this);
        this.state = {
            codeVisible: false,
            version: ""
        };
    }

    componentDidMount() {
        this.subscription = onKeyPressed.subscribe(keyCode => {
            if (keyCode === 27) {
                this.setState({
                    codeVisible: false
                });
            }
        });

        // @ts-ignore
        import("../../package.json").then(pkgInfo => {
            this.setState({
                version: pkgInfo.version
            })
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    onCodeContainerClick() {
        if (!this.state.codeVisible) {
            this.setState({
                ...this.state,
                codeVisible: !this.state.codeVisible
            });
        }
    }

    render() {
        return (
            <div
                className={`frame-layout__wrapper ${this.props.wrapperClassName}`}
                style={{
                    background: this.props.backgroundColor
                }}>
                <div className="frame-layout__particles-container">
                    {this.props.options && <ParticlesContainer options={this.props.options}/>}
                </div>
                <div className="frame-layout__container">
                    {/*
                    The syntax highlighter component is broken
                    <div className="frame-layout__content">
                        <div className="frame-layout__name">React Particles JS - {this.props.name} Preset</div>
                        <div
                            className={`frame-layout__code-container ${this.state.codeVisible ? 'expanded' : 'collapsed'}`}
                            onClick={this.onCodeContainerClick}>
                            <SyntaxHighlighter
                                codeTagProps={{
                                    style: {
                                        fontSize: '.7rem'
                                    }
                                }}
                                language={this.state.codeVisible ? 'jsx' : 'text'}
                                style={theme}>
                                {this.state.codeVisible ? getFrameCode(this.props.options) : 'View code'}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                    */}
                    <div className="frame-layout__thumbs">
                        <FrameThumbsContainer/>
                    </div>
                </div>

                <div className="frame-layout__footer">
                    <a
                        className="github-mark"
                        href="https://github.com/matteobruni/react-particles"
                        target="_blank"/>
                    <span>v{this.state.version}</span>
                </div>

            </div>
        );
    }
}
