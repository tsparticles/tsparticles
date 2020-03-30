import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IShapeDrawerData } from "../../Interfaces/IShapeDrawerData";
import { GenericDrawerData } from "./Parameters/GenericDrawerData";

export class LineDrawer implements IShapeDrawer {
    public createData(): IShapeDrawerData {
        return new GenericDrawerData();
    }

    public draw(context: CanvasRenderingContext2D, data: IShapeDrawerData): void {
        context.moveTo(0, -data.radius / 2);
        context.lineTo(0, data.radius / 2);
    }
}
