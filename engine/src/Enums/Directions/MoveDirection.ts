/** Move direction values for particles */
export enum MoveDirection {
  /** Move towards the bottom */
  bottom = "bottom",
  /** Move towards the bottom-left */
  bottomLeft = "bottom-left",
  /** Move towards the bottom-right */
  bottomRight = "bottom-right",
  /** Move towards the left */
  left = "left",
  /** No movement */
  none = "none",
  /** Move towards the right */
  right = "right",
  /** Move towards the top */
  top = "top",
  /** Move towards the top-left */
  topLeft = "top-left",
  /** Move towards the top-right */
  topRight = "top-right",
  /** Move outside the canvas */
  outside = "outside",
  /** Move inside the canvas */
  inside = "inside",
}

/** Alternative move direction type as a string literal union */
export type MoveDirectionAlt = "bottom-left" | "bottom-right" | "top-left" | "top-right";
