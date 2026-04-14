import type { RefObject } from "inferno";
import type { Container, ISourceOptions } from "@tsparticles/engine";

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
	loaded?: (container: Container) => Promise<void>;
}
