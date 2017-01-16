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
    session: {
        redis: {
            host: "127.0.0.1",
            port: 6379,
            options: {
                dropBufferSupport: true,
            },
            dropBufferSupport: true,
            // "password":""
        },
        prefix: 'uwifi:session',
        ttl: 3600 * 1000 //单位毫秒
    },
    database: {
        mongo: {
            url: 'mongodb://127.0.0.1:27017/cpcrawler',
            poolSize: 5,
        },
    }
};
module.exports = config