/**
 * @category Options
 */
export interface IRemove {
    /**
     * @deprecated use the new quantity instead
     */
    particles_nb: number;

    default: boolean;
    groups: string[];
    quantity: number;
}
