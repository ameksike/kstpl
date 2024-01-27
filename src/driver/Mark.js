const TplDrv = require('../TplDrv');

class Mark extends TplDrv {

    /**
     * @description Interpolate all the options into data string
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
            const { marked } = require('marked');
            return marked(content, options);
        } catch (error) {
            this.logger.error({
                flow: params?.flow || options?.flow,
                src: "KsTpl:Markdown:compile",
                error: { message: error?.message || error, stack: error?.stack },
                data: { content, params, options }
            });
            return null;
        }
    }
}

exports = module.exports = Mark;