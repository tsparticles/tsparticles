"use client";

import Particles from "@tsparticles/react";
import configs from "@tsparticles/configs";

export default function ParticlesComponent(props: {
    id: string;
}) {
    return <Particles id={props.id} options={configs.basic}/>;
}
