const _path = require('path');
const KsDp = require('ksdp');

class Cache extends KsDp.integration.Dip {

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
    name;

    /**
     * @type {String}
     */
    encoding;

    constructor(lib = null) {
        super();
        this.logger = lib?.logger || null;
        this.path = _path.join(__dirname, '../../../');
        this.ext = 'cache.html';
        this.name = 'store';
        this.encoding = 'utf8';
        this.kstpl = lib;
    }

    /**
     * @description configure library
     * @param {Object} [opt] 
     * @param {String} [opt.path]
     * @param {String} [opt.ext] 
     * @param {Console} [opt.logger] 
     * @param {String} [opt.encoding] 
     * @returns {Cache} self
     */
    configure(opt) {
        this.ext = opt?.ext ?? this.ext;
        this.path = opt?.path ?? this.path;
        this.logger = opt?.logger ?? this.logger;
        return this;
    }

    /**
     * @description get file info 
     * @param {Object} [options]
     * @param {String} [options.name]
     * @param {String} [options.path]
     * @param {String} [options.ext] 
     * @returns {{ file: String, ext: String, path:String, filename: String }} 
     */
    getPath(options = {}) {
        options.ext = options?.ext || this.ext;
        options.path = options?.path || this.path;
        options.name = options?.name || this.name;
        const ext = options?.ext ? "." + options.ext : "";
        const file = _path.join(options?.path || "", options?.name + ext);
        const path = _path.dirname(file);
        const filename = _path.basename(file);
        return { path, file, filename, ext };
    }

    /**
     * @description get file content 
     * @param {Object} [payload]
     * @param {String} [payload.ext] 
     * @param {String} [payload.path] 
     * @param {String} [payload.encoding] 
     * @param {String} [payload.flow] 
     * @returns {Promise<String>} 
     */
    async load(payload) {
        return null;
    }

    /**
     * @description save content into a file
     * @param {Object} [payload]
     * @param {String} [payload.ext] 
     * @param {String} [payload.path] 
     * @param {String} [payload.encoding] 
     * @param {String} [payload.flow] 
     * @returns {Promise<String>}
     */
    async save(payload = {}) {
        return null;
    }
}

module.exports = Cache;