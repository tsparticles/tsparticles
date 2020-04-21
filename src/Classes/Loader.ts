import { Container } from "./Container";
import type { IOptions } from "../Interfaces/Options/IOptions";
import type { RecursivePartial } from "../Types/RecursivePartial";
import { Constants } from "./Utils/Constants";
import { Utils } from "./Utils/Utils";

let tsParticlesDom: Container[] = [];

/**
 * Main class for creating the [[Container]] objects
 */
export class Loader {
    /**
     * All the [[Container]] objects loaded
     */
    public static dom(): Container[] {
        if (!tsParticlesDom) {
            tsParticlesDom = [];
        }

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
     * @param params the options array to get the item from
     * @param index if provided gets the corresponding item from the array
     */
    public static async loadFromArray(tagId: string,
                                      params: RecursivePartial<IOptions>[],
                                      index?: number): Promise<Container | undefined> {
        return Loader.load(tagId, Utils.itemFromArray(params, index));
    }

    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param id the container id
     * @param domContainer the dom container for keeping
     * @param params the options array to get the item from
     * @param index if provided gets the corresponding item from the array
     */
    public static async setFromArray(id: string,
                                     domContainer: HTMLElement,
                                     params: RecursivePartial<IOptions>[],
                                     index?: number): Promise<Container | undefined> {
        return Loader.set(id, domContainer, Utils.itemFromArray(params, index));
    }

    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param params the options object to initialize the [[Container]]
     */
    public static async load(tagId: string, params?: RecursivePartial<IOptions>): Promise<Container | undefined> {
        /* elements */
        const domContainer = document.getElementById(tagId);

        if (!domContainer) {
            return;
        }

        return this.set(tagId, domContainer, params);
    }

    /**
     * Loads the provided options to create a [[Container]] object.
     * @param id the particles container element id
     * @param domContainer the dom container
     * @param params the options object to initialize the [[Container]]
     */
    public static async set(id: string, domContainer: HTMLElement,
                            params?: RecursivePartial<IOptions>): Promise<Container | undefined> {
        const dom = Loader.dom();
        const oldIndex = dom.findIndex((v) => v.id === id);

        if (oldIndex >= 0) {
            const old = this.domItem(oldIndex);

            if (old && !old.destroyed) {
                old.destroy();
                dom.splice(oldIndex, 1);
            }
        }

        let canvasEl: HTMLCanvasElement;
        let generatedCanvas: boolean;

        if (domContainer.tagName === "canvas") {
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
        const newItem = new Container(id, params);

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
            const params = await response.json();

            if (params instanceof Array) {
                return Loader.loadFromArray(tagId, params);
            } else {
                return Loader.load(tagId, params);
            }
        } else {
            console.error(`Error tsParticles - fetch status: ${response.status}`);
            console.error("Error tsParticles - File config not found");
        }
    };

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param id the particles container element id
     * @param domContainer the container used to contains the particles
     * @param jsonUrl the json path to use in the GET request
     */
    public static async setJSON(id: string, domContainer: HTMLElement,
                                jsonUrl: string): Promise<Container | undefined> {
        /* load json config */
        const response = await fetch(jsonUrl);

        if (response.ok) {
            const params = await response.json();

            if (params instanceof Array) {
                return Loader.setFromArray(id, domContainer, params);
            } else {
                return Loader.set(id, domContainer, params);
            }
        } else {
            console.error(`Error tsParticles - fetch status: ${response.status}`);
            console.error("Error tsParticles - File config not found");
        }
    };

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback the function called after the click event is fired
     */
    public static setOnClickHandler(callback: EventListenerOrEventListenerObject): void {
        const dom = Loader.dom();

        if (dom.length === 0) {
            throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
        }

        for (const domItem of dom) {
            const el = domItem.interactivity.element;

            if (el) {
                el.addEventListener("click", callback);
            }
        }
    }
}
