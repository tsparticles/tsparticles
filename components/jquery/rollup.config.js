import babel from 'rollup-plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
    input: 'dist/particles.js',
    output: {
        file: 'dist/jquery.particles.js',
        format: 'iife',
        sourcemap: true,
        globals: {
            jquery: 'jQuery',
            tsparticles: 'window'
        }
    },
    external: [
        'jquery',
        'tsparticles'
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        sourcemaps()
    ]
};