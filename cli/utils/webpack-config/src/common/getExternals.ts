import type { ExternalData } from "./ExternalData.js";

const getExternalObject = (name: string): unknown => {
  return {
    commonjs: name,
    commonjs2: name,
    amd: name,
    root: "window",
  };
};

interface ExternalsParams {
  additionalExternals?: ExternalData[];
  bundle?: boolean;
}

const transformExternal = (external: ExternalData): unknown => {
    return {
      [external.name]: external.data,
    };
  },
  getExternals = (params: ExternalsParams): unknown[] => {
    const { additionalExternals, bundle } = params,
      externals = additionalExternals ?? [];

    if (bundle) {
      return externals.filter(t => !t.bundle).map(transformExternal);
    }

    return [
      ...externals.map(transformExternal),
      function ({ request }: { request: string | undefined }, cb: (err?: Error | null, data?: unknown) => void): void {
        if (
          request &&
          (request === "tsparticles" || request.startsWith("tsparticles-") || request.startsWith("@tsparticles/"))
        ) {
          cb(null, getExternalObject(request));

          return;
        }

        cb();
      },
    ];
  };

export { getExternals };
