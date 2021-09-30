import * as React from 'react';
import Particles from 'react-tsparticles';
import type { IOptions, RecursivePartial } from "tsparticles-engine";
import type { Main } from "tsparticles-engine";
import { loadFull } from "tsparticles";

interface IProps {
    options: RecursivePartial<IOptions>;
}

export class ParticlesContainer extends React.PureComponent<IProps> {
    particlesInit(main: Main): void {
        loadFull(main);
    }

    render() {
        return <Particles options={ this.props.options } className="frame-layout__particles"
                          init={ this.particlesInit.bind(this) }/>
    }
}
