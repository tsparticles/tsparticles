import type { RefObject } from "inferno";
import type { Container, ISourceOptions, Main } from "tsparticles-engine";

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
	loaded?: (container: Container) => void;
}
