'use strict'
const _ = require('lodash');

module.exports = {
    indexAction: function*() {
        let respData = {
            name: 'zl',
        }
        yield this.render('modules/console/index', respData);
    }
}
