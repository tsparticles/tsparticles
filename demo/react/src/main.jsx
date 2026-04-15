import React from "react";
import ReactDOM from "react-dom/client";
import { ParticlesProvider } from "@tsparticles/react";
import App from "./App";
import "./index.css";
import { registerParticles } from "./particlesInit";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ParticlesProvider init={registerParticles}>
      <App />
    </ParticlesProvider>
  </React.StrictMode>,
);
