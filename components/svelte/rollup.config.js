import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'umd',
        name: 'particles',
        file: 'dist/svelte-particles.js'
    },
    plugins: [
        svelte({
            customElement: true,
            dev: !production,
        }),

        resolve({
            browser: true,
            dedupe: [ 'svelte', 'tsparticles' ]
        }),

        commonjs(),

        production && terser()
    ]
};