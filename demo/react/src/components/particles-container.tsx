import * as React from 'react';
import Particles from 'react-tsparticles';
import { IOptions, RecursivePartial } from "tsparticles-engine";

interface IProps {
    options: RecursivePartial<IOptions>;
}

export class ParticlesContainer extends React.PureComponent<IProps> {
    render() {
        return <Particles options={this.props.options} className="frame-layout__particles"/>
    }
}
