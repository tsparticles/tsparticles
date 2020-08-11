import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';

const name = pkg.name
    .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
    .replace(/^\w/, m => m.toUpperCase())
    .replace(/-\w/g, m => m[1].toUpperCase());

export default {
    input: 'src/index.js',
    output: [
        { file: pkg.module, 'format': 'es' },
        { file: pkg.main, 'format': 'umd', name }
    ],
    plugins: [
        svelte(),
        resolve(),
        commonjs(),
        terser()
    ]
};
