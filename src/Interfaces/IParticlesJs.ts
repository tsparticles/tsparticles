import {IOptions} from "./Options/IOptions";
import {Container} from "../Classes/Container";

export interface IParticlesJs {
    (tagId: string, params: IOptions): Container;

    load?: (tagId: string, pathConfigJson: string, callback: (container: Container) => void) => void;
    setOnClickHandler?: (callback: EventListenerOrEventListenerObject) => void;
}
