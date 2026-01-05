import type { ICoordinates } from "../Interfaces/ICoordinates.js";
import type { IDimension } from "../Interfaces/IDimension.js";
import { RangeType } from "../../Enums/RangeType.js";
import { getDistance } from "../../Utils/NumberUtils.js";
import { squareExp } from "./Constants.js";

/**
 */
export abstract class BaseRange {
    /**
     * Range position
     */
    readonly position: ICoordinates;

    readonly type: string;

    /**
     * Range constructor, initializes the position
     * @param x - X coordinate of the position
     * @param y - Y coordinate of the position
     * @param type - the range type
     * @internal
     */
    protected constructor(x: number, y: number, type: string) {
        this.position = {
            x: x,
            y: y,
        };
        this.type = type;
    }

    /**
     * Check if the point is inside the range
     * @param point - the point to check in the range
     * @returns true or false, checking if the given point is inside the current range
     */
    abstract contains(point: ICoordinates): boolean;

    /**
     * Check if another range intersects with the current one
     * @param range - the range to check the intersection with
     * @returns true or false, checking if the range is intersecting with the current range
     */
    abstract intersects(range: BaseRange): boolean;
}

/**
 */
export class Circle extends BaseRange {
    /**
     * Circle constructor, initialized position and radius
     * @param x - X coordinate of the position
     * @param y - Y coordinate of the position
     * @param radius - Circle's radius
     */
    constructor(
        x: number,
        y: number,
        readonly radius: number,
    ) {
        super(x, y, RangeType.circle);
    }

    /**
     * Check if the given point is inside the circle
     * @param point - the point to check
     * @returns true or false, checking if the given point is inside the circle
     */
    contains(point: ICoordinates): boolean {
        return getDistance(point, this.position) <= this.radius;
    }

    /**
     * Check if the given range intersects the circle
     * @param range - the range to check
     * @returns true or false, checking if the range is intersecting with the circle
     */
    intersects(range: BaseRange): boolean {
        const pos1 = this.position,
            pos2 = range.position,
            distPos = { x: Math.abs(pos2.x - pos1.x), y: Math.abs(pos2.y - pos1.y) },
            r = this.radius;

        if (range instanceof Circle || range.type === (RangeType.circle as string)) {
            const circleRange = range as Circle,
                rSum = r + circleRange.radius,
                dist = Math.sqrt(distPos.x ** squareExp + distPos.y ** squareExp);

            return rSum > dist;
        } else if (range instanceof Rectangle || range.type === (RangeType.rectangle as string)) {
            const rectRange = range as Rectangle,
                { width, height } = rectRange.size,
                edges = Math.pow(distPos.x - width, squareExp) + Math.pow(distPos.y - height, squareExp);

            return (
                edges <= r ** squareExp ||
                (distPos.x <= r + width && distPos.y <= r + height) ||
                distPos.x <= width ||
                distPos.y <= height
            );
        }

        return false;
    }
}

/**
 */
export class Rectangle extends BaseRange {
    /**
     * The rectangle size
     */
    readonly size: IDimension;

    /**
     * The rectangle constructor, initializes position and size
     * @param x - X coordinate of the position
     * @param y - Y coordinate of the position
     * @param width - Rectangle width
     * @param height - Rectangle height
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, RangeType.rectangle);

        this.size = {
            height: height,
            width: width,
        };
    }

    /**
     * Check if the given point is inside the rectangle
     * @param point - the point to check
     * @returns true or false, checking if the given point is inside the rectangle
     */
    contains(point: ICoordinates): boolean {
        const w = this.size.width,
            h = this.size.height,
            pos = this.position;

        return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
    }

    /**
     * Check if another range intersects the rectangle
     * @param range - the range to check
     * @returns true or false, checking if the range is intersecting with the rectangle
     */
    intersects(range: BaseRange): boolean {
        if (range instanceof Circle) {
            return range.intersects(this);
        }

        const w = this.size.width,
            h = this.size.height,
            pos1 = this.position,
            pos2 = range.position,
            size2 = range instanceof Rectangle ? range.size : { width: 0, height: 0 },
            w2 = size2.width,
            h2 = size2.height;

        return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
    }
}
