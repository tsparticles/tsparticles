/** Curl noise path options */
export interface ICurlOptions {
  /** Random seed for noise generation */
  seed?: number;
  /** Movement speed along the curl field */
  speed: number;
  /** Step size for sampling the noise field */
  step: number;
}
