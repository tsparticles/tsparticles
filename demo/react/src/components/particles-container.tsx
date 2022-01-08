import * as React from 'react';
import Particles from 'react-tsparticles';
import type { Container, IOptions, RecursivePartial } from "tsparticles";

interface IProps {
    options: RecursivePartial<IOptions>;
}

export class ParticlesContainer extends React.PureComponent<IProps> {
    async particlesLoaded(container: Container): Promise<void> {
        console.log(container);
    }

    render() {
        return <Particles options={this.props.options} className="frame-layout__particles"
                          loaded={this.particlesLoaded.bind(this)}/>
    }
}
