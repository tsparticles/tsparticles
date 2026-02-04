/* eslint-disable @typescript-eslint/no-non-null-assertion */

export class ByteStream {
  /**
   * this streams raw data
   */
  data: Uint8ClampedArray;

  /**
   * current position in `data`
   */
  pos;

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
    return this.data[this.pos++]!;
  }

  /**
   * reads two bytes as one number (in reverse byte order)
   * @returns the next two bytes as one number
   */
  nextTwoBytes(): number {
    const increment = 2,
      previous = 1,
      shift = 8;

    this.pos += increment;

    return this.data[this.pos - increment]! + (this.data[this.pos - previous]! << shift);
  }

  /**
   * reads a set of blocks as a string
   * @returns the sub blocks as a string
   */
  readSubBlocks(): string {
    let blockString = "",
      size = 0;

    const minCount = 0,
      emptySize = 0;

    do {
      size = this.data[this.pos++]!;

      for (let count = size; --count >= minCount; blockString += String.fromCodePoint(this.data[this.pos++]!)) {
        // do nothing
      }
    } while (size !== emptySize);

    return blockString;
  }

  /**
   * reads a set of blocks as binary
   * @returns the sub blocks as binary
   */
  readSubBlocksBin(): Uint8Array {
    let size = this.data[this.pos]!,
      len = 0;

    const emptySize = 0,
      increment = 1;

    for (let offset = 0; size !== emptySize; offset += size + increment, size = this.data[this.pos + offset]!) {
      len += size;
    }

    const blockData = new Uint8Array(len);

    size = this.data[this.pos++]!;

    for (let i = 0; size !== emptySize; size = this.data[this.pos++]!) {
      for (let count = size; --count >= emptySize; blockData[i++] = this.data[this.pos++]!) {
        // do nothing
      }
    }

    return blockData;
  }

  /**
   * skips the next set of blocks in the stream
   */
  skipSubBlocks(): void {
    for (
      const increment = 1, noData = 0;
      this.data[this.pos] !== noData;
      this.pos += this.data[this.pos]! + increment
    ) {
      // do nothing
    }

    this.pos++;
  }
}
