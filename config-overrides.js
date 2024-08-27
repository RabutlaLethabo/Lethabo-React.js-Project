const { override, addWebpackAlias, addWebpackFallback } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackFallback({
        "util": require.resolve("util/")
    })
);
