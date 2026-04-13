import { Component } from "preact";
import { Router } from "preact-router";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import Header from "./header";
import Home from "../routes/home";
import Profile from "../routes/profile";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

export default class App extends Component {
    key = "basic";
    options = {
        basic: configs.basic,
        planes: configs.planes,
    };

    state = {
        key: this.key,
        particlesInitialized: false
    };

    handleRoute = e => {
        this.currentUrl = e.url;
    };

    switchFrame = (key) => {
        this.setState({
            ...this.state,
            key,
        }, () => {
            document.location.hash = `#${key}`;
        });
    };

    constructor() {
        super();

        void initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            this.setState({
                ...this.state,
                particlesInitialized: true
            });
        });
    }

    render() {
        return (
            <div id="app">
                <Header/>
                <div style="position: absolute; top: 50%; right: 10px; z-index: 3000;">
                    <div>
                        <button onClick={() => {
                            this.switchFrame("basic");
                        }}>Basic
                        </button>
                    </div>
                    <div>
                        <button onClick={() => {
                            this.switchFrame("planes");
                        }}>Planes
                        </button>
                    </div>
                </div>
                {this.state.particlesInitialized &&
                    <Particles id="tsparticles" options={this.options[this.state.key]}/>}
                <Router onChange={this.handleRoute}>
                    <Home path="/"/>
                    <Profile path="/profile/" user="me"/>
                    <Profile path="/profile/:user"/>
                </Router>
            </div>
        );
    }
}
