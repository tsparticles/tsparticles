import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Particles from "react-tsparticles";
import { RecursivePartial } from "tsparticles/dist/Types/RecursivePartial";
import { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
import "./sample.css";

export type SampleState = {
    options?: RecursivePartial<IOptions>;
};

class Sample extends Component<any, SampleState> {
    constructor() {
        super();

        this.state = {
            options: undefined
        };
    }

    componentDidMount() {
        console.log(this.props);

        const name = this.props.match.params.name;

        fetch(`/configs/${name}.json`).then(res => {
            if (res.ok) {
                res.json().then(options => this.setState({ options }));
            }
        });
    }


    render() {
        return (
            <Particles id="tsparticles-sample" options={this.state.options}/>
        );
    }
}

export default withRouter(Sample);
