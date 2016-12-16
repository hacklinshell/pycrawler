'use strict';
//加载modules的models 和index.js
const _ = require('lodash');
const path = require('path');
const fs = require('fs');

let Modules = function() {
    let folder = path.join(__dirname, '../modules'); //modules目录
    this.modules = {};
    let self = this;
    if (fs.existsSync(folder)) {
        let modulesDir = fs.readdirSync(folder); //读取全部的模块路径
        _.each(modulesDir, function(v, k) {
            let dir = path.join(folder, v); //例如modules/consonle目录
            //判断目录是否存在
            if (fs.statSync(dir).isDirectory()) {
                let moduleName = v.toLowerCase(); //例如console
                //判断index.js是否存在
                let filepath = path.join(dir, 'index.js');
                if (fs.existsSync(filepath)) {
                    let m = require(filepath);
                    self.modules[moduleName] = new m();
                }
            }
        });
    }
}

Modules.prototype.getCollections = function() {
    let self = this;
    let all_collections = {};
    _.each(_.keys(self.modules), function(v, k) {
        let collections = self.modules[v].models();
        _.each(collections, function(v, k) {
            all_collections.push(v);
        });
    });
    return all_collections;
};
Modules.prototype.getModules = function() {
    return this.modules;
};

module.exports = Modules;
