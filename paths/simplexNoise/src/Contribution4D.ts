export interface Contribution4D {
    dw: number;
    dx: number;
    dy: number;
    dz: number;
    next?: Contribution4D;
    wsb: number;
    xsb: number;
    ysb: number;
    zsb: number;
}
