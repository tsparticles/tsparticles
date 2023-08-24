import type { ApplicationExtension } from "./ApplicationExtension";
import type { Frame } from "./Frame";
import type { IRgb } from "@tsparticles/engine";

export interface GIF {
    /**
     * all application extensions found
     */
    applicationExtensions: ApplicationExtension[];

    /**
     * an image filled with the background color (can be used as a background before the first frame) - if the global color table is not available this is transparent black
     */
    backgroundImage: ImageData;

    /**
     * the color depth/resolution in bits per color (in the original) [1-8 bits]
     */
    colorRes: number;

    /**
     * comments in the file and on with frame they where found
     */
    comments: [number, string][];

    /**
     * each frame of the GIF (decoded into single images)
     */
    frames: Frame[];

    /**
     * the global color table for the GIF
     */
    globalColorTable: IRgb[];

    /**
     * the height of the image in pixels (logical screen size)
     */
    height: number;

    /**
     * if non-zero the pixel aspect ratio will be from 4:1 to 1:4 in 1/64th increments
     */
    pixelAspectRatio: number;

    /**
     * if the colors in the global color table are ordered after decreasing importance
     */
    sortFlag: boolean;

    /**
     * the total duration of the gif in milliseconds (all delays added together) - will be `Infinity` if there is a frame with 0 delay
     */
    totalTime: number;

    /**
     * the width of the image in pixels (logical screen size)
     */
    width: number;
}
