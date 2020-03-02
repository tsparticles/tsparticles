import {IOptions} from "./Interfaces/Options/IOptions";
import {Container} from "./Classes/Container";

declare class ParticlesJS {
    /* @deprecated */
    public static load(tagId: string, params: IOptions): Container;

    /* @deprecated */
    public static loadJson(tagId: string, pathConfigJson: string, callback: ((container: Container) => void)): void;

    /* @deprecated */
    public static setOnClickHandler(callback: EventListenerOrEventListenerObject): void;
}
