'use strict';
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || '3001';
const DEBUG = env !== 'production';
const path = require('path');

let config = {
    env: env,
    port: port,
    app: {
        name: "cpcrawler",
        keys: ["keys"]
    },
    database: {
        mongo: {
            url: 'mongodb://127.0.0.1:27017/cpcrawler',
            poolSize: 5,
        },
    }
};
module.exports = config
