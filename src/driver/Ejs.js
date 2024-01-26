const TplDrv = require('../TplDrv');
const ejs = require('ejs');

class Ejs extends TplDrv {

    /**
     * @description compile all the options into data string
     * @param {String} content 
     * @param {Object} [params] 
     * @param {String} [params.flow] 
     * @param {Object} [options] 
     * @param {String} [options.flow] 
     * @param {String} [options.open] 
     * @param {String} [options.close] 
     * @returns {String}
     */
    compile(content, params = {}, options = {}) {
        return ejs.compile(content, params);
    }

}

module.exports = Ejs;