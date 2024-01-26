const _path = require('path');
class TplDrv {

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

    constructor(cfg = {}) {
        this.logger = cfg?.logger || null;
        this.path = _path.join(__dirname, '../../../');
        this.ext = 'html';
    }

    /**
     * @description configure library
     * @param {Object} [opt] 
     * @param {String} [opt.path] 
     * @param {Console} [opt.logger] 
     * @returns {TplDrv} self
     */
    configure(opt) {
        this.path = opt?.path ?? this.path;
        this.ext = opt?.ext ?? this.ext;
        this.logger = opt?.logger ?? opt?.log ?? this.logger;
        return this;
    }

    /**
     * @description get file info 
     * @param {String} name 
     * @param {Object} [options]
     * @param {String} [options.ext] 
     * @returns {{ file: String, ext: String, path:String, filename: String }} 
     */
    getPath(name, options) {
        const _path = require("path");
        const ext = options?.ext ? "." + options.ext : "";
        const file = _path.join(options?.path || "", name + ext);
        const path = _path.dirname(file);
        const filename = _path.basename(file);
        return { path, file, filename, ext };
    }

    /**
     * @description get file content
     * @param {String} name 
     * @param {Object} options 
     * @returns {Promise<String>} content
     */
    getContent(name, options) {
        options.ext = options?.ext ?? this.ext;
        options.path = options?.path ?? this.path;
        const { path, file } = this.getPath(name, options);
        if (!path) return "";
        const fs = require('fs').promises;
        return fs.readFile(file, options.encoding || "utf8");
    }

    /**
     * @description render 
     * @param {String} name 
     * @param {Object} [data] 
     * @param {Object} [options] 
     * @param {String} [options.path] 
     * @param {String} [options.ext] 
     * @param {String} [options.flow] 
     * @returns {Promise<String>}
     */
    async render(name, data = {}, options = {}) {
        const content = await this.getContent(name, options);
        return this.compile(content, data, options);
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