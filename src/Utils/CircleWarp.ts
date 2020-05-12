import { Range } from "./Range";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { Rectangle } from "./Rectangle";
import { Circle } from "./Circle";
import type { IDimension } from "../Core/Interfaces/IDimension";

export class CircleWarp extends Circle {
    private readonly canvasSize: IDimension;

    constructor(x: number, y: number, radius: number, canvasSize: IDimension) {
        super(x, y, radius);

        this.canvasSize = {
            height: canvasSize.height,
            width: canvasSize.width,
        };
    }

    public contains(point: ICoordinates): boolean {
        if (super.contains(point)) {
            return true;
        }

        const posNE = {
            x: point.x - this.canvasSize.width,
            y: point.y,
        };

        if (super.contains(posNE)) {
            return true;
        }

        const posSE = {
            x: point.x - this.canvasSize.width,
            y: point.y - this.canvasSize.height,
        };

        if (super.contains(posSE)) {
            return true;
        }

        const posSW = {
            x: point.x,
            y: point.y - this.canvasSize.height,
        };

        return super.contains(posSW);
    }

    public intersects(range: Range): boolean {
        if (super.intersects(range)) {
            return true;
        }

        const rect = range as Rectangle;
        const circle = range as Circle;

        if (circle.radius !== undefined) {
            const posNE = {
                x: circle.position.x - this.canvasSize.width,
                y: circle.position.y,
            };

            const circleNE = new Circle(posNE.x, posNE.y, circle.radius);

            if (super.intersects(circleNE)) {
                return true;
            }

            const posSE = {
                x: circle.position.x - this.canvasSize.width,
                y: circle.position.y - this.canvasSize.height,
            };

            const circleSE = new Circle(posSE.x, posSE.y, circle.radius);

            if (super.intersects(circleSE)) {
                return true;
            }

            const posSW = {
                x: circle.position.x,
                y: circle.position.y - this.canvasSize.height,
            };

            const circleSW = new Circle(posSW.x, posSW.y, circle.radius);

            return super.intersects(circleSW);
        } else if (rect.size !== undefined) {
            const posNE = {
                x: circle.position.x - this.canvasSize.width,
                y: circle.position.y,
            };

            const rectNE = new Rectangle(posNE.x, posNE.y, rect.size.width, rect.size.height);

            if (super.intersects(rectNE)) {
                return true;
            }

            const posSE = {
                x: circle.position.x - this.canvasSize.width,
                y: circle.position.y - this.canvasSize.height,
            };

            const rectSE = new Rectangle(posSE.x, posSE.y, rect.size.width, rect.size.height);

            if (super.intersects(rectSE)) {
                return true;
            }

            const posSW = {
                x: circle.position.x,
                y: circle.position.y - this.canvasSize.height,
            };

            const rectSW = new Rectangle(posSW.x, posSW.y, rect.size.width, rect.size.height);

            return super.intersects(rectSW);
        }

        return false;
    }
}
