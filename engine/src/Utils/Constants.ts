/**
 * Project's constants
 * @category Utils
 */
export class Constants {
    /**
     * Particles canvas element class name
     */
    static readonly canvasClass: string = "tsparticles-canvas-el";

    static readonly randomColorValue: string = "random";
    static readonly midColorValue: string = "mid";

    static readonly touchEndEvent: string = "touchend";
    static readonly mouseDownEvent: string = "mousedown";
    static readonly mouseUpEvent: string = "mouseup";
    static readonly mouseMoveEvent: string = "mousemove";
    static readonly touchStartEvent: string = "touchstart";
    static readonly touchMoveEvent: string = "touchmove";
    static readonly mouseLeaveEvent: string = "mouseleave";
    static readonly mouseOutEvent: string = "mouseout";
    static readonly touchCancelEvent: string = "touchcancel";
    static readonly resizeEvent: string = "resize";
    static readonly visibilityChangeEvent: string = "visibilitychange";

    static readonly noPolygonDataLoaded: string = "No polygon data loaded.";
    static readonly noPolygonFound: string = "No polygon found, you need to specify SVG url in config.";
}
