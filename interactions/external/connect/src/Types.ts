import type { InteractivityContainer, InteractivityParticle } from "@tsparticles/plugin-interactivity";
import type { Connect } from "./Options/Classes/Connect.js";
import type { ConnectOptions } from "./Options/Classes/ConnectOptions.js";
import type { IConnect } from "./Options/Interfaces/IConnect.js";

export interface IConnectMode {
    connect: IConnect;
}

export interface ConnectMode {
    connect?: Connect;
}

export type ConnectContainer = InteractivityContainer & {
    actualOptions: ConnectOptions;
    retina: {
        connectModeDistance?: number;
        connectModeRadius?: number;
    };
};

export type LinkParticle = InteractivityParticle & {
    retina: {
        linksWidth?: number;
    };
};
