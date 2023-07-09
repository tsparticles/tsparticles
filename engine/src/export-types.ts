import type { Engine } from "./engine";

export * from "./Core/Interfaces/Colors";
export * from "./Core/Interfaces/IBounds";
export * from "./Core/Interfaces/IBubbleParticleData";
export * from "./Core/Interfaces/ICircleBouncer";
export * from "./Core/Interfaces/IColorManager";
export * from "./Core/Interfaces/IContainerInteractivity";
export * from "./Core/Interfaces/IContainerPlugin";
export * from "./Core/Interfaces/ICoordinates";
export * from "./Core/Interfaces/IDelta";
export * from "./Core/Interfaces/IDimension";
export * from "./Core/Interfaces/IDistance";
export * from "./Core/Interfaces/IDrawParticleParams";
export * from "./Core/Interfaces/IExportPluginData";
export * from "./Core/Interfaces/IExternalInteractor";
export * from "./Core/Interfaces/IInteractor";
export * from "./Core/Interfaces/ILoadParams";
export * from "./Core/Interfaces/IMouseData";
export * from "./Core/Interfaces/IMovePathGenerator";
export * from "./Core/Interfaces/IParticle";
export * from "./Core/Interfaces/IParticleColorStyle";
export * from "./Core/Interfaces/IParticleHslAnimation";
export * from "./Core/Interfaces/IParticleLife";
export * from "./Core/Interfaces/IParticleMover";
export * from "./Core/Interfaces/IParticleRetinaProps";
export * from "./Core/Interfaces/IParticleRoll";
export * from "./Core/Interfaces/IParticleTransformValues";
export * from "./Core/Interfaces/IParticleUpdater";
export * from "./Core/Interfaces/IParticleValueAnimation";
export * from "./Core/Interfaces/IParticlesInteractor";
export * from "./Core/Interfaces/IPlugin";
export * from "./Core/Interfaces/IPositionFromSizeParams";
export * from "./Core/Interfaces/IRangeValue";
export * from "./Core/Interfaces/IRectSideResult";
export * from "./Core/Interfaces/IShapeDrawer";
export * from "./Core/Interfaces/IShapeValues";
export * from "./Core/Interfaces/ISlowParticleData";
export * from "./Core/Interfaces/ITrailFillData";

export * from "./Options/Interfaces/Background/IBackground";

export * from "./Options/Interfaces/BackgroundMask/IBackgroundMask";
export * from "./Options/Interfaces/BackgroundMask/IBackgroundMaskCover";

export * from "./Options/Interfaces/FullScreen/IFullScreen";

export * from "./Options/Interfaces/IAnimatable";
export * from "./Options/Interfaces/IAnimatableColor";
export * from "./Options/Interfaces/IAnimation";
export * from "./Options/Interfaces/IColorAnimation";
export * from "./Options/Interfaces/IHslAnimation";
export * from "./Options/Interfaces/IManualParticle";
export * from "./Options/Interfaces/IOptionLoader";
export * from "./Options/Interfaces/IOptions";
export * from "./Options/Interfaces/IOptionsColor";
export * from "./Options/Interfaces/IResponsive";
export * from "./Options/Interfaces/IValueWithRandom";

export * from "./Options/Interfaces/Interactivity/Events/IClickEvent";
export * from "./Options/Interfaces/Interactivity/Events/IDivEvent";
export * from "./Options/Interfaces/Interactivity/Events/IEvents";
export * from "./Options/Interfaces/Interactivity/Events/IHoverEvent";
export * from "./Options/Interfaces/Interactivity/Events/IParallax";
export * from "./Options/Interfaces/Interactivity/Events/IResizeEvent";
export * from "./Options/Interfaces/Interactivity/Modes/IModeDiv";
export * from "./Options/Interfaces/Interactivity/Modes/IModes";
export * from "./Options/Interfaces/Interactivity/IInteractivity";

export * from "./Options/Interfaces/Particles/Bounce/IParticlesBounce";

export * from "./Options/Interfaces/Particles/Collisions/ICollisions";
export * from "./Options/Interfaces/Particles/Collisions/ICollisionsAbsorb";
export * from "./Options/Interfaces/Particles/Collisions/ICollisionsOverlap";

export * from "./Options/Interfaces/Particles/IParticlesOptions";
export * from "./Options/Interfaces/Particles/IShadow";
export * from "./Options/Interfaces/Particles/IStroke";

export * from "./Options/Interfaces/Particles/Move/IMoveAttract";
export * from "./Options/Interfaces/Particles/Move/IMove";
export * from "./Options/Interfaces/Particles/Move/IMoveAngle";
export * from "./Options/Interfaces/Particles/Move/IMoveCenter";
export * from "./Options/Interfaces/Particles/Move/IMoveGravity";
export * from "./Options/Interfaces/Particles/Move/Path/IMovePath";
export * from "./Options/Interfaces/Particles/Move/IOutModes";
export * from "./Options/Interfaces/Particles/Move/ISpin";
export * from "./Options/Interfaces/Particles/Move/IMoveTrail";

export * from "./Options/Interfaces/Particles/Number/IParticlesDensity";
export * from "./Options/Interfaces/Particles/Number/IParticlesNumber";

export * from "./Options/Interfaces/Particles/Opacity/IOpacity";
export * from "./Options/Interfaces/Particles/Opacity/IOpacityAnimation";

export * from "./Options/Interfaces/Particles/Shape/ICharacterShape";
export * from "./Options/Interfaces/Particles/Shape/IImageShape";
export * from "./Options/Interfaces/Particles/Shape/IPolygonShape";
export * from "./Options/Interfaces/Particles/Shape/IShape";
export * from "./Options/Interfaces/Particles/Shape/IShapeValues";
export * from "./Options/Interfaces/Particles/Shape/IStarShape";

export * from "./Options/Interfaces/Particles/Size/ISize";
export * from "./Options/Interfaces/Particles/Size/ISizeAnimation";

export * from "./Options/Interfaces/Particles/ZIndex/IZIndex";

export * from "./Options/Interfaces/Theme/ITheme";
export * from "./Options/Interfaces/Theme/IThemeDefault";

export * from "./Types/CustomEventArgs";
export * from "./Types/CustomEventListener";
export * from "./Types/ISourceOptions";
export * from "./Types/ParticlesGroups";
export * from "./Types/PathOptions";
export * from "./Types/RangeValue";
export * from "./Types/RecursivePartial";
export * from "./Types/ShapeData";
export * from "./Types/ShapeDrawerFunctions";
export * from "./Types/SingleOrMultiple";

export type { EventListeners } from "./Core/Utils/EventListeners";
export type { InteractionManager } from "./Core/Utils/InteractionManager";
export type { Plugins } from "./Core/Utils/Plugins";
export type { QuadTree } from "./Core/Utils/QuadTree";
export type { Canvas } from "./Core/Canvas";
export type { Container } from "./Core/Container";
export type { Particle } from "./Core/Particle";
export type { Particles } from "./Core/Particles";
export type { Retina } from "./Core/Retina";
export type { Engine, Engine as Main };
