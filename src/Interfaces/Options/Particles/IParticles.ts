import type { IShape } from "./Shape/IShape";
import type { IColor } from "./IColor";
import type { ILineLinked } from "./LineLinked/ILineLinked";
import type { IMove } from "./IMove";
import type { IParticlesNumber } from "./IParticlesNumber";
import type { IOpacity } from "./Opacity/IOpacity";
import type { ISize } from "./Size/ISize";
import type { IOptionLoader } from "../IOptionLoader";
import type { IRotate } from "./Rotate/IRotate";
import type { IShadow } from "./IShadow";
import type { SingleOrMultiple } from "../../../Types/SingleOrMultiple";
import type { IStroke } from "./IStroke";
import type { IEmitter } from "./Emitters/IEmitter";

export interface IParticles extends IOptionLoader<IParticles> {
	color: SingleOrMultiple<IColor>;

	/**
	 * @deprecated use the new lineLinked instead
	 */
	line_linked: ILineLinked;

	emitter: SingleOrMultiple<IEmitter>;
	lineLinked: ILineLinked;
	move: IMove;
	number: IParticlesNumber;
	opacity: IOpacity;
	rotate: IRotate;
	shadow: IShadow;
	shape: IShape;
	size: ISize;
	stroke: SingleOrMultiple<IStroke>;
}
