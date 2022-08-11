export interface ICurvesOptions {
    attenHarmonics: number;
    highValue: number;
    lowValue: number;
    nbHarmonics: number;
    period: number;
    rndFunc?: (() => number) | null;
}
