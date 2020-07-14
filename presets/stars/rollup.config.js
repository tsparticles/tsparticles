import babel from 'rollup-plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
    input: 'dist/preset.js',
    output: {
        file: 'dist/tsparticles.preset.stars.js',
        format: 'iife',
        sourcemap: true,
        globals: {
            tsparticles: 'window'
        }
    },
    external: [
        'tsparticles'
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        sourcemaps()
    ]
};