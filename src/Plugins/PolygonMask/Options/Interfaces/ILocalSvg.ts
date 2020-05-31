import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IDimension } from "../../../../Core/Interfaces/IDimension";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";

export interface ILocalSvg extends IOptionLoader<ILocalSvg> {
    path: SingleOrMultiple<string>;
    size: IDimension;
}
