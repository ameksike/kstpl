const _path = require('path');
const KsDp = require('ksdp');

class Driver extends KsDp.integration.Dip {

    /**
    * @type {import('./KsTpl')}
    */
    kstpl;

    /**
    * @type {Console}
    */
    logger;

    /**
     * @type {String}
     */
    path;

    /**
     * @type {String}
     */
    ext;

    /**
     * @type {String}
     */
    delimiter;

    /**
     * @type {Boolean}
     */
    deep;

    /**
     * @type {String}
     */
    openDelimiter;

    /**
     * @type {String}
     */
    closeDelimiter;

    constructor(lib = null) {
        super();
        this.logger = lib?.logger || null;
        this.path = _path.join(__dirname, '../../../');
        this.ext = 'html';
        this.kstpl = lib;

        this.delimiter = null;
        this.openDelimiter = null;
        this.closeDelimiter = null;
    }

    /**
     * @description configure library
     * @param {Object} [opt] 
     * @param {String} [opt.path]
     * @param {String} [opt.ext] 
     * @param {Boolean} [opt.deep] 
     * @param {String} [opt.delimiter] 
     * @param {String} [opt.openDelimiter] 
     * @param {String} [opt.closeDelimiter] 
     * @param {Console} [opt.logger] 
     * @returns {Driver} self
     */
    configure(opt) {
        this.path = opt?.path ?? this.path;
        this.ext = opt?.ext ?? this.ext;
        this.logger = opt?.logger ?? this.logger;
        this.deep = opt?.deep ?? this.deep;
        this.delimiter = opt?.delimiter ?? this.delimiter;
        this.openDelimiter = opt?.openDelimiter ?? this.openDelimiter;
        this.closeDelimiter = opt?.closeDelimiter ?? this.closeDelimiter;
        return this;
    }

    /**
     * @description get file info 
     * @param {String} name 
     * @param {Object} [options]
     * @param {String} [options.ext] 
     * @param {String} [options.path] 
     * @param {Boolean} [options.absolute] 
     * @returns {{ file: String, ext: String, path:String, filename: String }} 
     */
    getPath(name, options) {
        const _path = require("path");
        const ext = options?.ext ? "." + options.ext : "";
        const file = options?.absolute || !options?.path ? _path.resolve(name + ext) : _path.join(options.path, name + ext);
        const path = _path.dirname(file);
        const filename = _path.basename(file);
        return { path, file, filename, ext };
    }

    /**
     * @description get file content
     * @param {String} name 
     * @param {Object} options 
     * @returns {Promise<*>} content
     */
    getContent(name, options) {
        options.ext = options?.ext ?? this.ext;
        options.path = options?.path ?? this.path;
        const { path, file } = this.getPath(name, options);
        if (!path) return Promise.resolve("");
        const fs = require('fs').promises;
        return fs.readFile(file, options.encoding || "utf8");
    }

    /**
     * @description render 
     * @param {String} name 
     * @param {Object} [data] 
     * @param {String} [data.flow] 
     * @param {Object} [options] 
     * @param {String} [options.path] 
     * @param {String} [options.ext] 
     * @param {String} [options.flow] 
     * @returns {Promise<String>}
     */
    async render(name, data = {}, options = {}) {
        try {
            const content = await this.getContent(name, options);
            return this.compile(content, data, options);
        }
        catch (error) {
            this.logger?.error({
                flow: data?.flow || options?.flow,
                src: "KsTpl:Str:compile",
                error: { message: error?.message || error, stack: error?.stack },
                data: { name, data, options }
            });
            return "";
        }
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
     * @param {String} [options.delimiter] 
     * @param {String} [options.openDelimiter] 
     * @param {String} [options.closeDelimiter] 
     * @param {String} [options.escape] 
     * @param {Boolean} [options.deep] 
     * @returns {String}
     */
    compile(content, params = {}, options = {}) {
        return content;
    }

    /**
     * @description save content into a file
     * @param {String} [content] 
     * @param {String} [file] 
     * @param {Object} [option] 
     */
    save(content, file = "demo.cache", option = {}) {
        file = _path.join(option?.path || "", file || "demo.cache");
        const fs = require('fs').promises;
        return fs.writeFile(file, content);
    }

    /**
     * @description format the content 
     * @param {String} content 
     * @param {Object} [option] 
     * @returns {String}
     */
    format(content, option = {}) {
        return content;
    }
}

module.exports = Driver;