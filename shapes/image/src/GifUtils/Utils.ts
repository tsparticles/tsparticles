import { InterlaceOffsets, InterlaceSteps } from "./Constants";
import type { ApplicationExtension } from "./ApplicationExtension";
import { ByteStream } from "./ByteStream";
import { DisposalMethod } from "./DisposalMethod.js";
import type { GIF } from "./GIF";
import { GIFDataHeaders } from "./GIFDataHeaders";
import type { GIFProgressCallbackFunction } from "./GIFProgressCallbackFunction";

/**
 * __get a color table of length `count`__
 * @param byteStream - GIF data stream
 * @param count - number of colours to read from `byteStream`
 * @returns an array of RGB color values
 */
function parseColorTable(byteStream: ByteStream, count: number): [number, number, number][] {
    const colors: [number, number, number][] = [];

    for (let i = 0; i < count; i++) {
        colors.push([
            byteStream.data[byteStream.pos],
            byteStream.data[byteStream.pos + 1],
            byteStream.data[byteStream.pos + 2],
        ]);
        byteStream.pos += 3;
    }

    return colors;
}

/**
 * __parsing one image block in GIF data stream__
 * @param byteStream - GIF data stream
 * @param gif - GIF object to write to
 * @param avgAlpha - whether to average alpha channel
 * @param getFrameIndex - function to get current frame index in `GIF.frames` (optionally increment before next call)
 * @param getTransparencyIndex - function to get current transparency index into global/local color table (optionally update value)
 * @returns true if EOF was reached
 * @throws if an unknown block type was encountered
 */
async function parseExtensionBlock(
    byteStream: ByteStream,
    gif: GIF,
    avgAlpha: boolean,
    getFrameIndex: (increment: boolean) => number,
    getTransparencyIndex: (newValue?: number | null) => number
): Promise<void> {
    switch (byteStream.nextByte()) {
        case GIFDataHeaders.GraphicsControlExtension: {
            //~ parse graphics control extension data - applies to the next frame in the byte stream
            const frame = gif.frames[getFrameIndex(false)];

            //~ block size (1B) - static 4 - byte size of the block up to (but excluding) the Block Terminator
            byteStream.pos++;

            //~ packed byte (1B) >
            const packedByte = byteStream.nextByte();

            //~ > reserved (3b) - reserved for future use
            frame.GCreserved = (packedByte & 0xe0) >>> 5;
            //~ > disposal method (3b) - [0-7] - 0: unspecified (no action) 1: combine (no dispose) 2: restore background 3: restore previous 4-7: undefined
            frame.disposalMethod = (packedByte & 0x1c) >>> 2;
            //~ > user input flag (1b) - if 1 then continues (rendering) after user input (or delay-time, if given)
            frame.userInputDelayFlag = (packedByte & 2) === 2;

            //~ > transparent color flag (1b) - idicates that, if set, the following transparency index should be used to ignore each color with this index in the following frame
            const transparencyFlag = (packedByte & 1) === 1;

            //~ delay time (2B) - if non-zero specifies the number of 1/100 seconds (here converted to milliseconds) to delay (rendering of) the following frame
            frame.delayTime = byteStream.nextTwoBytes() * 0xa;

            //~ transparency index (1B) - color index of transparent color for following frame (only if transparency flag is set)
            const transparencyIndex = byteStream.nextByte();

            if (transparencyFlag) {
                getTransparencyIndex(transparencyIndex);
            }

            //~ block terminator (1B) - static 0 - marks end of graphics control extension block
            byteStream.pos++;

            break;
        }
        case GIFDataHeaders.ApplicationExtension: {
            byteStream.pos++;

            //~ parse application extension - application-specific information
            const applicationExtension: ApplicationExtension = {
                //~ block size (1B) - static 11 - byte size of the block up to (but excluding) the application data blocks
                //~ application identifier (8B) - 8 character string identifying the application (of this extension block)
                identifier: byteStream.getString(8),
                //~ application authentication code (3B) - 3 bytes to authenticate the application identifier
                authenticationCode: byteStream.getString(3),
                //~ application data blocks - the data of this application extension
                data: byteStream.readSubBlocksBin(),
            };

            gif.applicationExtensions.push(applicationExtension);

            break;
        }
        case GIFDataHeaders.CommentExtension: {
            //~ parse comment extension - one or more blocks each stating their size (1B) [1-255]
            gif.comments.push([getFrameIndex(false), byteStream.readSubBlocks()]);

            break;
        }
        case GIFDataHeaders.PlainTextExtension: {
            //~ parse plain text extension - text to render with the following frame (uses global color table)
            if (gif.globalColorTable.length === 0) {
                throw new EvalError("plain text extension without global color table");
            }

            //~ block size (1B) - static 12 - byte size of the block up to (but excluding) the plain text data blocks
            byteStream.pos++;

            gif.frames[getFrameIndex(false)].plainTextData = {
                //~ text grid left position (2B) - position of the left edge of text grid (in pixels) within the GIF (from the left edge)
                left: byteStream.nextTwoBytes(),
                //~ text grid top position (2B) - position of the top edge of text grid (in pixels) within the GIF (from the top edge)
                top: byteStream.nextTwoBytes(),
                //~ text grid width (2B) - width of the text grid (in pixels)
                width: byteStream.nextTwoBytes(),
                //~ text grid height (2B) - height of the text grid (in pixels)
                height: byteStream.nextTwoBytes(),
                //~ text character cell width (2B) - width (in pixels) of each cell (character) in text grid
                charWidth: byteStream.nextTwoBytes(),
                //~ text character cell height (2B) - height (in pixels) of each cell (character) in text grid
                charHeight: byteStream.nextTwoBytes(),
                //~ text foreground color index (1B) - index into the global color table for the foreground color of the text
                foregroundColor: byteStream.nextByte(),
                //~ text background color index (1B) - index into the global color table for the background color of the text
                backgroundColor: byteStream.nextByte(),
                //~ plain text data - one or more blocks each stating their size (1B) [1-255]
                text: byteStream.readSubBlocks(),
            };

            break;
        }
        default:
            //~ skip unknown extensions
            byteStream.skipSubBlocks();

            break;
    }
}

/**
 * __parsing one image block in GIF data stream__
 * @param byteStream - GIF data stream
 * @param gif - GIF object to write to
 * @param avgAlpha - whether to average alpha channel
 * @param getFrameIndex - function to get current frame index in `GIF.frames` (optionally increment before next call)
 * @param getTransparencyIndex - function to get current transparency index into global/local color table (optionally update value)
 * @param progressCallback - callback function to report progress
 * @returns true if EOF was reached
 * @throws if an unknown block type was encountered
 */
async function parseImageBlock(
    byteStream: ByteStream,
    gif: GIF,
    avgAlpha: boolean,
    getFrameIndex: (increment: boolean) => number,
    getTransparencyIndex: (newValue?: number | null) => number,
    progressCallback: GIFProgressCallbackFunction
): Promise<void> {
    //~ parse frame image - image descriptor
    const frame = gif.frames[getFrameIndex(true)];

    //~ image left position (2B) - position of the left edge of the frame (in pixels) within the GIF (from the left edge)
    frame.left = byteStream.nextTwoBytes();
    //~ image top position (2B) - position of the top edge of the frame (in pixels) within the GIF (from the top edge)
    frame.top = byteStream.nextTwoBytes();
    //~ image width (2B) - width of the frame (in pixels)
    frame.width = byteStream.nextTwoBytes();
    //~ image height (2B) - height of the frame (in pixels)
    frame.height = byteStream.nextTwoBytes();

    //~ packed byte (1B) >
    const packedByte = byteStream.nextByte(),
        //~ > local color table flag (1b) - if set there will be a local color table otherwise use the global color table
        localColorTableFlag = (packedByte & 0x80) === 0x80,
        //~ > interlaced flag (1b) - if set image is interlaced (4-pass interlace pattern)
        interlacedFlag = (packedByte & 0x40) === 0x40;

    //~ > sort flag (1b) - if the colors in the local color table are ordered after decreasing importance
    frame.sortFlag = (packedByte & 0x20) === 0x20;
    //~ > reserved (2b) - reserved for future use
    frame.reserved = (packedByte & 0x18) >>> 3;

    //~ > size of local color table (3b) - number of bits minus 1 [1-8 bits] (256 colors max)
    const localColorCount = 1 << ((packedByte & 7) + 1);

    //~ read local color table if available
    if (localColorTableFlag) {
        frame.localColorTable = parseColorTable(byteStream, localColorCount);
    }

    //~ decode frame image data (GIF-LZW) - image data
    /**
     * __get color from color tables (transparent if index is equal to the transparency index)__
     * @param index - index into global/local color table
     * @returns RGBA color value
     */
    const getColor = (index: number): [number, number, number, number] => {
        const [R, G, B] = (localColorTableFlag ? frame.localColorTable : gif.globalColorTable)[index];
        return [R, G, B, index === getTransparencyIndex(null) ? (avgAlpha ? ~~((R + G + B) / 3) : 0) : 255];
    };

    const image = ((): ImageData | null => {
        try {
            return new ImageData(frame.width, frame.height, { colorSpace: "srgb" });
        } catch (error) {
            if (error instanceof DOMException && error.name === "IndexSizeError") {
                return null;
            }

            throw error;
        }
    })();

    if (image == null) {
        throw new EvalError("GIF frame size is to large");
    }

    const minCodeSize = byteStream.nextByte(),
        imageData = byteStream.readSubBlocksBin(),
        clearCode = 1 << minCodeSize;
    /**
     * __read `len` bits from `imageData` at `pos`__
     * @param pos - bit position in `imageData`
     * @param len - bit length to read [1-12 bits]
     * @returns `len` bits at `pos`
     */
    const readBits = (pos: number, len: number): number => {
        const bytePos = pos >>> 3,
            bitPos = pos & 7;
        return (
            ((imageData[bytePos] + (imageData[bytePos + 1] << 8) + (imageData[bytePos + 2] << 16)) &
                (((1 << len) - 1) << bitPos)) >>>
            bitPos
        );
    };

    if (interlacedFlag) {
        for (let code = 0, size = minCodeSize + 1, pos = 0, dic = [[0]], pass = 0; pass < 4; pass++) {
            if (InterlaceOffsets[pass] < frame.height) {
                for (let pixelPos = 0, lineIndex = 0; ; ) {
                    const last = code;

                    code = readBits(pos, size);
                    pos += size + 1;

                    if (code === clearCode) {
                        size = minCodeSize + 1;
                        dic.length = clearCode + 2;

                        for (let i = 0; i < dic.length; i++) {
                            dic[i] = i < clearCode ? [i] : [];
                        }
                    } else {
                        if (code >= dic.length) {
                            dic.push(dic[last].concat(dic[last][0]));
                        } else if (last !== clearCode) {
                            dic.push(dic[last].concat(dic[code][0]));
                        }

                        for (let i = 0; i < dic[code].length; i++) {
                            image.data.set(
                                getColor(dic[code][i]),
                                InterlaceOffsets[pass] * frame.width +
                                    InterlaceSteps[pass] * lineIndex +
                                    (pixelPos % (frame.width * 4))
                            );

                            pixelPos += 4;
                        }

                        if (dic.length === 1 << size && size < 0xc) {
                            size++;
                        }
                    }

                    if (pixelPos === frame.width * 4 * (lineIndex + 1)) {
                        lineIndex++;

                        if (InterlaceOffsets[pass] + InterlaceSteps[pass] * lineIndex >= frame.height) {
                            break;
                        }
                    }
                }
            }

            progressCallback(
                byteStream.pos / (byteStream.data.length - 1),
                getFrameIndex(false) + 1,
                image,
                { x: frame.left, y: frame.top },
                { width: gif.width, height: gif.height }
            );
        }

        frame.image = image;
        frame.bitmap = await createImageBitmap(image);
    } else {
        for (let code = 0, size = minCodeSize + 1, pos = 0, dic = [[0]], pixelPos = -4; ; ) {
            const last = code;

            code = readBits(pos, size);
            pos += size;

            if (code === clearCode) {
                size = minCodeSize + 1;
                dic.length = clearCode + 2;

                for (let i = 0; i < dic.length; i++) {
                    dic[i] = i < clearCode ? [i] : [];
                }
            } else {
                //~ clear code +1 = end of information code
                if (code === clearCode + 1) {
                    break;
                }

                if (code >= dic.length) {
                    dic.push(dic[last].concat(dic[last][0]));
                } else if (last !== clearCode) {
                    dic.push(dic[last].concat(dic[code][0]));
                }

                for (let i = 0; i < dic[code].length; i++) {
                    image.data.set(getColor(dic[code][i]), (pixelPos += 4));
                }

                if (dic.length >= 1 << size && size < 0xc) {
                    size++;
                }
            }
        }

        frame.image = image;
        frame.bitmap = await createImageBitmap(image);

        progressCallback(
            (byteStream.pos + 1) / byteStream.data.length,
            getFrameIndex(false) + 1,
            frame.image,
            { x: frame.left, y: frame.top },
            { width: gif.width, height: gif.height }
        );
    }
}

/**
 * __parsing one block in GIF data stream__
 * @param byteStream - GIF data stream
 * @param gif - GIF object to write to
 * @param avgAlpha - whether to average alpha channel
 * @param getFrameIndex - function to get current frame index in `GIF.frames` (optionally increment before next call)
 * @param getTransparencyIndex - function to get current transparency index into global/local color table (optionally update value)
 * @param progressCallback - callback function to report progress
 * @returns true if EOF was reached
 * @throws if an unknown block type was encountered
 */
async function parseBlock(
    byteStream: ByteStream,
    gif: GIF,
    avgAlpha: boolean,
    getFrameIndex: (increment: boolean) => number,
    getTransparencyIndex: (newValue?: number | null) => number,
    progressCallback: GIFProgressCallbackFunction
): Promise<boolean> {
    switch (byteStream.nextByte()) {
        case GIFDataHeaders.EndOfFile:
            return true;
        case GIFDataHeaders.Image:
            await parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback);

            break;
        case GIFDataHeaders.Extension:
            await parseExtensionBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex);

            break;
        default:
            throw new EvalError("undefined block found");
    }
    return false;
}

/**
 * __extract the animation loop amount from `gif`__
 * @param gif - a parsed GIF object
 * @returns if `NETSCAPE2.0` is available, the loop amount of the GIF as 16bit number (0 = infinity), otherwise `NaN`
 */
export function getGIFLoopAmount(gif: GIF): number {
    for (const extension of gif.applicationExtensions) {
        if (extension.identifier + extension.authenticationCode !== "NETSCAPE2.0") {
            continue;
        }

        return extension.data[1] + (extension.data[2] << 8);
    }

    return NaN;
}

/**
 * __decodes a GIF into its components for rendering on a canvas__
 * @param gifURL - the URL of a GIF file
 * @param progressCallback - callback for showing progress of decoding process (when GIF is interlaced calls after each pass (4x on the same frame))
 * @param avgAlpha - [optional] if this is true then, when encountering a transparent pixel, it uses the average value of the pixels RGB channels to calculate the alpha channels value, otherwise alpha channel is either 0 or 1 - _default false_
 * @returns the GIF with each frame decoded separately
 */
export async function decodeGIF(
    gifURL: string,
    progressCallback: GIFProgressCallbackFunction,
    avgAlpha?: boolean
): Promise<GIF> {
    if (!avgAlpha) avgAlpha = false;

    const res = await fetch(gifURL);

    if (!res.ok && res.status === 404) {
        throw new EvalError("file not found");
    }

    const buffer = await res.arrayBuffer();

    //? https://www.w3.org/Graphics/GIF/spec-gif89a.txt
    //? https://www.matthewflickinger.com/lab/whatsinagif/bits_and_bytes.asp
    //~ load stream and start decoding
    /**the output gif object*/
    const gif: GIF = {
            width: 0,
            height: 0,
            totalTime: 0,
            colorRes: 0,
            pixelAspectRatio: 0,
            frames: [],
            sortFlag: false,
            globalColorTable: [],
            backgroundImage: new ImageData(1, 1, { colorSpace: "srgb" }),
            comments: [],
            applicationExtensions: [],
        },
        byteStream = new ByteStream(new Uint8ClampedArray(buffer));

    //~ signature (3B) and version (3B)
    if (byteStream.getString(6) !== "GIF89a") {
        throw new Error("not a supported GIF file");
    }

    //~ width (2B) - in pixels
    gif.width = byteStream.nextTwoBytes();
    //~ height (2B) - in pixels
    gif.height = byteStream.nextTwoBytes();

    //~ packed byte (1B) >
    const packedByte = byteStream.nextByte(),
        //~ > global color table flag (1b) - if there will be a global color table
        globalColorTableFlag = (packedByte & 0x80) === 0x80;

    //~ > color resolution (3b) - bits per color minus 1 [1-8 bits] (256 colors max)
    gif.colorRes = (packedByte & 0x70) >>> 4;
    //~ > sort flag (1b) - if the colors in the global color table are ordered after decreasing importance
    gif.sortFlag = (packedByte & 8) === 8;

    //~ > size of global color table (3b) - number of bits minus 1 [1-8 bits] (256 colors max)
    const globalColorCount = 1 << ((packedByte & 7) + 1),
        //~ background color index (1B) - when global color table exists this points to the color (index) that should be used for pixels without color data
        backgroundColorIndex = byteStream.nextByte();

    //~ pixel aspect ratio (1B) - if non-zero the pixel aspect ratio will be `(value + 15) / 64` from 4:1 to 1:4 in 1/64th increments
    gif.pixelAspectRatio = byteStream.nextByte();

    if (gif.pixelAspectRatio !== 0) {
        gif.pixelAspectRatio = (gif.pixelAspectRatio + 0xf) / 0x40;
    }

    //~ parse global color table if there is one
    if (globalColorTableFlag) {
        gif.globalColorTable = parseColorTable(byteStream, globalColorCount);
    }

    //~ set background image / background color or transparent
    const backgroundImage = ((): ImageData | null => {
        try {
            return new ImageData(gif.width, gif.height, { colorSpace: "srgb" });
        } catch (error) {
            if (error instanceof DOMException && error.name === "IndexSizeError") {
                return null;
            }

            throw error;
        }
    })();

    if (backgroundImage == null) {
        throw new Error("GIF frame size is to large");
    }

    backgroundImage.data.set(
        globalColorTableFlag ? [...gif.globalColorTable[backgroundColorIndex], 255] : [0, 0, 0, 0]
    );

    for (let i = 4; i < backgroundImage.data.length; i *= 2) {
        backgroundImage.data.copyWithin(i, 0, i);
    }

    gif.backgroundImage = backgroundImage;

    //~ parse other blocks >
    let frameIndex = -1,
        incrementFrameIndex = true,
        transparencyIndex = -1;
    /**
     * __get the index of the current frame__
     * @param increment - if the frame index should increse before the next iterration
     * @returns current frame index
     */
    const getframeIndex = (increment: boolean): number => {
        if (increment) {
            incrementFrameIndex = true;
        }

        return frameIndex;
    };
    /**
     * __get the current transparency index for this frame__
     * @param newValue - if set updates value of transparencyIndex to this
     * @returns current transparency index
     */
    const getTransparencyIndex = (newValue?: number | null): number => {
        if (newValue != null) {
            transparencyIndex = newValue;
        }

        return transparencyIndex;
    };
    try {
        do {
            if (incrementFrameIndex) {
                gif.frames.push({
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                    disposalMethod: DisposalMethod.Replace,
                    image: new ImageData(1, 1, { colorSpace: "srgb" }),
                    plainTextData: null,
                    userInputDelayFlag: false,
                    delayTime: 0,
                    sortFlag: false,
                    localColorTable: [],
                    reserved: 0,
                    GCreserved: 0,
                });
                frameIndex++;
                transparencyIndex = -1;
                incrementFrameIndex = false;
            }

            //~ artificial delay so other processes get some processing time
            await new Promise((end) => setTimeout(end, 0));
        } while (!(await parseBlock(byteStream, gif, avgAlpha, getframeIndex, getTransparencyIndex, progressCallback)));

        gif.frames.length--;

        return gif;
    } catch (error) {
        if (error instanceof EvalError) {
            throw new Error(`error while parsing frame ${frameIndex} "${error.message}"`);
        }

        throw error;
    }
}
