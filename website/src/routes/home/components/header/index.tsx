import { RecursivePartial } from "tsparticles/dist/Types/RecursivePartial";
import { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
import Particles from "react-tsparticles";
import particlesOptions from "./header.particles.json";
import React from "react";
import "./header.css";

export default function Header() {
    return (
        <header className="App-header">
            <Particles options={particlesOptions as RecursivePartial<IOptions>}/>
            <div className="header-container">
                <h1>
                    tsParticles
                </h1>
                <p>
                    TypeScript library for easily creating particles animations.
                </p>
            </div>
        </header>
    );
}
