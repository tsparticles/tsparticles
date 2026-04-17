declare const config: {
  environment: string;
  modulePrefix: string;
  podModulePrefix: string;
  locationType: "history" | "hash" | "none" | "auto";
  rootURL: string;
  APP: Record<string, unknown>;
};

export default config;
