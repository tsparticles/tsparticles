export interface Contribution2D {
    dx: number;
    dy: number;
    next?: Contribution2D;
    xsb: number;
    ysb: number;
}

export interface Contribution3D {
    dx: number;
    dy: number;
    dz: number;
    next?: Contribution3D;
    xsb: number;
    ysb: number;
    zsb: number;
}

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
