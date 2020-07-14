<template>
    <div :id="id"></div>
</template>

<script lang="ts">
    import { Component, Prop } from "vue-property-decorator";
    import { tsParticles } from "tsparticles";
    import { Container } from "tsparticles/dist/Core/Container";
    import { RecursivePartial } from "tsparticles/dist/Types/RecursivePartial";
    import { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
    import Vue from "vue";

    @Component
    export default class Particles extends Vue {
        @Prop({ required: true }) private id!: string;
        @Prop() private options?: RecursivePartial<IOptions>;
        private particlesContainer?: Container;

        private mounted(): void {
            this.$nextTick(() => {
                if (!this.id) {
                    throw new Error("Prop 'id' is required!")
                }

                tsParticles.load(this.id, this.options ?? {}).then(container => this.particlesContainer = container);
            });
        }

        private beforeDestroy(): void {
            this.particlesContainer?.destroy();
        }
    }
</script>
