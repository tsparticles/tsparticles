import { tsParticles, Container } from "tsparticles";
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

		const [init, setInit] = createSignal(!props.init);

		if (props.init && !init()) {
			props.init(tsParticles).then(() => {
				setInit(true);
			});
		}

		const options = createMemo(() => props.params ?? props.options ?? {});

		const refContainer = props.container as MutableRefObject<
			Container | undefined
		>;
		const { className, canvasClassName, loaded, url, width, height } = props;
		const [containerId, setContainerId] = createSignal(
			undefined as string | undefined
		);

		const cb = async (container?: Container) => {
			if (refContainer) {
				refContainer.current = container;
			}

			setContainerId(container?.id);

			if (loaded && container) {
				await loaded(container);
			}
		};

		createEffect(async () => {
			if (!init()) {
				return;
			}

			const container = tsParticles.dom().find((t) => t.id === containerId());

			container?.destroy();

			const newContainer = url
				? await tsParticles.loadJSON(id, url)
				: await tsParticles.load(id, options());

			await cb(newContainer);
		});

		onCleanup(() => {
			if (!init()) {
				return;
			}

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
		console.log(e);

		return <div />;
	}
};

export default Particles;
