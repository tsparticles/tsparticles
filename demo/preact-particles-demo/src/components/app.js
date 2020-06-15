import { h, Component } from 'preact';
import { Particles, IParticlesParams } from 'preact-particles';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Profile from '../routes/profile';

export default class App extends Component {
    key = "simple1";
    params = {
        simple1: {
            background: {
                color: "#000000",
            },
            particles: {
                number: { value: 100 },
                links: {
                    enable: true,
                },
                move: { enable: true }
            }
        },
        simple2: {
            background: {
                color: "#000000",
            },
            particles: {
                number: { value: 100 },
                move: { enable: true },
                links: {
                    enable: true,
                },
                color: { value: "#ff0000" }
            }
        }
    }

    state = {
        key: this.key
    };

    /** Gets fired when the route changes.
     *    @param {Object} event        "change" event from [preact-router](http://git.io/preact-router)
     *    @param {string} event.url    The newly routed URL
     */
    handleRoute = e => {
        this.currentUrl = e.url;
    };

    switchFrame = (key) => {
        console.log('switch frame', key);

        this.setState({
            ...this.state,
            key: key
        }, () => document.location.hash = `#${frames[key]}`);
    }

    render() {
        return (
            <div id="app">
                <Header/>
                <div style="position: absolute; top: 50%; right: 10px; z-index: 3000;">
                    <div>
                        <button onClick={() => {
                            this.switchFrame('simple1');
                        }}>Simple 1
                        </button>
                    </div>
                    <div>
                        <button onClick={() => {
                            this.switchFrame('simple2');
                        }}>Simple 2
                        </button>
                    </div>
                </div>
                <Particles id="tsparticles" params={this.params[this.state.key]}/>
                <Router onChange={this.handleRoute}>
                    <Home path="/"/>
                    <Profile path="/profile/" user="me"/>
                    <Profile path="/profile/:user"/>
                </Router>
            </div>
        );
    }
}
