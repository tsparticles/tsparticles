export interface IAnimation {
    count: number;

    /**
     * Enables/disables the animation
     */
    enable: boolean;

    /**
     * Speed animation
     */
    speed: number;

    /**
     * Enables the sync animations for the particles created at the same time
     * pushed or emitter particles will be out of sync
     */
    sync: boolean;
}
