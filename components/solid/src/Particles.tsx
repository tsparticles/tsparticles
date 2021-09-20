import { tsParticles, Container } from "tsparticles-engine";
import type { IParticlesProps } from "./IParticlesProps";
import {
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
	JSX,
} from "solid-js";

interface MutableRefObject<T> {
	current: T | null;
}

/**
 * @param (props:IParticlesProps) Particles component properties
 */
const Particles = (props: IParticlesProps): JSX.Element => {
	try {
		const id = props.id ?? "tsparticles";

		if (props.init) {
			props.init(tsParticles);
		}

		const options = createMemo(() => props.params ?? props.options ?? {});

		const refContainer = props.container as MutableRefObject<
			Container | undefined
		>;
		const { className, canvasClassName, loaded, url, width, height } = props;
		const [containerId, setContainerId] = createSignal(
			undefined as string | undefined
		);

		const cb = (container?: Container) => {
			if (refContainer) {
				refContainer.current = container;
			}

			setContainerId(container?.id);

			if (loaded && container) {
				loaded(container);
			}
		};

		createEffect(() => {
			const container = tsParticles.dom().find((t) => t.id === containerId());

			container?.destroy();

			if (url) {
				tsParticles.loadJSON(id, url).then(cb);
			} else {
				tsParticles.load(id, options()).then(cb);
			}
		});

		onCleanup(() => {
			const container = tsParticles.dom().find((t) => t.id === containerId());

			container?.destroy();

			setContainerId(undefined);
		});

		return (
			<div className={className ?? ""} id={id}>
				<canvas
					className={canvasClassName ?? ""}
					style={{
						...props.style,
						width,
						height,
					}}
				/>
			</div>
		);
	} catch (e) {
		return <div></div>;
	}
};

export default Particles;
