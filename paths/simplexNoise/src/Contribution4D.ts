export interface Contribution4D {
    dx: number;
    dy: number;
    dz: number;
    dw: number;
    next?: Contribution4D;
    xsb: number;
    ysb: number;
    zsb: number;
    wsb: number;
}
