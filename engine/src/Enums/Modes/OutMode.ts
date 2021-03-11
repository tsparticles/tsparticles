/**
 * @category Enums
 */
export enum OutMode {
    /**
     * @deprecated This property is now obsolete, since every side can have a different out mode
     */
    bounceHorizontal = "bounce-horizontal",

    /**
     * @deprecated This property is now obsolete, since every side can have a different out mode
     */
    bounceVertical = "bounce-vertical",

    bounce = "bounce",
    destroy = "destroy",
    none = "none",
    out = "out",
    split = "split",
}

/**
 * @deprecated This type is now obsolete, since every side can have a different out mode
 */
export type OutModeAlt = "bounce-horizontal" | "bounce-vertical";
