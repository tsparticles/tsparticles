import type { IPolygonMask } from "../../../Interfaces/Options/PolygonMask/IPolygonMask";
import { PolygonMaskType } from "../../../Enums/PolygonMaskType";
import { Draw } from "./Draw";
import { Move } from "./Move";
import { PolygonMaskInlineArrangement } from "../../../Enums/PolygonMaskInlineArrangement";
import { PolygonInline } from "./PolygonInline";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { ICoordinates } from "../../../Interfaces/ICoordinates";

export class PolygonMask implements IPolygonMask {
    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    get inlineArrangement(): PolygonMaskInlineArrangement {
        return this.inline.arrangement;
    }

    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    set inlineArrangement(value: PolygonMaskInlineArrangement) {
        this.inline.arrangement = value;
    }

    public draw: Draw;
    public enable: boolean;
    public inline: PolygonInline;
    public move: Move;
    public position?: ICoordinates;
    public scale: number;
    public type: PolygonMaskType;
    public url: string;

    constructor() {
        this.draw = new Draw();
        this.enable = false;
        this.inline = new PolygonInline();
        this.move = new Move();
        this.scale = 1;
        this.type = PolygonMaskType.none;
        this.url = "";
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
                this.enable = this.type !== PolygonMaskType.none;
            }

            if (data.url !== undefined) {
                this.url = data.url;
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
