import type { Container, Particle } from "@tsparticles/engine";
import type { Connect } from "./Options/Classes/Connect.js";
import type { ConnectOptions } from "./Options/Classes/ConnectOptions.js";
import type { IConnect } from "./Options/Interfaces/IConnect.js";

export interface IConnectMode {
    connect: IConnect;
}

export interface ConnectMode {
    connect?: Connect;
}

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
