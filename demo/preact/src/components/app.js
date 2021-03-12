import { Component } from 'preact';
import { Router } from 'preact-router';
import Particles from 'preact-particles';
import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';

export default class App extends Component {
    key = "simple1";
    options = {
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
                color: {
                    value: "#ff0000",
                    animation: {
                        enable: true,
                        speed: 20
                    }
                }
            }
        }
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

    render() {
        return (
            <div id="app">
                <Header />
                <div style="position: absolute; top: 50%; right: 10px; z-index: 3000;">
                    <div>
                        <button onClick={() => {
                            this.switchFrame('simple1');
                        }}>Sample 1
                        </button>
                    </div>
                    <div>
                        <button onClick={() => {
                            this.switchFrame('simple2');
                        }}>Sample 2
                        </button>
                    </div>
                </div>
                <Particles id="tsparticles" options={this.options[this.state.key]} />
                <Router onChange={this.handleRoute}>
                    <Home path="/" />
                    <Profile path="/profile/" user="me" />
                    <Profile path="/profile/:user" />
                </Router>
            </div>
        );
    }
}
