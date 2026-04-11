import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    const containerRef = useRef(null), [ init, setInit ] = useState(false);

    useEffect(() => {
        if (init) {
            return;
        }

        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, [ init ]);

    const particlesLoaded = useCallback(
            (container) => {
                containerRef.current = container;

                window.particlesContainer = container;
            },
            [ containerRef ]
        ),
        options = useMemo(
            () => ({
                fullScreen: {
                    zIndex: -1,
                },
                particles: {
                    number: {
                        value: 100,
                    },
                    links: {
                        enable: true,
                    },
                    move: {
                        enable: true,
                    },
                },
                themes: [
                    {
                        name: "light",
                        default: {
                            value: true,
                            auto: true,
                            mode: "light",
                        },
                        options: {
                            background: {
                                color: "#ffffff",
                            },
                            particles: {
                                color: {
                                    value: "#000000",
                                },
                                links: {
                                    color: "#000000",
                                },
                            },
                        },
                    },
                    {
                        name: "dark",
                        default: {
                            value: true,
                            auto: true,
                            mode: "dark",
                        },
                        options: {
                            background: {
                                color: "#000000",
                            },
                            particles: {
                                color: {
                                    value: "#ffffff",
                                },
                                links: {
                                    color: "#ffffff",
                                },
                            },
                        },
                    },
                ],
            }),
            []
        ),
        lightTheme = () => {
            containerRef.current?.loadTheme("light");
        },
        darkTheme = () => {
            containerRef.current?.loadTheme("dark");
        };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <button className="theme-btn" onClick={lightTheme}>
                    Light
                </button>
                <button className="theme-btn" onClick={darkTheme}>
                    Dark
                </button>
            </header>
            {init && (
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={options}
                />
            )}
        </div>
    );
}

export default App;
