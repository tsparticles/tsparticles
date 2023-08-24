import type { IDimension } from "@tsparticles/engine";

export interface PlainTextData {
    /**
     * the index into the global color table for the background color of the text
     */
    backgroundColor: number;

    /**
     * the size (in pixels) of each cell (character) in text grid
     */
    charSize: IDimension;

    /**
     * the index into the global color table for the foreground color of the text
     */
    foregroundColor: number;

    /**
     * the height of the text grid (in pixels)
     */
    height: number;

    /**
     * the position of the left edge of text grid (in pixels) within the GIF (from the left edge)
     */
    left: number;

    /**
     * the text to render on screen
     */
    text: string;

    /**
     * the position of the top edge of text grid (in pixels) within the GIF (from the top edge)
     */
    top: number;

    /**
     * the width of the text grid (in pixels)
     */
    width: number;
}
