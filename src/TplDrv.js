class TplDrv {

    /**
    * @type {Console}
    */
    logger;

    constructor(cfg = {}) {
        this.logger = cfg?.logger || null;
    }


    /**
     * @description render 
     * @param {String} file 
     * @param {Object} [data] 
     * @param {String} [data.flow] 
     * @param {Object} [options] 
     * @param {String} [options.path] 
     * @param {String} [options.ext] 
     * @param {String} [options.flow] 
     * @returns {String}
     */
    render(file, data = {}, options = {}) {
        return file;
    }

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
        return content;
    }
}

module.exports = TplDrv;