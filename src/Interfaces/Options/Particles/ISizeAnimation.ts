export interface ISizeAnimation {
    enable: boolean;

    /**
     * @deprecated use the new minimumValue instead
     */
    size_min: number;

    minimumValue: number;
    speed: number;
    sync: boolean;
}
