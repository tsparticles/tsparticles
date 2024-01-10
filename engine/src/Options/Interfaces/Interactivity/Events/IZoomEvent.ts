export interface IZoomEvent {
    /**
     * Enable or disable the zoom event
     */
    enable: boolean;

    /**
     * The maximum zoom level
     */
    max: number;

    /**
     * The minimum zoom level
     */
    min: number;

    /**
     * The sensitivity of the zoom
     */
    sensitivity: number;
}
