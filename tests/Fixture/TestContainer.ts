import { Container } from "../../src/Classes/Container";
import type { IOptions } from "../../src/Interfaces/Options/IOptions";
import { RecursivePartial } from "../../src/Types/RecursivePartial";

export class TestContainer {
    private id: string;
    private params: RecursivePartial<IOptions> | undefined;
    public container: Container;

    constructor(params?: RecursivePartial<IOptions>) {
        this.id = "test-container";
        this.params = params;
        this.container = new Container(this.id, this.params);
    }

    /**
     * Reset the container. If [[params]] is provided, then the new spatial grid will be
     * initialized with this [[params]]. Otherwise the last-used [[params]] will be used.
     * 
     * @param params 
     */
    public reset(params?: RecursivePartial<IOptions>): void {
        if(params !== undefined) {
            this.params = params;
        }
        this.container = new Container(this.id, this.params);
    }
}
