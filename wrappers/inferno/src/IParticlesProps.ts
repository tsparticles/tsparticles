import type { Container, ISourceOptions } from "@tsparticles/engine";

export interface IParticlesProps {
	id?: string;
	width?: string;
	height?: string;
	options?: ISourceOptions;
	url?: string;
	params?: ISourceOptions;
	className?: string;
	canvasClassName?: string;
	style?: Record<string, unknown>;
	// Use a minimal ref-like shape to avoid depending on Inferno's
	// DOM/ref types in this package. Consumers can pass a ref-like
	// object with a `current` property.
	container?: { current?: Container };
	loaded?: (container?: Container) => Promise<void> | void;
	// alternative name used by other wrappers
	particlesLoaded?: (container?: Container) => Promise<void> | void;
	theme?: string;
}
