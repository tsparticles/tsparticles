import * as React from 'react';
import Particles, { IParticlesParams } from 'react-tsparticles';

interface IProps {
    options: IParticlesParams;
}

export class ParticlesContainer extends React.PureComponent<IProps> {
    render() {
        return <Particles options={this.props.options} className="frame-layout__particles"/>
    }
}