import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IShapeDrawerData } from "../../Interfaces/IShapeDrawerData";
import { GenericDrawerData } from "./Parameters/GenericDrawerData";

export class HeartDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, data: IShapeDrawerData): void {
        const x = -data.radius / 2;
        const y = -data.radius / 2;

        context.moveTo(x, y + data.radius / 4);
        context.quadraticCurveTo(x, y, x + data.radius / 4, y);
        context.quadraticCurveTo(x + data.radius / 2, y, x + data.radius / 2, y + data.radius / 4);
        context.quadraticCurveTo(x + data.radius / 2, y, x + data.radius * 3 / 4, y);
        context.quadraticCurveTo(x + data.radius, y, x + data.radius, y + data.radius / 4);
        context.quadraticCurveTo(x + data.radius, y + data.radius / 2, x + data.radius * 3 / 4, y + data.radius * 3 / 4);
        context.lineTo(x + data.radius / 2, y + data.radius);
        context.lineTo(x + data.radius / 4, y + data.radius * 3 / 4);
        context.quadraticCurveTo(x, y + data.radius / 2, x, y + data.radius / 4);
    }

    public createData(): IShapeDrawerData {
        return new GenericDrawerData();
    }
}
