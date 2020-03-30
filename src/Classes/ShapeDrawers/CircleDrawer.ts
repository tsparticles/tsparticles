import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IShapeDrawerData } from "../../Interfaces/IShapeDrawerData";
import { GenericDrawerData } from "./Parameters/GenericDrawerData";

export class CircleDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, data: IShapeDrawerData): void {
        context.arc(0, 0, data.radius, 0, Math.PI * 2, false);
    }

    public createData(): IShapeDrawerData {
        return new GenericDrawerData();
    }
}
