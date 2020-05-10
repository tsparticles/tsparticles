import { AbsorbersPlugin } from "./Plugins/Absorbers/AbsorbersPlugin";
import { EmittersPlugin } from "./Plugins/Emitters/EmittersPlugin";
import { PolygonMaskPlugin } from "./Plugins/PolygonMask/PolygonMaskPlugin";
import { particlesJS, pJSDom, tsParticles } from "./index.slim";

tsParticles.addPlugin(new AbsorbersPlugin())
tsParticles.addPlugin(new EmittersPlugin());
tsParticles.addPlugin(new PolygonMaskPlugin());

export { particlesJS, pJSDom, tsParticles };
