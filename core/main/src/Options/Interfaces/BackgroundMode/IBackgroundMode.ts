/**
 * The options to set the particles in the background using CSS `fixed` position
 * The [[zIndex]] property sets the background CSS `z-index` property
 * [[include:Options/BackgroundMode.md]]
 * @category Options
 */
export interface IBackgroundMode {
    /**
     * Sets the animated background mode for particles canvas bringing it to the back
     */
    enable: boolean;

    /**
     * Sets canvas z-index property, if -1, the default value, the interactivity options needs `window` value to work
     */
    zIndex: number;
}
