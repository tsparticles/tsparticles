import { Engine } from "./engine";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types/RecursivePartial";
import { initPjs } from "./pjs";
import { loadSlim } from "./slim";

/**
 * The exposed tsParticles instance
 */
const tsParticles = new Engine();

tsParticles.init();

const {
    /**
     * The particles.js compatibility instance
     */
    particlesJS,

    /**
     * The particles.js compatibility dom array
     */
    pJSDom,
} = initPjs(tsParticles);

loadSlim(tsParticles);

export * from "./Core/Interfaces/Colors";
export * from "./Core/Interfaces/Gradients";
export * from "./Core/Interfaces/IAttract";
export * from "./Core/Interfaces/IBounds";
export * from "./Core/Interfaces/IBubble";
export * from "./Core/Interfaces/IBubbleParticleData";
export * from "./Core/Interfaces/ICircleBouncer";
export * from "./Core/Interfaces/IContainerInteractivity";
export * from "./Core/Interfaces/IContainerPlugin";
export * from "./Core/Interfaces/ICoordinates";
export * from "./Core/Interfaces/IDelta";
export * from "./Core/Interfaces/IDimension";
export * from "./Core/Interfaces/IDistance";
export * from "./Core/Interfaces/IExternalInteractor";
export * from "./Core/Interfaces/IInteractor";
export * from "./Core/Interfaces/IMouseData";
export * from "./Core/Interfaces/IMovePathGenerator";
export * from "./Core/Interfaces/IParticle";
export * from "./Core/Interfaces/IParticleColorStyle";
export * from "./Core/Interfaces/IParticleGravity";
export * from "./Core/Interfaces/IParticleHslAnimation";
export * from "./Core/Interfaces/IParticlesInteractor";
export * from "./Core/Interfaces/IParticleLife";
export * from "./Core/Interfaces/IParticleLoops";
export * from "./Core/Interfaces/IParticleRetinaProps";
export * from "./Core/Interfaces/IParticleRoll";
export * from "./Core/Interfaces/IParticleSpin";
export * from "./Core/Interfaces/IParticleUpdater";
export * from "./Core/Interfaces/IParticleValueAnimation";
export * from "./Core/Interfaces/IParticleWobble";
export * from "./Core/Interfaces/IPlugin";
export * from "./Core/Interfaces/IRangeValue";
export * from "./Core/Interfaces/IRectSideResult";
export * from "./Core/Interfaces/IRepulse";
export * from "./Core/Interfaces/IShapeDrawer";
export * from "./Core/Interfaces/IShapeValues";
export * from "./Core/Utils/Circle";
export * from "./Core/Utils/CircleWarp";
export * from "./Core/Utils/Constants";
export * from "./Core/Utils/EventListeners";
export * from "./Core/Utils/ExternalInteractorBase";
export * from "./Core/Utils/FrameManager";
export * from "./Core/Utils/InteractionManager";
export * from "./Core/Utils/ParticlesInteractorBase";
export * from "./Core/Utils/ParticlesMover";
export * from "./Core/Utils/Plugins";
export * from "./Core/Utils/Point";
export * from "./Core/Utils/QuadTree";
export * from "./Core/Utils/Range";
export * from "./Core/Utils/Rectangle";
export * from "./Core/Utils/Vector";
export * from "./Core/Utils/Vector3d";
export * from "./Core/Canvas";
export * from "./Core/Container";
export * from "./Core/Loader";
export * from "./Core/Particle";
export * from "./Core/Particles";
export * from "./Core/Retina";
export * from "./Enums/Directions/MoveDirection";
export * from "./Enums/Directions/RotateDirection";
export * from "./Enums/Directions/OutModeDirection";
export * from "./Enums/Directions/TiltDirection";
export * from "./Enums/Modes/ClickMode";
export * from "./Enums/Modes/DestroyMode";
export * from "./Enums/Modes/DivMode";
export * from "./Enums/Modes/HoverMode";
export * from "./Enums/Modes/CollisionMode";
export * from "./Enums/Modes/OutMode";
export * from "./Enums/Modes/RollMode";
export * from "./Enums/Modes/SizeMode";
export * from "./Enums/Modes/ThemeMode";
export * from "./Enums/Modes/ResponsiveMode";
export * from "./Enums/Types/AlterType";
export * from "./Enums/Types/DestroyType";
export * from "./Enums/Types/GradientType";
export * from "./Enums/Types/InteractorType";
export * from "./Enums/Types/ShapeType";
export * from "./Enums/Types/StartValueType";
export * from "./Enums/Types/DivType";
export * from "./Enums/Types/EasingType";
export * from "./Enums/AnimationStatus";
export * from "./Enums/InteractivityDetect";
export { Engine, Engine as Main };
export * from "./Types/RangeValue";
export * from "./Types/RecursivePartial";
export * from "./Types/ShapeData";
export * from "./Types/ShapeDrawerFunctions";
export * from "./Types/SingleOrMultiple";
export * from "./Types/PathOptions";
export * from "./Utils/CanvasUtils";
export * from "./Utils/ColorUtils";
export * from "./Utils/NumberUtils";
export * from "./Utils/Utils";
export { tsParticles, particlesJS, pJSDom };
export { IOptions };
export type ISourceOptions = RecursivePartial<IOptions>;
export { IParticleColorStyle } from "./Core/Interfaces/IParticleColorStyle";
