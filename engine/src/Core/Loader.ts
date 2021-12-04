import { Container } from "./Container";
import type { IOptions } from "../Options/Interfaces/IOptions";
import type { CustomEventArgs, CustomEventListener, RecursivePartial } from "../Types";
import { canvasClass, itemFromArray } from "../Utils";
import type { Particle } from "./Particle";
import type { SingleOrMultiple } from "../Types";
import { EventDispatcher } from "../Utils/EventDispatcher";

const tsParticlesDom: Container[] = [];
const eventDispatcher = new EventDispatcher();

function fetchError(statusCode: number): void {
    console.error(`Error tsParticles - fetch status: ${statusCode}`);
    console.error("Error tsParticles - File config not found");
}

interface LoaderParams {
    element?: HTMLElement;
    index?: number;
    options?: SingleOrMultiple<RecursivePartial<IOptions>>;
    tagId?: string;
}

interface RemoteLoaderParams {
    element?: HTMLElement;
    index?: number;
    tagId?: string;
    url?: SingleOrMultiple<string>;
}

/**
 * Main class for creating the [[Container]] objects
 * @category Core
 */
export class Loader {
    /**
     * All the [[Container]] objects loaded
     */
    static dom(): Container[] {
        return tsParticlesDom;
    }

    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index the object index
     */
    static domItem(index: number): Container | undefined {
        const dom = Loader.dom();
        const item = dom[index];

        if (item && !item.destroyed) {
            return item;
        }

        dom.splice(index, 1);
    }

    static async loadOptions(params: LoaderParams): Promise<Container | undefined> {
        const tagId = params.tagId ?? `tsparticles${Math.floor(Math.random() * 10000)}`;
        const { options, index } = params;

        /* elements */
        let domContainer = params.element ?? document.getElementById(tagId);

        if (!domContainer) {
            domContainer = document.createElement("div");

            domContainer.id = tagId;

            document.querySelector("body")?.append(domContainer);
        }

        const currentOptions = options instanceof Array ? itemFromArray(options, index) : options;
        const dom = Loader.dom();
        const oldIndex = dom.findIndex((v) => v.id === tagId);

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
                    canvasEl.className = canvasClass;
                }

                generatedCanvas = false;
            } else {
                generatedCanvas = true;
                /* create canvas element */
                canvasEl = document.createElement("canvas");

                canvasEl.className = canvasClass;

                /* set size canvas */
                canvasEl.style.width = "100%";
                canvasEl.style.height = "100%";

                /* append canvas */
                domContainer.appendChild(canvasEl);
            }
        }

        /* launch tsParticles */
        const newItem = new Container(tagId, currentOptions);

        if (oldIndex >= 0) {
            dom.splice(oldIndex, 0, newItem);
        } else {
            dom.push(newItem);
        }

        newItem.canvas.loadCanvas(canvasEl, generatedCanvas);

        await newItem.start();

        return newItem;
    }

    static async loadRemoteOptions(params: RemoteLoaderParams): Promise<Container | undefined> {
        const { url: jsonUrl, index } = params;
        const url = jsonUrl instanceof Array ? itemFromArray(jsonUrl, index) : jsonUrl;

        if (!url) {
            return;
        }

        const response = await fetch(url);

        if (!response.ok) {
            fetchError(response.status);

            return;
        }

        const data = await response.json();

        return await Loader.loadOptions({
            tagId: params.tagId,
            element: params.element,
            index,
            options: data,
        });
    }

    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param options the options object to initialize the [[Container]]
     * @param index if an options array is provided, this will retrieve the exact index of that array
     */
    static load(
        tagId: string | SingleOrMultiple<RecursivePartial<IOptions>>,
        options?: SingleOrMultiple<RecursivePartial<IOptions>> | number,
        index?: number
    ): Promise<Container | undefined> {
        const params: LoaderParams = { index };

        if (typeof tagId === "string") {
            params.tagId = tagId;
        } else {
            params.options = tagId;
        }

        if (typeof options === "number") {
            params.index = options ?? params.index;
        } else {
            params.options = options ?? params.options;
        }

        return this.loadOptions(params);
    }

    /**
     * Loads the provided options to create a [[Container]] object.
     * @param id the particles container element id
     * @param domContainer the dom container
     * @param options the options object to initialize the [[Container]]
     * @param index if an options array is provided, this will retrieve the exact index of that array
     */
    static async set(
        id: string | HTMLElement,
        domContainer: HTMLElement | SingleOrMultiple<RecursivePartial<IOptions>>,
        options?: SingleOrMultiple<RecursivePartial<IOptions>> | number,
        index?: number
    ): Promise<Container | undefined> {
        const params: LoaderParams = { index };

        if (typeof id === "string") {
            params.tagId = id;
        } else {
            params.element = id;
        }

        if (domContainer instanceof HTMLElement) {
            params.element = domContainer;
        } else {
            params.options = domContainer;
        }

        if (typeof options === "number") {
            params.index = options;
        } else {
            params.options = options ?? params.options;
        }

        return this.loadOptions(params);
    }

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param jsonUrl the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    static async loadJSON(
        tagId: string | SingleOrMultiple<string>,
        jsonUrl?: SingleOrMultiple<string> | number,
        index?: number
    ): Promise<Container | undefined> {
        let url: SingleOrMultiple<string>, id: string | undefined;

        if (typeof jsonUrl === "number" || jsonUrl === undefined) {
            url = tagId;
        } else {
            id = tagId as string;
            url = jsonUrl;
        }

        return await Loader.loadRemoteOptions({ tagId: id, url, index });
    }

    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param id the particles container element id
     * @param domContainer the container used to contains the particles
     * @param jsonUrl the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    static async setJSON(
        id: string | HTMLElement,
        domContainer: HTMLElement | SingleOrMultiple<string>,
        jsonUrl: SingleOrMultiple<string> | (number | undefined),
        index?: number
    ): Promise<Container | undefined> {
        let url: SingleOrMultiple<string>,
            newId: string | undefined,
            newIndex: number | undefined,
            element: HTMLElement;

        if (id instanceof HTMLElement) {
            element = id;
            url = domContainer as SingleOrMultiple<string>;
            newIndex = jsonUrl as number;
        } else {
            newId = id as string;
            element = domContainer as HTMLElement;
            url = jsonUrl as SingleOrMultiple<string>;
            newIndex = index;
        }

        return await Loader.loadRemoteOptions({ tagId: newId, url, index: newIndex, element });
    }

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback the function called after the click event is fired
     */
    static setOnClickHandler(callback: (evt: Event, particles?: Particle[]) => void): void {
        const dom = Loader.dom();

        if (dom.length === 0) {
            throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
        }

        for (const domItem of dom) {
            domItem.addClickHandler(callback);
        }
    }

    /**
     * Adds a listener to the specified event
     * @param type The event to listen to
     * @param listener The listener of the specified event
     */
    static addEventListener(type: string, listener: CustomEventListener): void {
        eventDispatcher.addEventListener(type, listener);
    }

    /**
     * Removes a listener from the specified event
     * @param type The event to stop listening to
     * @param listener The listener of the specified event
     */
    static removeEventListener(type: string, listener: CustomEventListener): void {
        eventDispatcher.removeEventListener(type, listener);
    }

    /**
     * Dispatches an event that will be listened from listeners
     * @param type The event to dispatch
     * @param args The event parameters
     */
    static dispatchEvent(type: string, args: CustomEventArgs): void {
        eventDispatcher.dispatchEvent(type, args);
    }
}
