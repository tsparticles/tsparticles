/**
 * Project's constants
 * @category Utils
 */
export class Constants {
    /**
     * Particles canvas element class name
     */
    static readonly canvasClass = "tsparticles-canvas-el";

    static readonly randomColorValue = "random";
    static readonly midColorValue = "mid";

    static readonly touchEndEvent = "touchend";
    static readonly mouseDownEvent = "mousedown";
    static readonly mouseUpEvent = "mouseup";
    static readonly mouseMoveEvent = "mousemove";
    static readonly touchStartEvent = "touchstart";
    static readonly touchMoveEvent = "touchmove";
    static readonly mouseLeaveEvent = "mouseleave";
    static readonly mouseOutEvent = "mouseout";
    static readonly touchCancelEvent = "touchcancel";
    static readonly resizeEvent = "resize";
    static readonly visibilityChangeEvent = "visibilitychange";
    static readonly wheelEvent = "wheel";

    static readonly noPolygonDataLoaded = "No polygon data loaded.";
    static readonly noPolygonFound = "No polygon found, you need to specify SVG url in config.";
}
