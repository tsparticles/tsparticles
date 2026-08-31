import { createNodes } from "./create-nodes.ts";

const plugin = {
  name: "@tsparticles/cli-nx-plugin",
  createNodes,
};

export default plugin;
export { createNodes };
