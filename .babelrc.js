const isTest = (api) => {
    return process.env.NODE_ENV === 'test' || api.env('test');
}

module.exports = (api) => {
    const presets = [
        ["@babel/preset-env", { "useBuiltIns": "entry", "corejs": 3 }],
        "@babel/preset-react",
    ];

    if (!isTest(api)) {
        presets.push("@babel/preset-typescript");
    }

    api.cache(false);
    return { presets };
}
