const Driver = require('../Driver');
const _twig = require('twig');

class Twig extends Driver {

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
        let template = _twig.twig({ data: content });
        return template.render(params);
    }

}

module.exports = Twig;