/**
 * Options for the drag interaction mode.
 */
export interface IDrag {
  /**
   * Scaling factor applied to the computed drag velocity when {@link preserveMomentum} is enabled.
   * Higher values result in a faster post-release movement.
   * @defaultValue 0.03
   */
  momentumFactor: number;

  /**
   * When `true`, the particle retains the velocity of the drag gesture on release
   * instead of resuming the velocity it had before being grabbed.
   * @defaultValue false
   */
  preserveMomentum: boolean;
}
