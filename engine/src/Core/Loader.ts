import { Container } from "./Container";
import type { IOptions } from "../Options/Interfaces/IOptions";
import type { RecursivePartial } from "../Types";
import { Constants, itemFromArray } from "../Utils";
import type { Particle } from "./Particle";
import type { SingleOrMultiple } from "../Types";

const tsParticlesDom: Container[] = [];

function fetchError(statusCode: number): void {
    console.error(`Error tsParticles - fetch status: ${statusCode}`);
    console.error("Error tsParticles - File config not found");
}

interface LoaderParams {
    tagId?: string;
    options?: SingleOrMultiple<RecursivePartial<IOptions>>;
    index?: number;
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
        console.log(params);

        const tagId = params.tagId ?? `tsparticles${Math.floor(Math.random() * 10000)}`;
        const { options, index } = params;

        /* elements */
        let domContainer = document.getElementById(tagId);

        if (!domContainer) {
            domContainer = document.createElement("div");

            domContainer.id = tagId;

            document.querySelector("body")?.append(domContainer);
        }

        return Loader.set(tagId, domContainer, options, index);
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
        const hasId = typeof id === "string";
        const domEl = (!hasId ? id : domContainer) as HTMLElement;
        const newOptions = (
            typeof options === "number" || options === undefined ? domContainer : options
        ) as SingleOrMultiple<RecursivePartial<IOptions>>;
        const currentOptions = newOptions instanceof Array ? itemFromArray(newOptions, index) : newOptions;
        const dom = Loader.dom();
        const oldIndex = hasId ? dom.findIndex((v) => v.id === id) : -1;

        if (oldIndex >= 0) {
            const old = Loader.domItem(oldIndex);

            if (old && !old.destroyed) {
                old.destroy();
                dom.splice(oldIndex, 1);
            }
        }

        let canvasEl: HTMLCanvasElement;
        let generatedCanvas: boolean;

        if (domEl.tagName.toLowerCase() === "canvas") {
            canvasEl = domEl as HTMLCanvasElement;
            generatedCanvas = false;
        } else {
            const existingCanvases = domEl.getElementsByTagName("canvas");

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
                domEl.appendChild(canvasEl);
            }
        }

        /* launch tsParticles */
        const newItem = new Container(
            (id as string) ?? `tsparticles${Math.floor(Math.random() * 10000)}`,
            currentOptions
        );

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
     * @param jsonUrl the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
    static async loadJSON(
        tagId: string | SingleOrMultiple<string>,
        jsonUrl?: SingleOrMultiple<string> | number,
        index?: number
    ): Promise<Container | undefined> {
        let url: string, id: string | undefined;

        if (typeof jsonUrl === "number" || jsonUrl === undefined) {
            url = tagId instanceof Array ? itemFromArray(tagId, jsonUrl) : tagId;
        } else {
            id = tagId as string;
            url = jsonUrl instanceof Array ? itemFromArray(jsonUrl, index) : jsonUrl;
        }

        /* load json config */
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();

            return await Loader.load(id ?? data, id ? data : index, index);
        } else {
            fetchError(response.status);
        }
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
        jsonUrl?: SingleOrMultiple<string> | number,
        index?: number
    ): Promise<Container | undefined> {
        let url: string, newId: string | undefined;

        if (typeof jsonUrl === "number" || jsonUrl === undefined) {
            url = (domContainer instanceof Array ? itemFromArray(domContainer, jsonUrl) : domContainer) as string;
        } else {
            newId = id as string;
            url = jsonUrl instanceof Array ? itemFromArray(jsonUrl, index) : jsonUrl;
        }

        /* load json config */
        const response = await fetch(url);

        if (response.ok) {
            const options = await response.json();

            return Loader.set(
                newId ?? (domContainer as HTMLElement),
                (domContainer as HTMLElement) ?? options,
                options ?? index,
                index
            );
        } else {
            fetchError(response.status);
        }
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
}
