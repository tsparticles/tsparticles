export enum LimitMode {
    /**
     * When limit is reached, older particles are removed
     */
    delete = "delete",

    /**
     * When limit is reached, particles stop spawning
     */
    wait = "wait",
}
