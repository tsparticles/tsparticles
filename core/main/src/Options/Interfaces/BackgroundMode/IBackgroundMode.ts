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
