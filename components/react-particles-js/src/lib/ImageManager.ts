import { resolve } from "dns";
import { IImageDefinition, IShapeDefinition } from "./IParams";
import { IParsedColor } from "./Utils";

export interface IImageDefinitionEnhanced extends IImageDefinition {
    svgData?: string;
    elementData?: HTMLImageElement;
    loaded?: boolean;
    ratio?: number;
    type?: string;
}

export interface IShapeDefinitionEnhanced extends IShapeDefinition {
    image: IImageDefinitionEnhanced;
    images: IImageDefinitionEnhanced[];
}

export enum ImageMode {
    SINGLE = 'single',
    MULTIPLE = 'multiple'
}

export class ImageManager {

    private singleImage: IImageDefinitionEnhanced = null;
    private multipleImages: IImageDefinitionEnhanced[] = [];
    private mode: ImageMode = ImageMode.SINGLE;

    getImage(index?: number): IImageDefinitionEnhanced {
        if (index !== undefined) {
            if (this.multipleImages.length === 0)
                throw new Error(`No images loaded. You may need to define 'shape.type' = 'images'.`);
            return this.multipleImages[index % this.multipleImages.length];
        } else {
            return this.singleImage;
        }
    }

    parseShape(shape: IShapeDefinitionEnhanced): Promise<IShapeDefinitionEnhanced> {
        if( shape.type === 'image' ){
            this.mode = ImageMode.SINGLE;
            return this.parseSingleImage(shape.image)
                .then(parsedImage => {
                    this.singleImage = parsedImage;
                    return {
                        ...shape,
                        image: parsedImage
                    };
                });
		}else if( shape.type == 'images' ){
            this.mode = ImageMode.MULTIPLE;
            const promises: Promise<IImageDefinitionEnhanced>[] = [];
			for(let imageShape of shape.images){
                promises.push(this.parseSingleImage(imageShape));
            }
            return Promise.all(promises)
                .then(parsedImages => {
                    this.multipleImages = parsedImages;
                    return {
                        ...shape,
                        images: parsedImages
                    };
                });
        } else {
            return Promise.resolve(shape);
        }
    }

    private parseSingleImage(image: IImageDefinitionEnhanced): Promise<IImageDefinitionEnhanced> {
        const returnImage = this.buildImageObject({
            height: image.height,
            width: image.width,
            src: image.src,
        });

        let ratio = image.width / image.height;
        if (ratio === Infinity || ratio === 0)
            ratio = 1;
        returnImage.ratio = ratio;

        let match: string[];
        if(match = /^data:image\/(\w{3})\+xml;(.*?)base64,(.*)$/.exec(image.src)){
            returnImage.type = match[1];
            returnImage.svgData = atob(match[3]);
        }else if(match = /^.*(\w{3})$/.exec(image.src)){
            returnImage.type = match[1];
        }
        return this.loadImage(returnImage);
    }

    private loadImage(image: IImageDefinitionEnhanced): Promise<IImageDefinitionEnhanced> {
        image = { ...image };
		if( image.src != '' ){
			if( image.type == 'svg' ){
				if (image.svgData) { // already loaded
					return Promise.resolve(image);
				} else {
                    return new Promise<IImageDefinitionEnhanced>((resolve, reject) => {
                        let xhr: XMLHttpRequest = new XMLHttpRequest();
                        xhr.open( 'GET', image.src );
                        xhr.onreadystatechange = ( data: any ) => {
                            if( xhr.readyState == 4 ){
                                if( xhr.status == 200 ){
                                    image.svgData = data.currentTarget.response;
                                    resolve(image);
                                }else{
                                    reject(new Error(`Error react-particles-js - Status code ${xhr.readyState}`));
                                }
                            }
                        };
                        xhr.send();
                    });
				}
			}else{
                return new Promise<IImageDefinitionEnhanced>(resolve => {
                    let imageElement: HTMLImageElement = new Image();
                    imageElement.addEventListener( 'load', () => {
                        image.elementData = imageElement;
                        resolve(image);
                    });
                    imageElement.src = image.src;
                });
			}
		}else{
			return Promise.reject(new Error('Error react-particles-js - no image.src'));
		}
    }

    createSvgImage(imageData: string, particleParameters: {
        color: IParsedColor;
        opacity: number;
    }): Promise<HTMLImageElement> {
        const rgbHex: RegExp = /#([0-9A-F]{3,6})|rgb\([0-9,]+\)/gi;

        let coloredSvgXml: string = imageData.replace( rgbHex, ( m, r, g, b ) => {
			let color_value: string;
			if( particleParameters.color.rgb ){
				let {r, g, b} = particleParameters.color.rgb;
				color_value = `rgba( ${r}, ${g}, ${b}, ${particleParameters.opacity} )`;
			}else{
				let {h, s, l} = particleParameters.color.hsl;
				color_value = `rgba( ${h}, ${s}, ${l}, ${particleParameters.opacity} )`;
			}
			return color_value;
        });
        
        const svg: Blob = new Blob( [coloredSvgXml], {
			type: 'image/svg+xml;charset=utf-8'
		});
		const DOMURL: typeof URL = window.URL || (window as any);
		const url = DOMURL.createObjectURL( svg );

        return new Promise(resolve => {
            let img = new Image();
            img.addEventListener( 'load', () => {
                // particle.img.obj = img;
                // particle.img.loaded = true;
                DOMURL.revokeObjectURL( url );
                // tmp.count_svg++;
                resolve(img);
            });
            img.src = url;
        });
    }

    buildImageObject(imageData: Partial<IImageDefinitionEnhanced> = {}): IImageDefinitionEnhanced {
        return {
            svgData: null,
            height: 0,
            width: 0,
            ratio: 0,
            src: '',
            type: '',
            ...imageData,
        };
    }
}