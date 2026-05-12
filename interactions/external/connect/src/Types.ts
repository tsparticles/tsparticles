import type { InteractivityContainer, InteractivityParticle } from "@tsparticles/plugin-interactivity";
import type { Connect } from "./Options/Classes/Connect.js";
import type { ConnectOptions } from "./Options/Classes/ConnectOptions.js";
import type { IConnect } from "./Options/Interfaces/IConnect.js";

/** Connect mode interface */
export interface IConnectMode {
  connect: IConnect;
}

/** Connect mode options */
export interface ConnectMode {
  connect?: Connect;
}

/** Connect container interface */
export type ConnectContainer = InteractivityContainer & {
  actualOptions: ConnectOptions;
  retina: {
    connectModeDistance?: number;
    connectModeRadius?: number;
  };
};

/** Connect link particle */
export type LinkParticle = InteractivityParticle & {
  retina: {
    linksWidth?: number;
  };
};
