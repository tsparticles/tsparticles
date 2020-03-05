export interface IOpacityAnimation {
    enable: boolean;
    speed: number;

    /**
     * @deprecated use the new minimumValue instead
     */
    opacity_min: number;

    minimumValue: number;
    sync: boolean;
}
