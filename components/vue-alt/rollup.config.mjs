import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const externals = [ 'vue', 'vue-property-decorator', 'tsparticles-engine' ];

export default [ {
    input: 'src/Particles/index.ts',
    output: {
        format: 'esm',
        file: 'dist/particles.vue.js',
    },
    external: externals,
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
        input: 'src/Particles/index.ts',
        output: {
            format: 'esm',
            file: 'dist/particles.vue.min.js'
        },
        external: externals,
        plugins: [
            typescript({
                //tsconfig: true//,
                // experimentalDecorators: true,
                // module: 'es2015'
            }),
            vue(),
            terser()
        ]
    } ];
