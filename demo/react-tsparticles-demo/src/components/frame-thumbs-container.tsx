import * as React from 'react';
import { FrameContext } from '../contexts/frame-context';
import { frames } from '../frames';

interface IProps {}

export class FrameThumbsContainer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        return (
            <div className="frame-thumbs__container">
                <div className="frame-thumbs__title">Presets</div>
                <FrameContext.Consumer>
                    {({switchFrame}) =>
                        <React.Fragment>
                            {frames.map((f, i) =>
                                <div
                                    className="frame-thumbs__thumb"
                                    key={i}
                                    onClick={_ => switchFrame(i)}>
                                    {f.name}
                                </div>)}
                        </React.Fragment>}
                </FrameContext.Consumer>
            </div>
        );
    }
}