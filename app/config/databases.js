'use strict';
const _ = require('lodash');
const config = require('./config');
const Waterline = require('waterline');
const mongo = require('sails-mongo');

let orm_settings = {
    adapters: { //waterline 使用的那个适配器
        'mongo': mongo,
    },
    connections: { //具体适配器的配置
        mongo: _.defaults(_.clone(config.database.mongo), {
            adapter: 'mongo',
            auto_reconnect: true,
            reconnectInterval: 1000,
            reconnectTries: 99999999,
            wlNext: {
                caseSensitive: true
            }
        })
    },
    defaults: {
        migrate: 'safe'
    }
};
//通过闭包将数据集合全部进行加载并且提供waterline的初始化接口
module.exports = function(collections) {
    let orm = new Waterline();
    _.each(collections, function(v, k) {
        orm.loadCollection(v);
    });
    return {
        initialize: function(cb) {
            orm.initialize(orm_settings, cb);
        }
    };
}
