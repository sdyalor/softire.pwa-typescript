import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import common from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const babelRc = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          esmodules: true
          // "chrome": 71
          // "ie": 11
        },
        useBuiltIns: 'entry',
        corejs: 3,
        debug: true
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-syntax-dynamic-import'],
    [
      '@babel/plugin-proposal-decorators',
      { decoratorsBeforeExport: true }
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
};

const babelConf = {
  extensions,
  babelrc: false,
  ...babelRc
  // exclude: ['node_modules/**']
};

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    serve({
      contentBase: '',
      port: 8001
    }),
    livereload({
      watch: 'dist'
    }),
    common(),
    resolve({ extensions }),
    babel(babelConf),
    postcss({
      plugins: [],
      modules: true,
      extract: true
    })
  ]
};
