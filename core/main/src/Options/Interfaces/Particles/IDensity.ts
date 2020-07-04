export interface IDensity {
    area: number;
    enable: boolean;
    factor: number;

    /**
     * @deprecated use the new area instead
     */
    value_area: number;
}
