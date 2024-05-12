export enum GIFDataHeaders {
    /**
     * extension introducer
     */
    Extension = 0x21,

    /**
     * extension label: application
     */
    ApplicationExtension = 0xff,

    /**
     * extension label: graphic control
     */
    GraphicsControlExtension = 0xf9,

    /**
     * extension label: plain text
     */
    PlainTextExtension = 1,

    /**
     * extension label: comment
     */
    CommentExtension = 0xfe,

    /**
     * image seperator
     */
    Image = 0x2c,

    /**
     * trailer &gt; end of file / GIF data
     */
    EndOfFile = 0x3b,
}
