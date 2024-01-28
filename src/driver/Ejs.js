const Driver = require('../Driver');
const ejs = require('ejs');

class Ejs extends Driver {

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
            this.delimiter && (ejs.delimiter = this.delimiter);
            this.openDelimiter && (ejs.openDelimiter = this.openDelimiter);
            this.closeDelimiter && (ejs.closeDelimiter = this.closeDelimiter);
            return ejs.render(content, params, options);
        }
        catch (error) {
            this.logger?.error({
                flow: data?.flow || options?.flow,
                src: "KsTpl:Ejs:compile",
                message: error?.message || error,
                data: { content, params, options }
            });
            return "";
        }
    }

}

module.exports = Ejs;