import * as React from "react";
import Particles from "react-tsparticles";
import { IOptions, RecursivePartial, Main } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { loadSeaAnemonePreset } from "tsparticles-preset-sea-anemone";

interface IProps {
    options: RecursivePartial<IOptions>;
}

export class ParticlesContainer extends React.PureComponent<IProps> {
    constructor() {
        super({ options: {} });

        this.customInit = this.customInit.bind(this);
    }

    customInit(tsParticles: Main) {
        loadFull(tsParticles);
        loadSeaAnemonePreset(tsParticles);
    }

    render() {
        return <Particles options={this.props.options} className="frame-layout__particles" init={this.customInit}/>;
    }
}
