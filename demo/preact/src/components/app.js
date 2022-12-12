import { Component } from 'preact';
import { Router } from 'preact-router';
import Particles from 'preact-particles';
import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import { loadFull } from "tsparticles";
import { basic, planes } from "tsparticles-demo-configs";

export default class App extends Component {
    key = "basic";
    options = {
        basic,
        planes
    }

    state = {
        key: this.key
    };

    handleRoute = e => {
        this.currentUrl = e.url;
    };

    switchFrame = (key) => {
        console.log('switch frame', key);

        this.setState({
            ...this.state,
            key
        }, () => document.location.hash = `#${frames[key]}`);
    }

    async particlesInit(main) {
        await loadFull(main);
    }

    render() {
        return (
            <div id="app">
                <Header/>
                <div style="position: absolute; top: 50%; right: 10px; z-index: 3000;">
                    <div>
                        <button onClick={() => {
                            this.switchFrame('basic');
                        }}>Basic
                        </button>
                    </div>
                    <div>
                        <button onClick={() => {
                            this.switchFrame('planes');
                        }}>Planes
                        </button>
                    </div>
                </div>
                <Particles id="tsparticles" options={this.options[this.state.key]}
                           init={this.particlesInit.bind(this)}/>
                <Router onChange={this.handleRoute}>
                    <Home path="/"/>
                    <Profile path="/profile/" user="me"/>
                    <Profile path="/profile/:user"/>
                </Router>
            </div>
        );
    }
}
