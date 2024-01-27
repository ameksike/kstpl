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
        try {
            let template = _twig.twig({ data: content });
            return template.render(params);
        }
        catch (error) {
            this.logger?.error({
                flow: data?.flow || options?.flow,
                src: "KsTpl:Twig:compile",
                message: error?.message || error,
                data: { name, path, local: __dirname }
            });
            return "";
        }
    }

}

module.exports = Twig;