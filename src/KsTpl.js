/**
 * @description Allow build/decode/verify base on different format
 * @module KsTpl
 */

/**
 * @typedef {import('./types').TList} TList 
 * @typedef {import('./types').TEnumDrv} TEnumDrv 
 */
const KsDp = require('ksdp');
const path = require('path');

class KsTpl {

    /**
     * @type {Console|null}
     */
    logger;

    /**
     * @type {Object|null}
     */
    cmd;

    /**
     * @type {Object|null}
     */
    drv;

    /**
     * @type {Object|null}
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
     * @param {String} [opt.driver] 
     * @param {Boolean} [opt.deep] 
     * @param {String} [opt.cachePath] 
     * @param {String} [opt.cacheType] 
     * @param {String} [opt.cacheExt] 
     * @returns {Object} KsTpl
     */
    configure(opt) {
        this.default = opt?.default ?? this.default;
        this.logger = opt?.logger ?? this.logger;
        this.path = opt?.path ?? this.path;
        this.cacheType = opt?.cacheType ?? this.cacheType;
        this.cachePath = opt?.cachePath ?? this.cachePath;
        this.cacheExt = opt?.cacheExt ?? this.cacheExt;
        this.run(opt?.driver || this.default, [opt], "configure");
        return this;
    }

    /**
     * @description Encoded data from an driver
     * @param {String} [driver] 
     * @param {Object} [params] 
     * @param {String} [action=compile] 
     * @return {String} data
     */
    run(driver, params, action = "compile") {
        try {
            const drv = this.get(driver);
            return drv[action](...params);
        }
        catch (error) {
            this.log({
                src: "KsTpl:" + driver + ":" + action,
                error: { message: error?.message || error, stack: error?.stack },
                data: params
            });
            return null;
        }
    }

    /**
     * @description set an external driver format
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
     * @returns {Object}
     */
    set() {
        return this.use(...arguments);
    }

    /**
     * @description get a certain driver implementation 
     * @param {String} [driver=twing] 
     * @returns {Object}
     */
    get(driver = 'twing') {
        return driver && this.drv.get({
            name: driver || this.default,
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
     * @param {String} [options.driver] 
     * @returns {String}
     */
    getDrvName(file = "", options = {}) {
        return options?.driver || this.default;
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
     * @param {String} [options.driver] 
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
        cache?.save({
            content,
            name: file,
            path: options?.cachePath || this.cachePath,
            ext: options?.cacheExt || this.cacheExt
        });
        return content;
    }

    /**
     * @description compile all the options into data string
     * @param {String} content 
     * @param {Object} [data] 
     * @param {String} [data.flow] 
     * @param {Object} [options] 
     * @param {String} [options.flow] 
     * @param {String} [options.delimiter] 
     * @param {String} [options.openDelimiter] 
     * @param {String} [options.closeDelimiter] 
     * @param {String} [options.driver] 
     * @returns {String}
     */
    compile(content, data = {}, options = {}) {
        return this.run(options?.driver || this.default, [content, data, options], "compile");
    }

    /**
     * @description save content into a file
     * @param {String} [content] 
     * @param {String} [file] 
     * @param {Object} [option] 
     */
    save(content, file = "demo.cache", option = {}) {
        return this.run(option?.driver || this.default, [content, file, option], "save");
    }

    /**
     * @description format the content 
     * @param {String} content 
     * @param {Object} [option] 
     * @returns {String}
     */
    format(content, option = {}) {
        return this.run(option?.driver || this.default, [content, option], "save");
    }
}

module.exports = KsTpl;