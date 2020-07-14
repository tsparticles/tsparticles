import type { IDraw } from "./IDraw";
import type { IMove } from "./IMove";
import type { InlineArrangement, InlineArrangementAlt } from "../../Enums";
import type { IInline } from "./IInline";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { ILocalSvg } from "./ILocalSvg";
import { Type } from "../../Enums";

export interface IPolygonMask {
    draw: IDraw;
    enable: boolean;
    inline: IInline;

    /**
     * @deprecated the inlineArrangement is deprecated, please use the new inline.arrangement property
     */
    inlineArrangement: InlineArrangement | keyof typeof InlineArrangement | InlineArrangementAlt;

    move: IMove;
    position?: ICoordinates;
    scale: number;
    type: Type;
    url?: string;
    data?: string | ILocalSvg;
}
