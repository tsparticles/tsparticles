import {ClickMode} from "../../../Enums/ClickMode";
import {HoverMode} from "../../../Enums/HoverMode";
import {DivMode} from "../../../Enums/DivMode";

export interface IOptionsInteractivityEvents {
    onclick: {
        enable: boolean;
        mode: ClickMode | ClickMode[];
    };
    onhover: {
        enable: boolean;
        mode: HoverMode | HoverMode[];
        parallax: {
            enable: boolean;
            force: number;
            smooth: number;
        };
    };
    ondiv: {
        enable: boolean;
        mode: DivMode | DivMode[];
        el: string;
    };
    resize: boolean;
}
