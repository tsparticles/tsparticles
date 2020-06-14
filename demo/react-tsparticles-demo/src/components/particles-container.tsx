import * as React from 'react';
import Particles, { IParticlesParams } from 'react-tsparticles';

interface IProps {
    params: IParticlesParams;
}

export class ParticlesContainer extends React.PureComponent<IProps> {
    render() {
        return <Particles params={this.props.params} className="frame-layout__particles"/>
    }
}