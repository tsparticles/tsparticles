import {Container} from "../Classes/Container";
import {Options} from "../Classes/Options/Options";

export interface IParticlesJs {
    (tagId: string, params: Options): Container;

    load?: (tagId: string, pathConfigJson: string, callback: (container: Container) => void) => void;
    setOnClickHandler?: (callback: EventListenerOrEventListenerObject) => void;
}
