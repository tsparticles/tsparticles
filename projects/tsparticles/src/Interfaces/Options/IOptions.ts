import { IOptions as ICoreOptions } from "../../Options/Interfaces/IOptions";
import { IPolygonMaskOptions } from "../../Plugins/PolygonMask/PolygonMaskPlugin";
import { IEmitterOptions } from "../../Plugins/Emitters/EmittersPlugin";
import { IAbsorberOptions } from "../../Plugins/Absorbers/AbsorbersPlugin";

export type IOptions = ICoreOptions & IAbsorberOptions & IEmitterOptions & IPolygonMaskOptions;
