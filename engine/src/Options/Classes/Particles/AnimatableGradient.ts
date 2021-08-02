import type { IAnimatableGradient } from "../../Interfaces/IAnimatableGradient";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { GradientType } from "../../../Core/Interfaces";
import type { IGradientAngle } from "../../../Core/Interfaces";
import type { IAnimatable } from "../../Interfaces/IAnimatable";
import type { IAnimation } from "../../Interfaces/IAnimation";
import type { RecursivePartial, SingleOrMultiple } from "../../../Types";
import type { IAnimatableGradientColor } from "../../Interfaces/IOptionsGradient";
import { AnimatableColor } from "./AnimatableColor";

export class AnimatableGradient implements IAnimatableGradient, IOptionLoader<IAnimatableGradient> {
    angle: GradientAngle;
    colors: SingleOrMultiple<AnimatableGradientColor>;
    type: GradientType;

    constructor() {
        this.angle = new GradientAngle();
        this.colors = [];
        this.type = GradientType.random;
    }

    load(data?: RecursivePartial<IAnimatableGradient>): void {
        if (!data) {
            return;
        }

        this.angle.load(data.angle);

        if (data.colors instanceof Array) {
            this.colors = data.colors.map((s) => {
                const tmp = new AnimatableGradientColor();

                tmp.load(s);

                return tmp;
            });
        } else {
            if (this.colors instanceof Array) {
                this.colors = new AnimatableGradientColor();
            }

            this.colors.load(data.colors as RecursivePartial<IAnimatableGradientColor | undefined> | undefined);
        }

        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}

export class GradientAngle
    implements IGradientAngle, IAnimatable<IAnimation>, IOptionLoader<IGradientAngle & IAnimatable<IAnimation>>
{
    animation;
    value;

    constructor() {
        this.value = 0;
        this.animation = new GradientAngleAnimation();
    }

    load(data?: RecursivePartial<IGradientAngle & IAnimatable<IAnimation>>): void {
        if (!data) {
            return;
        }

        this.animation.load(data.animation);

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}

export class AnimatableGradientColor implements IAnimatableGradientColor, IOptionLoader<IAnimatableGradientColor> {
    stop;
    value;

    constructor() {
        this.stop = 0;
        this.value = new AnimatableColor();
    }

    load(data?: RecursivePartial<IAnimatableGradientColor>): void {
        if (!data) {
            return;
        }

        if (data.stop !== undefined) {
            this.stop = data.stop;
        }

        this.value = AnimatableColor.create(this.value, data.value);
    }
}

export class GradientAngleAnimation implements IAnimation, IOptionLoader<IAnimation> {
    count;
    enable;
    speed;
    sync;

    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 0;
        this.sync = false;
    }

    load(data?: RecursivePartial<IAnimation>): void {
        if (!data) {
            return;
        }

        if (data.count !== undefined) {
            this.count = data.count;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
