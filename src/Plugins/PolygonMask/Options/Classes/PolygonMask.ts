import type { IPolygonMask } from "../Interfaces/IPolygonMask";
import { Type } from "../../Enums/Type";
import { Draw } from "./Draw";
import { Move } from "./Move";
import { InlineArrangement } from "../../Enums/InlineArrangement";
import { Inline } from "./Inline";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import { LocalSvg } from "./LocalSvg";

export class PolygonMask implements IPolygonMask {
    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    get inlineArrangement(): InlineArrangement {
        return this.inline.arrangement;
    }

    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    set inlineArrangement(value: InlineArrangement) {
        this.inline.arrangement = value;
    }

    public draw: Draw;
    public enable: boolean;
    public inline: Inline;
    public move: Move;
    public position?: ICoordinates;
    public scale: number;
    public type: Type;
    public url?: string;
    public data?: string | LocalSvg;

    constructor() {
        this.draw = new Draw();
        this.enable = false;
        this.inline = new Inline();
        this.move = new Move();
        this.scale = 1;
        this.type = Type.none;
    }

    public load(data?: RecursivePartial<IPolygonMask>): void {
        if (data !== undefined) {
            this.draw.load(data.draw);

            const inline = data.inline ?? {
                arrangement: data.inlineArrangement,
            };

            if (inline !== undefined) {
                this.inline.load(inline);
            }

            this.move.load(data.move);

            if (data.scale !== undefined) {
                this.scale = data.scale;
            }

            if (data.type !== undefined) {
                this.type = data.type;
            }

            if (data.enable !== undefined) {
                this.enable = data.enable;
            } else {
                this.enable = this.type !== Type.none;
            }

            if (data.url !== undefined) {
                this.url = data.url;
            }

            if (data.data !== undefined) {
                if (typeof data.data === "string") {
                    this.data = data.data;
                } else {
                    this.data = new LocalSvg();

                    this.data.load(data.data);
                }
            }

            if (data.position !== undefined) {
                this.position = {
                    x: data.position.x,
                    y: data.position.y,
                };
            }
        }
    }
}
