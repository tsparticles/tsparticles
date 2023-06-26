import type { DisposalMethod } from "../Enums/DisposalMethod";
import type { IRgb } from "tsparticles-engine";
import type { PlainTextData } from "./PlainTextData";

export interface Frame {
    /**
     * _reserved for future use_ (from packed field in graphics control extension block)
     */
    GCreserved: number;

    /**
     * the bitmap data of this frame
     */
    bitmap?: ImageBitmap;

    /**
     * the delay of this frame in milliseconds
     */
    delayTime: number;

    /**
     * disposal method see {@link DisposalMethod}
     */
    disposalMethod: DisposalMethod;

    /**
     * the height of this frame in pixels
     */
    height: number;

    /**
     * this frames image data
     */
    image: ImageData;

    /**
     * the position of the left edge of this frame, in pixels, within the gif (from the left edge)
     */
    left: number;

    /**
     * the local color table for this frame
     */
    localColorTable: IRgb[];

    /**
     * the text that will be displayed on screen with this frame (if not null)
     */
    plainTextData: PlainTextData | null;

    /**
     * _reserved for future use_ (from packed field in image descriptor block)
     */
    reserved: number;

    /**
     * if the colors in the local color table are ordered after decreasing importance
     */
    sortFlag: boolean;

    /**
     * the position of the top edge of this frame, in pixels, within the gif (from the top edge)
     */
    top: number;

    /**
     * if set waits for user input before rendering the next frame (timeout after delay if that is non-zero)
     */
    userInputDelayFlag: boolean;

    /**
     * the width of this frame in pixels
     */
    width: number;
}
