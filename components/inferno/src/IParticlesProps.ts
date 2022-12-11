import type { RefObject } from "inferno";
import type { Container, ISourceOptions, Engine } from "tsparticles-engine";

export interface IParticlesProps {
	id?: string;
	width?: string;
	height?: string;
	options?: ISourceOptions;
	url?: string;
	params?: ISourceOptions;
	style?: Record<string, unknown>;
	className?: string;
	canvasClassName?: string;
	container?: RefObject<Container>;
	init?: (engine: Engine) => Promise<void>;
	loaded?: (container: Container) => Promise<void>;
}
