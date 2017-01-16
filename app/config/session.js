'use strict';

// const redisStore = require('koa-redis');
const session = require('koa-generic-session');
const redisStore = require('koa-session-ioredis');
const config = require('./config');

module.exports = function() {
    return session({
        rolling: true,
        ttl: config.session.ttl || 7200 * 1000,
        store: redisStore(config.session.redis),
        prefix: config.session.prefix != '' ? config.session.prefix + ':' : 'koa:'
    });
}