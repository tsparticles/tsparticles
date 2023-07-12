export class ByteStream {
    /**
     * this streams raw data
     */
    data: Uint8ClampedArray;

    /**
     * current position in `data`
     */
    pos: number;

    constructor(bytes: Uint8ClampedArray) {
        this.pos = 0;
        this.data = new Uint8ClampedArray(bytes);
    }

    /**
     * returns a string from current `pos` of length `count`
     * @param count - the length of the string to return
     * @returns the string
     */
    getString(count: number): string {
        const slice = this.data.slice(this.pos, this.pos + count);

        this.pos += slice.length;

        return slice.reduce((acc, curr) => acc + String.fromCharCode(curr), "");
    }

    /**
     * get the next byte and increase cursors position by one
     * @returns the next byte
     */
    nextByte(): number {
        return this.data[this.pos++];
    }

    /**
     * reads two bytes as one number (in reverse byte order)
     * @returns the next two bytes as one number
     */
    nextTwoBytes(): number {
        this.pos += 2;

        return this.data[this.pos - 2] + (this.data[this.pos - 1] << 8);
    }

    /**
     * reads a set of blocks as a string
     * @returns the sub blocks as a string
     */
    readSubBlocks(): string {
        let blockString = "",
            size = 0;

        do {
            size = this.data[this.pos++];

            for (let count = size; --count >= 0; blockString += String.fromCharCode(this.data[this.pos++])) {
                // do nothing
            }
        } while (size !== 0);

        return blockString;
    }

    /**
     * reads a set of blocks as binary
     * @returns the sub blocks as binary
     */
    readSubBlocksBin(): Uint8Array {
        let size = 0,
            len = 0;

        for (let offset = 0; (size = this.data[this.pos + offset]) !== 0; offset += size + 1) {
            len += size;
        }

        const blockData = new Uint8Array(len);

        for (let i = 0; (size = this.data[this.pos++]) !== 0; ) {
            for (let count = size; --count >= 0; blockData[i++] = this.data[this.pos++]) {
                // do nothing
            }
        }

        return blockData;
    }

    /**
     * skips the next set of blocks in the stream
     */
    skipSubBlocks(): void {
        for (; this.data[this.pos] !== 0; this.pos += this.data[this.pos] + 1) {
            // do nothing
        }

        this.pos++;
    }
}
