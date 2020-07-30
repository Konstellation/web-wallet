module.exports = {
    presets: [
        [
            '@vue/app',
            {
                useBuiltIns: 'entry',
            },
        ],
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
            },
        ],
    ],
    plugins: [
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-async-to-generator',
    ],
};
