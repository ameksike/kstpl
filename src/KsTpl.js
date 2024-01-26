/**
 * @description Allow build/decode/verify base on different format
 * @module KsTpl
 */

/**
 * @typedef {import('../types').TList} TList 
 * @typedef {import('../types').TEnumDrv} TEnumDrv 
 */
const KsDp = require('ksdp');
const path = require('path');

class KsTpl {

    /**
     * @type {Console|null}
     */
    logger = null;

    constructor(opt) {
        this.drv = new KsDp.behavioral.Strategy({
            path: path.resolve(__dirname),
            default: 'driver'
        });
        this.cmd = new KsDp.behavioral.Command();
        this.default = "twing";
        this.logger = console;
        this.configure(opt);
    }

    /**
     * @description configure library
     * @param {Object} [opt] 
     * @param {TEnumDrv} [opt.default=twing] 
     * @param {Console} [opt.log] 
     * @returns {Object} KsTpl
     */
    configure(opt) {
        this.default = opt?.default ?? this.default;
        this.logger = opt?.logger ?? opt?.log ?? this.logger;
        return this;
    }

    /**
     * @description Encoded data from an algorithm
     * @param {TEnumDrv} [algorithm] 
     * @param {TList} [params] 
     * @param {String} [action=compile] 
     * @return {String} data
     */
    run(algorithm, params, action = "compile") {
        try {
            const drv = this.get(algorithm);
            return drv[action](...params);
        }
        catch (error) {
            this.log({
                src: "KsTpl:" + algorithm + ":" + action,
                error: { message: error?.message || error, stack: error?.stack },
                data: params
            });
            return null;
        }
    }

    /**
     * @description set an external driver format
     * @param {Object} payload 
     * @param {String} [alias]
     * @returns {Object}
     */
    use() {
        try {
            this.drv?.set && this.drv.set(...arguments);
            return this;
        }
        catch (error) {
            this.log(error);
            return null;
        }
    }

    /**
     * @description set an external driver format
     * @param {Object} payload 
     * @param {String} [alias]
     * @returns {Object}
     */
    set() {
        return this.use(...arguments);
    }

    /**
     * @description get a certain algorithm implementation 
     * @param {String} [algorithm=twing] 
     * @returns {Object}
     */
    get(algorithm = 'twing') {
        return algorithm && this.drv.get({
            name: algorithm || this.default,
            params: [this]
        });
    }

    /**
     * @description internal log handler 
     */
    log() {
        this.logger?.log && this.logger.log(...arguments);
        return this;
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
     * @param {String} [options.algorithm] 
     * @returns {String}
     */
    render(file, data = {}, options = {}) {
        return this.run(options?.algorithm || this.default, [file, data, options], "render");
    }

    /**
     * @description compile all the options into data string
     * @param {String} content 
     * @param {Object} [data] 
     * @param {String} [data.flow] 
     * @param {Object} [options] 
     * @param {String} [options.flow] 
     * @param {String} [options.open] 
     * @param {String} [options.close]
     * @param {String} [options.algorithm] 
     * @returns {String}
     */
    compile(content, data = {}, options = {}) {
        return this.run(options?.algorithm || this.default, [content, data, options], "compile");
    }
}

module.exports = KsTpl;