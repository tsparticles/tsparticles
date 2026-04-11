import Particles from "@tsparticles/react";
import { useCallback, useMemo, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const containerRef = useRef(null);

  const particlesLoaded = useCallback(
      container => {
        containerRef.current = container;

        globalThis.particlesContainer = container;
      },
      [containerRef],
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
          size: {
            value: 3,
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
                paint: {
                  fill: {
                    color: {
                      value: "#000000",
                    },
                    enable: true,
                  },
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
                paint: {
                  fill: {
                    color: {
                      value: "#ffffff",
                    },
                    enable: true,
                  },
                },
                links: {
                  color: "#ffffff",
                },
              },
            },
          },
        ],
      }),
      [],
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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://react.dev" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <button className="theme-btn" onClick={lightTheme}>
          Light
        </button>
        <button className="theme-btn" onClick={darkTheme}>
          Dark
        </button>
      </header>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
    </div>
  );
}

export default App;
