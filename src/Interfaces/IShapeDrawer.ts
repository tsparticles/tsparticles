import type { IShapeDrawerData } from "./IShapeDrawerData";

export interface IShapeDrawer {
    draw(context: CanvasRenderingContext2D, data: IShapeDrawerData): void;
    
    createData(): IShapeDrawerData;
}
