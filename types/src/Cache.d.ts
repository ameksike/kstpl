export = Cache;
declare const Cache_base: typeof import("ksdp/types/src/integration/Dip");
declare class Cache extends Cache_base {
    constructor(lib?: any);
    /**
    * @type {Console}
    */
    logger: Console;
    /**
     * @type {String}
     */
    path: string;
    /**
     * @type {String}
     */
    ext: string;
    /**
     * @type {String}
     */
    name: string;
    /**
     * @type {String}
     */
    encoding: string;
    kstpl: any;
    /**
     * @description configure library
     * @param {Object} [opt]
     * @param {String} [opt.path]
     * @param {String} [opt.ext]
     * @param {Console} [opt.logger]
     * @param {String} [opt.encoding]
     * @returns {Cache} self
     */
    configure(opt?: {
        path?: string;
        ext?: string;
        logger?: Console;
        encoding?: string;
    }): Cache;
    /**
     * @description get file info
     * @param {Object} [options]
     * @param {String} [options.name]
     * @param {String} [options.path]
     * @param {String} [options.ext]
     * @returns {{ file: String, ext: String, path:String, filename: String }}
     */
    getPath(options?: {
        name?: string;
        path?: string;
        ext?: string;
    }): {
        file: string;
        ext: string;
        path: string;
        filename: string;
    };
    /**
     * @description get file content
     * @param {Object} [payload]
     * @param {String} [payload.ext]
     * @param {String} [payload.path]
     * @param {String} [payload.encoding]
     * @param {String} [payload.flow]
     * @returns {Promise<String>}
     */
    load(payload?: {
        ext?: string;
        path?: string;
        encoding?: string;
        flow?: string;
    }): Promise<string>;
    /**
     * @description save content into a file
     * @param {Object} [payload]
     * @param {String} [payload.ext]
     * @param {String} [payload.path]
     * @param {String} [payload.encoding]
     * @param {String} [payload.flow]
     * @returns {Promise<String>}
     */
    save(payload?: {
        ext?: string;
        path?: string;
        encoding?: string;
        flow?: string;
    }): Promise<string>;
}
