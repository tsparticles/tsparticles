/**
 * Project's constants
 */
export class Constants {
    /**
     * Particles canvas element class name
     */
    public static readonly canvasClass: string = "tsparticles-canvas-el";

    public static readonly randomColorValue: string = "random";
    public static readonly midColorValue: string = "mid";

    public static readonly touchEndEvent: string = "touchend";
    public static readonly mouseUpEvent: string = "mouseup";
    public static readonly mouseMoveEvent: string = "mousemove";
    public static readonly touchStartEvent: string = "touchstart";
    public static readonly touchMoveEvent: string = "touchmove";
    public static readonly mouseLeaveEvent: string = "mouseleave";
    public static readonly touchCancelEvent: string = "touchcancel";
    public static readonly resizeEvent: string = "resize";
    public static readonly visibilityChangeEvent: string = "visibilitychange";

    public static readonly noPolygonDataLoaded: string = "No polygon data loaded.";
    public static readonly noPolygonFound: string = "No polygon found, you need to specify SVG url in config.";
}
