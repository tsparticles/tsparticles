import type { Container, IOptions, Options } from "@tsparticles/engine";
import type { IResponsive } from "./Options/Interfaces/IResponsive.js";
import type { Responsive } from "./Options/Classes/Responsive.js";

export type IResponsiveOptions = IOptions & {
    responsive?: IResponsive[];
};

export type ResponsiveOptions = Options & {
    responsive?: Responsive[];
    setResponsive?: (width: number, pxRatio: number, defaultOptions: IOptions) => number | undefined;
};

export type ResponsiveContainer = Container & {
    actualOptions: ResponsiveOptions;

    responsiveMaxWidth?: number;
};
