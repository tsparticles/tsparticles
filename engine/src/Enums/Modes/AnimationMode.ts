/** Animation mode values for particle value animations */
export enum AnimationMode {
  /** Automatically chooses increase or decrease based on start value */
  auto = "auto",
  /** Animates from minimum to maximum value */
  increase = "increase",
  /** Animates from maximum to minimum value */
  decrease = "decrease",
  /** Randomly selects increase or decrease */
  random = "random",
}
