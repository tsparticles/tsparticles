/** Rectangle side collision result */
export interface IRectSideResult {
  /** Whether the particle bounced on this side */
  bounced: boolean;

  /** Bounce position offset */
  position?: number;

  /** Resulting velocity after bounce */
  velocity?: number;
}
