import {Container} from '../../../src/Classes/Container';
import {RecursivePartial} from '../../../src/Types/RecursivePartial';
import {IOptions} from '../../../src/Interfaces/Options/IOptions';

export class TestContainer {
    public container: Container;
    public id: string;
    public options?: RecursivePartial<IOptions>;

    /**
     * This class provides a quick way to access a new container so we can reset the container
     * after each test.
     * @param options the options to initialize the canvas with
     */
    constructor(options?: RecursivePartial<IOptions>) {
        this.id = 'test-container';
        this.options = options;
        this.container = new Container(this.id, this.options);
    }

    /**
     * Reset the container. If [[options]] is provided, these will be stored and used to create
     * the new container. If [[options]] is not provided, the most recent set of options will be
     * used.
     * @param options 
     */
    public reset(options?: RecursivePartial<IOptions>) {
        if(options) {
            this.options = options;
        }
        this.container = new Container(this.id, this.options);
    }
}