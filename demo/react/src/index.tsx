import * as React from 'react';
import { render } from 'react-dom';
import { FrameLayout } from './components/frame-layout';
import { frames } from './frames';
import { FrameContext } from './contexts/frame-context';
import { Subject } from 'rxjs';
import { onKeyPressed } from './streams/key-pressed';

interface IProps {
}

interface IState {
    chosenFrame: number;
    onKeyPressed: Subject<number>;
}

export class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.switchFrame = this.switchFrame.bind(this);
        this.state = {
            chosenFrame: 0,
            onKeyPressed
        };
    }

    componentDidMount() {
        setTimeout(() => this.checkHash());
        window.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.onKeyUp);
    }

    private onKeyUp(event: KeyboardEvent) {
        this.state.onKeyPressed.next(event.key.charCodeAt(0));
    }

    private checkHash() {
        let hash = document.location.hash;
        if (!hash)
            return;
        hash = hash.replace(/^#/, '');
        if (!hash)
            return;
        const frameIndex = frames.findIndex(f => f.slug === hash);
        if (frameIndex === -1)
            return;
        this.setState({
            ...this.state,
            chosenFrame: frameIndex
        });
    }

    switchFrame(frameIndex: number) {
        this.setState({
            ...this.state,
            chosenFrame: frameIndex
        }, () => document.location.hash = `#${frames[frameIndex].slug}`);
    }

    render() {
        return (
            <FrameContext.Provider value={{
                chosenFrame: this.state.chosenFrame,
                switchFrame: this.switchFrame
            }}>
                <FrameContext.Consumer>
                    {({ chosenFrame }) =>
                        <FrameLayout
                            backgroundColor={frames[chosenFrame].backgroundColor}
                            name={frames[chosenFrame].name}
                            options={frames[chosenFrame].options}/>}
                </FrameContext.Consumer>
            </FrameContext.Provider>

        );
    }
}

render(<App/>, document.getElementById('app'));