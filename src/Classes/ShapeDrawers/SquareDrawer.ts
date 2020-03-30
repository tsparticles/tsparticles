import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IShapeDrawerData } from "../../Interfaces/IShapeDrawerData";
import { GenericDrawerData } from "./Parameters/GenericDrawerData";

export class SquareDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, data: IShapeDrawerData): void {
        context.rect(-data.radius, -data.radius, data.radius * 2, data.radius * 2);
    }

    public createData(): IShapeDrawerData {
        return new GenericDrawerData();
    }
}
