import type { IShapeDrawerData } from "../../../Interfaces/IShapeDrawerData";
import type { IParticle } from "../../../Interfaces/IParticle";

export class GenericDrawerData implements IShapeDrawerData {
    public particle!: IParticle;
    public radius!: number;
}
