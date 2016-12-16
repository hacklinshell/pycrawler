'use strict';
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || '3000';
const DEBUG = env !== 'production';
const path = require('path');

let config = {
    env: env,
    port: port,
    app: {
        name: "my_projec",
        keys: ["keys"]
    },
    database: {
        mongo: {
            url: 'mongodb://127.0.0.1:27017/my_projec',
            poolSize: 5,
        },
    }
};
module.exports = config
