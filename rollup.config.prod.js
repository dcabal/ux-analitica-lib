import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/ux-analitica-lib.js',
        format: 'iife',
        plugins: [terser()]
    }
}