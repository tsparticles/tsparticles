import { tsParticles, Container } from "tsparticles-engine";
import type { IParticlesProps } from "./IParticlesProps";
import {
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
	onMount,
	JSX,
} from "solid-js";

interface MutableRefObject<T> {
	current: T | null;
}

/**
 * @param (props:IParticlesProps) Particles component properties
 */
const Particles = (props: IParticlesProps): JSX.Element => {
	const [init, setInit] = createSignal(false);

	try {
		const id = props.id ?? "tsparticles";
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

		onMount(() => {
			if (props.init) {
				console.log("props.init present");

				props.init(tsParticles).then(() => {
					console.log("then init");

					setInit(true);
				});
			} else {
				setInit(true);
			}
		});

		createEffect(async () => {
			if (!init()) {
				console.log("not initialized");

				return;
			}

			let container = tsParticles.dom().find((t) => t.id === containerId());

			container?.destroy();

			if (url) {
				container = await tsParticles.loadJSON(id, url);
			} else {
				container = await tsParticles.load(id, options());
			}

			cb(container);
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
