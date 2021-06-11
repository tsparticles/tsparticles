import * as path from 'path';

import { InputOptions, OutputOptions, rollup, RollupOutput } from 'rollup';

const typescript2 = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');

const ENTRY_FILE = `src/Particles.ts`;

const rollupConfig = {
    inputOptions: {
        treeshake: true,
        input: ENTRY_FILE,
        external: [
            "tsparticles"
        ],
        plugins: [
            typescript2({
                check: false,
                cacheRoot: path.join(path.resolve(), 'node_modules/.tmp/.rts2_cache'),
                useTsconfigDeclarationDir: true
            }),
            resolve()
        ],
        onwarn(warning: { code: string, message: string }) {
            if (warning.code === 'THIS_IS_UNDEFINED') {
                return;
            }
            console.log("Rollup warning: ", warning.message);
        }
    } as InputOptions,
    outputOptions: {
        sourcemap: true,
        exports: 'named',
        file: 'dist/web-particles.js',
        name: 'web-particles',
        format: 'es'
    } as OutputOptions
}

function rollupBuild({
                         inputOptions,
                         outputOptions
                     }: { inputOptions: InputOptions, outputOptions: OutputOptions }): Promise<RollupOutput> {
    return rollup(inputOptions).then(bundle => bundle.write(outputOptions));
}

rollupBuild(rollupConfig);
