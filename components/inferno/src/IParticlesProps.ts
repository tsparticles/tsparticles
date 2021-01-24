import type { RefObject } from "inferno";
import type { Container, ISourceOptions } from "tsparticles-core";
import type { Main } from "tsparticles-core";

export interface IParticlesProps {
	id?: string;
	width?: string;
	height?: string;
	options?: ISourceOptions;
	url?: string;
	params?: ISourceOptions;
	style?: CSSProperties;
	className?: string;
	canvasClassName?: string;
	container?: RefObject<Container>;
	init?: (tsParticles: Main) => void;
}
