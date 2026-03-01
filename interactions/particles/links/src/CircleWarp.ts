import { Circle, type ICoordinates, type IDimension, Rectangle } from "@tsparticles/engine";

/**
 * Specialized Circle for Warp effect, checks for points across canvas edges
 */
export class CircleWarp extends Circle {
  constructor(
    x: number,
    y: number,
    radius: number,
    private readonly canvasSize: IDimension,
  ) {
    super(x, y, radius);
  }

  /**
   * Check if point is inside the range, considering canvas wrapping
   * @param point - the point to check
   * @returns true if point is inside the range, false otherwise
   */
  override contains(point: ICoordinates): boolean {
    if (super.contains(point)) return true;

    const { width, height } = this.canvasSize,
      { x, y } = point;

    /* Check phantom positions in all neighboring virtual sectors */
    return (
      super.contains({ x: x - width, y }) ||
      super.contains({ x: x + width, y }) ||
      super.contains({ x, y: y - height }) ||
      super.contains({ x, y: y + height }) ||
      super.contains({ x: x - width, y: y - height }) ||
      super.contains({ x: x + width, y: y + height }) ||
      super.contains({ x: x - width, y: y + height }) ||
      super.contains({ x: x + width, y: y - height })
    );
  }

  /**
   * Check if range intersects, considering wrap
   * @param range - the range to check (Rectangle or Circle)
   * @returns true if range intersects, false otherwise
   */
  override intersects(range: Rectangle | Circle): boolean {
    if (super.intersects(range)) return true;

    const { width, height } = this.canvasSize,
      pos = range.position,
      /* Define potential shift offsets for warp checking */
      shifts = [
        { x: -width, y: 0 },
        { x: width, y: 0 },
        { x: 0, y: -height },
        { x: 0, y: height },
        { x: -width, y: -height },
        { x: width, y: height },
        { x: -width, y: height },
        { x: width, y: -height },
      ];

    /* Iterate through shifts and create proper class instances to preserve prototypes */
    for (const shift of shifts) {
      const shiftedPos = { x: pos.x + shift.x, y: pos.y + shift.y };

      let shiftedRange: Rectangle | Circle;

      if (range instanceof Circle) {
        /* Instantiate a proper Circle if range is a Circle */
        shiftedRange = new Circle(shiftedPos.x, shiftedPos.y, range.radius);
      } else {
        /* Instantiate a proper Rectangle if range is a Rectangle */
        const rect = range;

        shiftedRange = new Rectangle(shiftedPos.x, shiftedPos.y, rect.size.width, rect.size.height);
      }

      if (super.intersects(shiftedRange)) return true;
    }

    return false;
  }
}
