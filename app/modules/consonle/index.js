'use strict';
const _ = require('lodash');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

let Module = function() {}

//定义路由
Module.prototype.routers = function() {
    let router = new Router();
    let controllerDir = path.join(__dirname, 'controller');
    if (fs.existsSync(controllerDir)) {
        let files = fs.readdirSync(controllerDir);
        _.each(files, function(v, k) {
            let controller = require(path.join(controllerDir, v));
            let controllerName = v.replace('Controller.js', '');
            let actions = _.keys(controller);
            controllerName = controllerName.toLowerCase();
            _.each(actions, function(v, k) {
                if (v.lastIndexOf('Action')) {
                    let actionName = v.replace('Action', '');
                    if (controllerName == 'console') {
                        router.all('/' + controllerName + '/' + actionName, controller[v])
                    }
                }
            })
        })
        router.all('/', require(path.join(controllerDir, 'MainController'))['indexAction']);
    }
    return router.middleware();
};
module.exports = Module;
