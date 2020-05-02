export enum ClickModeEnum {
    bubble = "bubble",
    push = "push",
    remove = "remove",
    repulse = "repulse",
    emitter = "emitter",
    absorber = "absorber",
}

export type ClickMode = ClickModeEnum | string;
