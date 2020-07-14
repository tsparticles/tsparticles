import { Container } from "./Container";
import type { IOptions } from "../Options/Interfaces/IOptions";
import type { RecursivePartial } from "../Types/RecursivePartial";
import { Circle, Constants, Utils } from "../Utils";
import { Particle } from "./Particle";
import { ICoordinates } from "./Interfaces/ICoordinates";

const tsParticlesDom: Container[] = [];

/**
 * Main class for creating the [[Container]] objects
 */
export class Loader {
    /**
     * All the [[Container]] objects loaded
     */
    public static dom(): Container[] {
        return tsParticlesDom;
    }

    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index the object index
     */
    public static domItem(index: number): Container | undefined {
        const dom = Loader.dom();
        const item = dom[index];

        if (item && !item.destroyed) {
            return item;
        }

        dom.splice(index, 1);
    }

    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param options the options array to get the item from
     * @param index if provided gets the corresponding item from the array
     */
    public static async loadFromArray(
        tagId: string,
        options: RecursivePartial<IOptions>[],
        index?: number
    ): Promise<Container | undefined> {
        return Loader.load(tagId, Utils.itemFromArray(options, index));
    }

    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param id the container id
     * @param domContainer the dom container for keeping
     * @param options the options array to get the item from
     * @param index if provided gets the corresponding item from the array
     */
    public static async setFromArray(
        id: string,
        domContainer: HTMLElement,
        options: RecursivePartial<IOptions>[],
        index?: number
    ): Promise<Container | undefined> {
        return Loader.set(id, domContainer, Utils.itemFromArray(options, index));
    }

    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param options the options object to initialize the [[Container]]
     */
    public static async load(tagId: string, options?: RecursivePartial<IOptions>): Promise<Container | undefined> {
        /* elements */
        const domContainer = document.getElementById(tagId);

        if (!domContainer) {
            return;
        }

        return Loader.set(tagId, domContainer, options);
    }

    /**
     * Loads the provided options to create a [[Container]] object.
     * @param id the particles container element id
     * @param domContainer the dom container
     * @param options the options object to initialize the [[Container]]
     */
    public static async set(
        id: string,
        domContainer: HTMLElement,
        options?: RecursivePartial<IOptions>
    ): Promise<Container | undefined> {
        const dom = Loader.dom();
        const oldIndex = dom.findIndex((v) => v.id === id);

        if (oldIndex >= 0) {
            const old = Loader.domItem(oldIndex);

            if (old && !old.destroyed) {
                old.destroy();
                dom.splice(oldIndex, 1);
            }
        }

        let canvasEl: HTMLCanvasElement;
        let generatedCanvas: boolean;

        if (domContainer.tagName.toLowerCase() === "canvas") {
            canvasEl = domContainer as HTMLCanvasElement;
            generatedCanvas = false;
        } else {
            const existingCanvases = domContainer.getElementsByTagName("canvas");

            /* get existing canvas if present, otherwise a new one will be created */
            if (existingCanvases.length) {
                canvasEl = existingCanvases[0];

                if (!canvasEl.className) {
                    canvasEl.className = Constants.canvasClass;
                }

                generatedCanvas = false;
            } else {
                generatedCanvas = true;
                /* create canvas element */
                canvasEl = document.createElement("canvas");

                canvasEl.className = Constants.canvasClass;

                /* set size canvas */
                canvasEl.style.width = "100%";
                canvasEl.style.height = "100%";

                /* append canvas */
                domContainer.appendChild(canvasEl);
            }
        }

        /* launch tsParticles */
        const newItem = new Container(id, options);

        if (oldIndex >= 0) {
            dom.splice(oldIndex, 0, newItem);
        } else {
            dom.push(newItem);
        }

        newItem.canvas.loadCanvas(canvasEl, generatedCanvas);
        await newItem.start();

        return newItem;
    }

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param jsonUrl the json path to use in the GET request
     */
    public static async loadJSON(tagId: string, jsonUrl: string): Promise<Container | undefined> {
        /* load json config */
        const response = await fetch(jsonUrl);

        if (response.ok) {
            const options = await response.json();

            if (options instanceof Array) {
                return Loader.loadFromArray(tagId, options);
            } else {
                return Loader.load(tagId, options);
            }
        } else {
            Loader.fetchError(response.status);
        }
    }

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param id the particles container element id
     * @param domContainer the container used to contains the particles
     * @param jsonUrl the json path to use in the GET request
     */
    public static async setJSON(
        id: string,
        domContainer: HTMLElement,
        jsonUrl: string
    ): Promise<Container | undefined> {
        /* load json config */
        const response = await fetch(jsonUrl);

        if (response.ok) {
            const options = await response.json();

            if (options instanceof Array) {
                return Loader.setFromArray(id, domContainer, options);
            } else {
                return Loader.set(id, domContainer, options);
            }
        } else {
            Loader.fetchError(response.status);
        }
    }

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback the function called after the click event is fired
     */
    public static setOnClickHandler(callback: (evt: Event, particles?: Particle[]) => void): void {
        const dom = Loader.dom();

        if (dom.length === 0) {
            throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
        }

        for (const domItem of dom) {
            const el = domItem.interactivity.element;

            if (!el) {
                continue;
            }

            const clickOrTouchHandler = (e: Event, pos: ICoordinates) => {
                if (domItem.destroyed) {
                    return;
                }

                const pxRatio = domItem.retina.pixelRatio;
                const particles = domItem.particles.quadTree.query(
                    new Circle(pos.x * pxRatio, pos.y * pxRatio, domItem.retina.sizeValue)
                );

                callback(e, particles);
            };

            const clickHandler = (e: Event) => {
                if (domItem.destroyed) {
                    return;
                }

                const mouseEvent = e as MouseEvent;
                const pos = {
                    x: mouseEvent.offsetX || mouseEvent.clientX,
                    y: mouseEvent.offsetY || mouseEvent.clientY,
                };

                clickOrTouchHandler(e, pos);
            };

            const touchStartHandler = () => {
                if (domItem.destroyed) {
                    return;
                }

                touched = true;
                touchMoved = false;
            };

            const touchMoveHandler = () => {
                if (domItem.destroyed) {
                    return;
                }

                touchMoved = true;
            };

            const touchEndHandler = (e: Event) => {
                if (domItem.destroyed) {
                    return;
                }

                if (touched && !touchMoved) {
                    const touchEvent = e as TouchEvent;
                    const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
                    const canvasRect = domItem.canvas.element?.getBoundingClientRect();
                    const pos = {
                        x: lastTouch.clientX - (canvasRect?.left ?? 0),
                        y: lastTouch.clientY - (canvasRect?.top ?? 0),
                    };

                    clickOrTouchHandler(e, pos);
                }

                touched = false;
                touchMoved = false;
            };

            const touchCancelHandler = () => {
                if (domItem.destroyed) {
                    return;
                }

                touched = false;
                touchMoved = false;
            };

            let touched = false;
            let touchMoved = false;

            el.addEventListener("click", clickHandler);
            el.addEventListener("touchstart", touchStartHandler);
            el.addEventListener("touchmove", touchMoveHandler);
            el.addEventListener("touchend", touchEndHandler);
            el.addEventListener("touchcancel", touchCancelHandler);
        }
    }

    private static fetchError(statusCode: number): void {
        console.error(`Error tsParticles - fetch status: ${statusCode}`);
        console.error("Error tsParticles - File config not found");
    }
}
