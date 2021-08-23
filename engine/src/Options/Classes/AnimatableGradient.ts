import type { IAnimatableGradient } from "../Interfaces/IAnimatableGradient";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import { GradientType, RotateDirection, RotateDirectionAlt, StartValueType } from "../../Enums";
import type { IGradientAngle, IGradientColorOpacity } from "../../Core/Interfaces";
import type { IAnimatable } from "../Interfaces/IAnimatable";
import type { IAnimation } from "../Interfaces/IAnimation";
import type { RangeValue, RecursivePartial } from "../../Types";
import type { IAnimatableGradientColor, IGradientColorOpacityAnimation } from "../Interfaces/IOptionsGradient";
import { AnimatableColor } from "./AnimatableColor";
import { setRangeValue } from "../../Utils";

export class AnimatableGradient implements IAnimatableGradient, IOptionLoader<IAnimatableGradient> {
    angle: GradientAngle;
    colors: AnimatableGradientColor[];
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

        if (data.colors !== undefined) {
            this.colors = data.colors.map((s) => {
                const tmp = new AnimatableGradientColor();

                tmp.load(s);

                return tmp;
            });
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
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;

    constructor() {
        this.value = 0;
        this.animation = new GradientAngleAnimation();
        this.direction = RotateDirection.clockwise;
    }

    load(data?: RecursivePartial<IGradientAngle & IAnimatable<IAnimation>>): void {
        if (!data) {
            return;
        }

        this.animation.load(data.animation);

        if (data.value !== undefined) {
            this.value = data.value;
        }

        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
    }
}

export class GradientColorOpacity
    implements
        IGradientColorOpacity,
        IAnimatable<GradientColorOpacityAnimation>,
        IOptionLoader<IGradientColorOpacity & IAnimatable<IGradientColorOpacityAnimation>>
{
    animation;
    value: RangeValue;

    constructor() {
        this.value = 0;
        this.animation = new GradientColorOpacityAnimation();
    }

    load(data?: RecursivePartial<IGradientColorOpacity & IAnimatable<IAnimation>>): void {
        if (!data) {
            return;
        }

        this.animation.load(data.animation);

        if (data.value !== undefined) {
            this.value = setRangeValue(data.value);
        }
    }
}

export class AnimatableGradientColor implements IAnimatableGradientColor, IOptionLoader<IAnimatableGradientColor> {
    stop;
    value;
    opacity?: GradientColorOpacity;

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

        if (data.opacity !== undefined) {
            this.opacity = new GradientColorOpacity();

            if (typeof data.opacity === "number") {
                this.opacity.value = data.opacity;
            } else {
                this.opacity.load(data.opacity);
            }
        }
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

export class GradientColorOpacityAnimation
    implements IGradientColorOpacityAnimation, IOptionLoader<IGradientColorOpacityAnimation>
{
    count;
    enable;
    speed;
    sync;
    startValue: StartValueType | keyof typeof StartValueType;

    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 0;
        this.sync = false;
        this.startValue = StartValueType.random;
    }

    load(data?: RecursivePartial<IGradientColorOpacityAnimation>): void {
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

        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
    }
}
