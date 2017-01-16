'use strict';
const _ = require('lodash');
const config = require('./config');
const Redis = require("cofy-ioredis");
const redisClient = new Redis(config.cache);

const RedisCache = function() {
    this.options = _.defaults(_.clone(config.cache), {
        ttl: 60,
        prefix: 'cache:'
    });
    this.redis = redisClient;
};


RedisCache.prototype.get = function*(key) {
    key = this.options.prefix + key;
    let result = yield this.redis.get(key);
    // console.log('RedisCache.prototype.get', typeof(result), key, result);
    if (result && result != null && result != '') {
        result = JSON.parse(result);
    } else {
        result = false;
    }
    return result;
};

RedisCache.prototype.set = function*(key, data, ttl) {
    if (!ttl && isNaN(ttl)) {
        ttl = this.options.ttl;
    }
    ttl = parseInt(ttl);
    key = this.options.prefix + key;

    let dataStr = JSON.stringify(data);
    let multi = this.redis.multi();
    multi.set(key, dataStr);
    multi.expire(key, ttl);
    return yield multi.exec();
};

RedisCache.prototype.del = function*(key) {
    key = this.options.prefix + key;
    return yield this.redis.del(key);
}

module.exports = RedisCache;