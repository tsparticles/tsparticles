import { Engine } from "./engine";
import { HslColorManager } from "./Utils/HslColorManager";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types/RecursivePartial";
import { RgbColorManager } from "./Utils/RgbColorManager";
import { addColorManager } from "./Utils/ColorUtils";

const rgbColorManager = new RgbColorManager(),
    hslColorManager = new HslColorManager();

addColorManager("rgb", rgbColorManager);
addColorManager("hsl", hslColorManager);

/**
 * The exposed tsParticles instance
 */
const tsParticles = new Engine();

tsParticles.init();

export * from "./Core/Utils/Circle";
export * from "./Core/Utils/CircleWarp";
export * from "./Core/Utils/Constants";
export * from "./Core/Utils/ExternalInteractorBase";
export * from "./Core/Utils/ParticlesInteractorBase";
export * from "./Core/Utils/Point";
export * from "./Core/Utils/Range";
export * from "./Core/Utils/Rectangle";
export * from "./Core/Utils/Vector";
export * from "./Core/Utils/Vector3d";
export * from "./Enums/Directions/MoveDirection";
export * from "./Enums/Directions/RotateDirection";
export * from "./Enums/Directions/OutModeDirection";
export * from "./Enums/Modes/ClickMode";
export * from "./Enums/Modes/DestroyMode";
export * from "./Enums/Modes/DivMode";
export * from "./Enums/Modes/HoverMode";
export * from "./Enums/Modes/CollisionMode";
export * from "./Enums/Modes/OutMode";
export * from "./Enums/Modes/SizeMode";
export * from "./Enums/Modes/ThemeMode";
export * from "./Enums/Modes/ResponsiveMode";
export * from "./Enums/Types/AlterType";
export * from "./Enums/Types/DestroyType";
export * from "./Enums/Types/GradientType";
export * from "./Enums/Types/InteractorType";
export * from "./Enums/Types/ParticleOutType";
export * from "./Enums/Types/StartValueType";
export * from "./Enums/Types/DivType";
export * from "./Enums/Types/EasingType";
export * from "./Enums/AnimationStatus";
export * from "./Enums/InteractivityDetect";
export * from "./Options/Classes/AnimatableColor";
export * from "./Options/Classes/AnimationOptions";
export * from "./Options/Classes/Background/Background";
export * from "./Options/Classes/BackgroundMask/BackgroundMask";
export * from "./Options/Classes/BackgroundMask/BackgroundMaskCover";
export * from "./Options/Classes/ColorAnimation";
export * from "./Options/Classes/FullScreen/FullScreen";
export * from "./Options/Classes/HslAnimation";
export * from "./Options/Classes/Interactivity/Events/ClickEvent";
export * from "./Options/Classes/Interactivity/Events/DivEvent";
export * from "./Options/Classes/Interactivity/Events/ClickEvent";
export * from "./Options/Classes/Interactivity/Events/DivEvent";
export * from "./Options/Classes/Interactivity/Events/Events";
export * from "./Options/Classes/Interactivity/Events/HoverEvent";
export * from "./Options/Classes/Interactivity/Events/Parallax";
export * from "./Options/Classes/Interactivity/Interactivity";
export * from "./Options/Classes/Interactivity/Modes/Attract";
export * from "./Options/Classes/Interactivity/Modes/Bounce";
export * from "./Options/Classes/Interactivity/Modes/Bubble";
export * from "./Options/Classes/Interactivity/Modes/BubbleBase";
export * from "./Options/Classes/Interactivity/Modes/BubbleDiv";
export * from "./Options/Classes/Interactivity/Modes/Connect";
export * from "./Options/Classes/Interactivity/Modes/ConnectLinks";
export * from "./Options/Classes/Interactivity/Modes/Grab";
export * from "./Options/Classes/Interactivity/Modes/GrabLinks";
export * from "./Options/Classes/Interactivity/Modes/Modes";
export * from "./Options/Classes/Interactivity/Modes/Slow";
export * from "./Options/Classes/ManualParticle";
export * from "./Options/Classes/Motion/Motion";
export * from "./Options/Classes/Motion/MotionReduce";
export * from "./Options/Classes/Options";
export * from "./Options/Classes/OptionsColor";
export * from "./Options/Classes/Particles/Bounce/ParticlesBounce";
export * from "./Options/Classes/Particles/Bounce/ParticlesBounceFactor";
export * from "./Options/Classes/Particles/Collisions/Collisions";
export * from "./Options/Classes/Particles/Collisions/CollisionsOverlap";
export * from "./Options/Classes/Particles/Destroy/Destroy";
export * from "./Options/Classes/Particles/Destroy/Split";
export * from "./Options/Classes/Particles/Destroy/SplitFactor";
export * from "./Options/Classes/Particles/Destroy/SplitRate";
export * from "./Options/Classes/Particles/ParticlesOptions";
export * from "./Options/Classes/Particles/Shadow";
export * from "./Options/Classes/Particles/Stroke";
export * from "./Options/Classes/Particles/Move/MoveAttract";
export * from "./Options/Classes/Particles/Move/Move";
export * from "./Options/Classes/Particles/Move/MoveAngle";
export * from "./Options/Classes/Particles/Move/MoveGravity";
export * from "./Options/Classes/Particles/Move/OutModes";
export * from "./Options/Classes/Particles/Move/Path/MovePath";
export * from "./Options/Classes/Particles/Move/Path/MovePathDelay";
export * from "./Options/Classes/Particles/Move/Spin";
export * from "./Options/Classes/Particles/Move/MoveTrail";
export * from "./Options/Classes/Particles/Number/ParticlesNumber";
export * from "./Options/Classes/Particles/Number/ParticlesDensity";
export * from "./Options/Classes/Particles/Opacity/Opacity";
export * from "./Options/Classes/Particles/Opacity/OpacityAnimation";
export * from "./Options/Classes/Particles/Repulse/ParticlesRepulse";
export * from "./Options/Classes/Particles/Rotate/Rotate";
export * from "./Options/Classes/Particles/Rotate/RotateAnimation";
export * from "./Options/Classes/Particles/Shape/Shape";
export * from "./Options/Classes/Particles/Size/Size";
export * from "./Options/Classes/Particles/Size/SizeAnimation";
export * from "./Options/Classes/Particles/ZIndex/ZIndex";
export * from "./Options/Classes/Responsive";
export * from "./Options/Classes/Theme/Theme";
export * from "./Options/Classes/Theme/ThemeDefault";
export * from "./Options/Classes/ValueWithRandom";
export * from "./Utils/CanvasUtils";
export * from "./Utils/ColorUtils";
export * from "./Utils/HslColorManager";
export * from "./Utils/NumberUtils";
export * from "./Utils/OptionsUtils";
export * from "./Utils/RgbColorManager";
export * from "./Utils/Utils";
export { tsParticles };

/**
 * tsParticles source options alias type, supporting partial objects
 */
export type ISourceOptions = RecursivePartial<IOptions>;
