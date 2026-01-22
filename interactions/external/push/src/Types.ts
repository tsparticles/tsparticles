import type { InteractivityContainer, InteractivityOptions } from "@tsparticles/plugin-interactivity";
import type { IPush } from "./Options/Interfaces/IPush.js";
import type { Push } from "./Options/Classes/Push.js";

export interface IPushMode {
  push: IPush;
}

export interface PushMode {
  push?: Push;
}

export type PushContainer = InteractivityContainer & {
  actualOptions: PushOptions;
};

export type PushOptions = InteractivityOptions & {
  interactivity?: {
    modes: PushMode;
  };
};
