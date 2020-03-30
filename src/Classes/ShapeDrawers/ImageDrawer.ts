import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IShapeDrawerData } from "../../Interfaces/IShapeDrawerData";
import { GenericDrawerData } from "./Parameters/GenericDrawerData";

export class ImageDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, data: IShapeDrawerData): void {
        if (!context) {
            return;
        }

        const imgObj = data.particle.image?.data.obj;

        if (!imgObj) {
            return;
        }

        let ratio = 1;

        if (data.particle.image) {
            ratio = data.particle.image.ratio;
        }

        const pos = {
            x: -data.radius,
            y: -data.radius,
        };

        context.drawImage(imgObj, pos.x, pos.y, data.radius * 2, data.radius * 2 / ratio);
    }
    public createData(): IShapeDrawerData {
        return new GenericDrawerData();
    }
}
