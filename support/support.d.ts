import {IOptions} from "../src/Interfaces/IOptions";
import {Container} from "../src/Classes/Container";

declare class ParticlesJS {
    static load(tagId: string, params: IOptions): Container;

    static loadJson(tagId: string, pathConfigJson: string, callback: ((container: Container) => void)): void;

    static setOnClickHandler(callback: EventListenerOrEventListenerObject): void;
}