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
            '@tsparticles/engine': 'window'
        }
    },
    external: [
        'jquery',
        '@tsparticles/engine'
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        sourcemaps()
    ]
};
