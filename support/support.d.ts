import {IOptions} from "../src/Interfaces/IOptions";
import {Container} from "../src/Classes/Container";

declare class ParticlesJS {
    public static load(tagId: string, params: IOptions): Container;

    public static loadJson(tagId: string, pathConfigJson: string, callback: ((container: Container) => void)): void;

    public static setOnClickHandler(callback: EventListenerOrEventListenerObject): void;
}
