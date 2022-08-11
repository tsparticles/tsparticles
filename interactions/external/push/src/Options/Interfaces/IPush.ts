/**
 * @category Options
 */
export interface IPush {
    default: boolean;
    groups: string[];

    /**
     * @deprecated use the new quantity instead
     */
    particles_nb: number;

    quantity: number;
}
