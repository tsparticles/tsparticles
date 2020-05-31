import type { Type } from "../../Enums/Type";
import type { IDraw } from "./IDraw";
import type { IMove } from "./IMove";
import type { InlineArrangement } from "../../Enums/InlineArrangement";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { IInline } from "./IInline";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import { ILocalSvg } from "./ILocalSvg";

export interface IPolygonMask extends IOptionLoader<IPolygonMask> {
    draw: IDraw;
    enable: boolean;
    inline: IInline;

    /**
     * @deprecated the inlineArrangement is deprecated, please use the new inline.arrangement property
     */
    inlineArrangement: InlineArrangement;

    move: IMove;
    position?: ICoordinates;
    scale: number;
    type: Type;
    url?: string;
    data?: string | ILocalSvg;
}
