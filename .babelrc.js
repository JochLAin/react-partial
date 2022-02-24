module.exports = (api) => {
    api.cache(false);

    return {
        presets: [
            ["@babel/preset-env", { "useBuiltIns": "entry", "corejs": 3 }],
            "@babel/preset-react",
            "@babel/preset-typescript",
        ],
    };
}
