'use strict';
const _ = require('lodash');
const fs = require('fs');
const koa = require('koa');
const path = require('path');
const serve = require('koa-static'); //处理静态资源文件
const mount = require('koa-mount'); //挂载一个中间件或者koa应用作为路由
const favicon = require('koa-favicon') //网站小图标处理服务的koa中间件

const bodyParser = require('koa-bodyparser') //body 解析 可以设置解析的格式，编码方式，解析的大小限制，以及错误处理等
const bodyXmlParser = require('koa-xml-body').default //解析xml body请求
    // const elasticsearch = require('elasticsearch') //用于索引的工具
const moment = require('moment') //轻量级的时间操作库
const locale = require('koa-locale') //设置语言locale

//定义模块
const Modules = require('./config/modules');
const config = require('./config/config');
const Dstabase = require('./config/databases');
const Logger = require('./config/logger');

//实例化对象
const modules = new Modules();
const logger = new Logger();
const database = new Dstabase(modules.getCollections()); //模块数据库

process.setMaxListeners(0); //取消node的最大监听数限制

let app = koa();

locale(app, 'zh-cn');

//错误处理
app.on('error', function(err) {
    logger.error('app error', err, err.stack);
});

//配置app实例属性
app.name = config.app.name;
app.keys = config.app.keys;
app.proxy = true;

app.use(bodyXmlParser());
app.use(bodyParser({
    extendTypes: ['json', 'form', 'text']
}));

app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
app.use(serve(path.join(__dirname, '../public')));

//输出公共变量
app.use(function*(next) {
    this.config = config;
    this.models = this.app.modules;
    this.logger = logger;
    yield next;
    this.models = null;
    this.logger = null;
});
//挂载模块 路由
var m = modules.getModules();
_.each(_.keys(m), function(v, k) {
    app.use(mount('/' + v, m[v].routers()));
});

app.use(mount('/', function*() {
    this.body = 'cpcrawler init '
}));
database.initialize(function(err, models) {
    if (err) {
        throw err;
    }
    app.models = models;
    app.listen(config.port, function(err) {
        if (!err) {
            logger.info('http start listen', config.port);
        }
    })
});
