import { tsParticles } from "tsparticles-engine";
import { loadPolygonMaskPlugin } from "./plugin";

loadPolygonMaskPlugin(tsParticles);

export { loadPolygonMaskPlugin, tsParticles };
