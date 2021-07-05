/**
 * @category Options
 */
export interface IPush {
    /**
     * @deprecated use the new quantity instead
     */
    particles_nb: number;

    default: boolean;
    groups: string[];
    quantity: number;
}
