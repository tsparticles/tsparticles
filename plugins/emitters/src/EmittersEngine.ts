import type { EmittersPluginManager } from "./EmittersPluginManager.js";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

export type EmittersEngine = InteractivityEngine & {
  pluginManager: EmittersPluginManager;
};
