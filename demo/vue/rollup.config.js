import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript';
import {terser} from 'rollup-plugin-terser';

export default [{
    input: 'src/components/Particles/@tsparticles/vue2',
    output: {
        format: 'esm',
        file: 'dist/@tsparticles/vue2.js'
    },
    external: ['vue'],
    plugins: [
        typescript({
            //tsconfig: true//,
            // experimentalDecorators: true,
            // module: 'es2015'
        }),
        vue()
    ]
},
    {
        input: 'src/components/Particles/@tsparticles/vue2',
        output: {
            format: 'esm',
            file: 'dist/@tsparticles/vue2.min.js'
        },
        external: ['vue'],
        plugins: [
            typescript({
                //tsconfig: true//,
                // experimentalDecorators: true,
                // module: 'es2015'
            }),
            vue(),
            terser()
        ]
    }];
