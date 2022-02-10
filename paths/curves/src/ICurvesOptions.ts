export interface ICurvesOptions {
    rndFunc: (() => number) | null;
    period: number;
    nbHarmonics: number;
    attenHarmonics: number;
    lowValue: number;
    highValue: number;
}
