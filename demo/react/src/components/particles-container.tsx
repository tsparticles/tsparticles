import * as React from 'react';
import Particles from 'react-tsparticles';
import type { Container, Main, IOptions, RecursivePartial } from "tsparticles-engine";
import { loadFull } from "tsparticles";

interface IProps {
    options: RecursivePartial<IOptions>;
}

export class ParticlesContainer extends React.PureComponent<IProps> {
    particlesInit(main: Main): void {
        loadFull(main);
    }

    particlesLoaded(container: Container): void {
        console.log(container);
    }

    render() {
        return <Particles options={this.props.options} className="frame-layout__particles"
            init={this.particlesInit.bind(this)} loaded={this.particlesLoaded.bind(this)} />
    }
}
