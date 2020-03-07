export interface IImageShape {
    src: string;
    width: number;
    height: number;

    /**
     * @deprecated use the new replaceColor instead
     */
    replace_color: boolean;

    replaceColor: boolean;
}
