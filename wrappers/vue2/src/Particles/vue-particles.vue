<template>
    <div :id="id"></div>
</template>

<script lang="ts">
import "tslib";
import { Component, Prop } from "vue-property-decorator";
import { type Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import Vue from "vue";
import EventBus from "./event-bus.js";

export type IParticlesProps = ISourceOptions;

async function particlesInit(component: Particles): Promise<void> {
    if (!component.id) {
        throw new Error("Prop 'id' is required!");
    }

    const cb = (container?: Container) => {
        component.container = container;

        if (component.container && component.particlesLoaded) {
            component.particlesLoaded(component.container);
        }
    };

    const container = await tsParticles.load({
        id: component.id,
        options: component.options ?? {},
        url: component.url,
    });

    cb(container);
}

@Component
export default class Particles extends Vue {
    @Prop({ required: true }) id!: string;
    @Prop() options?: IParticlesProps;
    @Prop() url?: string;
    @Prop() particlesLoaded?: (container: Container) => void;
    container?: Container;
    initHandler = async () => {
        await particlesInit(this);
    };

    private created(): void {
        EventBus.$on("particles-init", this.initHandler);
    }

    private mounted(): void {
        this.$nextTick(() => {
            particlesInit(this);
        });
    }

    private beforeDestroy(): void {
        this.container?.destroy();

        EventBus.$off("particles-init", this.initHandler);
    }
}
</script>
