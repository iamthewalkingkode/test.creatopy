const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@link-color": '#596fff',
                            '@primary-color': '#1c1c1f',
                            "@border-radius-base": '8px',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};