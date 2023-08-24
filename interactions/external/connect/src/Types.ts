import type { Container, Particle } from "@tsparticles/engine";
import type { Connect } from "./Options/Classes/Connect";
import type { ConnectOptions } from "./Options/Classes/ConnectOptions";
import type { IConnect } from "./Options/Interfaces/IConnect";

export type IConnectMode = {
    connect: IConnect;
};

export type ConnectMode = {
    connect?: Connect;
};

export type ConnectContainer = Container & {
    actualOptions: ConnectOptions;
    retina: {
        connectModeDistance?: number;
        connectModeRadius?: number;
    };
};

export type LinkParticle = Particle & {
    retina: {
        linksWidth?: number;
    };
};
