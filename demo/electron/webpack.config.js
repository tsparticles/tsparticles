const path = require('path');

export default {
    entry: './client/client.js',
    output: {
        path: path.resolve(__dirname, 'client', 'dist'),
        filename: 'bundle.js',
    },
};
