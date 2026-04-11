import { tsParticles } from "@tsparticles/engine";
import { createEffect, createResource, JSX, mergeProps, on, onCleanup, onMount } from "solid-js";
import type { IParticlesProps } from "./IParticlesProps";

/**
 * @param (props:IParticlesProps) Particles component properties
 */
const Particles = (props: IParticlesProps): JSX.Element => {
    const config = mergeProps({ id: "tsparticles" }, props);

    onMount(() => {
        const [container] = createResource(
            () => ({
                id: config.id,
                options: config.params ?? config.options ?? {},
                url: config.url,
            }),
            data => tsParticles.load(data),
        );

        createEffect(
            on(container, container => {
                if (!container) return;
                config.particlesLoaded?.(container);
                onCleanup(() => container.destroy());
            }),
        );
    });

    return (
        <div class={config.class} id={config.id}>
            <canvas
                class={config.canvasClass}
                style={{
                    ...config.style,
                    width: config.width,
                    height: config.height,
                }}
            />
        </div>
    );
};

export default Particles;
