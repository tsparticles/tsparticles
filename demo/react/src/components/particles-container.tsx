import * as React from 'react';
import Particles from 'react-tsparticles';
import { IOptions, RecursivePartial, Main } from "tsparticles";
import { loadPreset } from "tsparticles-preset-sea-anemone";

interface IProps {
    options: RecursivePartial<IOptions>;
}

export class ParticlesContainer extends React.PureComponent<IProps> {
    customInit(tsParticles: Main) {
        loadPreset(tsParticles);
    }

    render() {
        return <Particles options={this.props.options} className="frame-layout__particles" init={this.customInit}/>
    }
}
