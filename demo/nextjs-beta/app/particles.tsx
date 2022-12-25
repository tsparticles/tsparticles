"use client";

import { loadFull } from "tsparticles";
import Particles from "react-particles";
import { useCallback } from "react";
import { Engine } from "tsparticles-engine";
import { basic } from "tsparticles-demo-configs";

export default function ParticlesComponent(props: { id: string }) {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    return <Particles id={props.id} init={particlesInit} options={basic}/>
};
