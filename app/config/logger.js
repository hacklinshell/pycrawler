'use strict';

const winston = require('winston'); //日志
const config = require('./config');
const path = require('path');
const fs = require('fs');
const moment = require('moment'); //时间格式化

module.exports = function(fileName) {
    var logger = new(winston.Logger)({
        transports: [
            new(winston.transports.Console)({
                level: 'debug',
                colorize: false,
                json: false,
                prettyPrint: false,
                timestamp: function() {
                    return moment().format('YYYY-MM-DD HH:mm:ss')
                }
            }),
        ]
    });

    return logger;
}
