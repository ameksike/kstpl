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
    logger;

    /**
     * @type {KsDp.behavioral.Command}
     */
    cmd;

    /**
     * @type {KsDp.behavioral.Strategy}
     */
    drv;

    /**
     * @type {KsDp.behavioral.Strategy}
     */
    che;

    constructor(opt) {
        this.drv = new KsDp.behavioral.Strategy({
            path: path.resolve(__dirname),
            default: 'driver'
        });
        this.che = new KsDp.behavioral.Strategy({
            path: path.resolve(__dirname),
            default: 'cache'
        });
        this.cmd = new KsDp.behavioral.Command();
        this.default = "twing";
        this.logger = null;
        this.cacheType = "";
        this.cachePath = "";
        this.cacheExt = "";
        this.configure(opt);
    }

    /**
     * @description configure library
     * @param {Object} [opt] 
     * @param {TEnumDrv} [opt.default=twing] 
     * @param {Console} [opt.logger] 
     * @param {String} [opt.path] 
     * @param {String} [opt.cachePath] 
     * @param {String} [opt.cacheType] 
     * @returns {Object} KsTpl
     */
    configure(opt) {
        this.default = opt?.default ?? this.default;
        this.logger = opt?.logger ?? this.logger;
        this.path = opt?.path ?? this.path;
        this.cacheType = opt?.cacheType ?? this.cacheType;
        this.cachePath = opt?.cachePath ?? this.cachePath;
        this.cacheExt = opt?.cacheExt ?? this.cacheExt;
        this.run(opt?.algorithm || this.default, [opt], "configure");
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
     * @param {String} [file] 
     * @param {Object} [options] 
     * @param {String} [options.path] 
     * @param {String} [options.ext] 
     * @param {String} [options.algorithm] 
     * @returns {String}
     */
    getDrvName(file = "", options = {}) {
        return options?.algorithm || this.default;
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
     * @param {String} [options.cachePath] 
     * @param {String} [options.cacheType] 
     * @param {String} [options.cacheExt] 
     * @param {String} [options.algorithm] 
     * @returns {Promise<String>}
     */
    async render(file, data = {}, options = {}) {
        let cacheType = options?.cacheType ?? this.cacheType;
        let cache = cacheType ? this.che.get({ name: cacheType, params: [this] }) : null;
        let content = cache ? await cache?.load({
            name: file,
            path: options?.cachePath || this.cachePath,
            ext: options?.cacheExt || this.cacheExt
        }) : null;
        if (content) {
            return content;
        }
        content = await this.run(this.getDrvName(file, options), [file, data, options], "render");
        if (cache) {
            cache?.save({
                content,
                path: options?.cachePath || this.cachePath,
                ext: options?.cacheExt || this.cacheExt
            });
        }
        return content;
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

    /**
     * @description save content into a file
     * @param {String} [content] 
     * @param {String} [file] 
     * @param {Object} [option] 
     */
    save(content, file = "demo.cache", option = {}) {
        return this.run(option?.algorithm || this.default, [content, file, option], "save");
    }

    /**
     * @description format the content 
     * @param {String} content 
     * @param {Object} [option] 
     * @returns {String}
     */
    format(content, option = {}) {
        return this.run(option?.algorithm || this.default, [content, option], "save");
    }
}

module.exports = KsTpl;