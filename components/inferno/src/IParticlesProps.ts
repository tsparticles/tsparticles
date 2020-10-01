import type { RefObject } from "inferno";
import type { Container, RecursivePartial, IOptions } from "tsparticles";

export interface IParticlesProps {
	id: string;
	width: string;
	height: string;
	options: RecursivePartial<IOptions>;
	params?: RecursivePartial<IOptions>;
	style: CSSProperties;
	className?: string;
	canvasClassName?: string;
	container?: RefObject<Container>;
}
