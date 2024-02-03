export = Driver;
declare const Driver_base: typeof import("ksdp/types/src/integration/Dip");
declare class Driver extends Driver_base {
    constructor(lib?: any);
    /**
    * @type {import('./KsTpl')}
    */
    kstpl: import('./KsTpl');
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
    delimiter: string;
    /**
     * @type {Boolean}
     */
    deep: boolean;
    /**
     * @type {String}
     */
    openDelimiter: string;
    /**
     * @type {String}
     */
    closeDelimiter: string;
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
    configure(opt?: {
        path?: string;
        ext?: string;
        deep?: boolean;
        delimiter?: string;
        openDelimiter?: string;
        closeDelimiter?: string;
        logger?: Console;
    }): Driver;
    /**
     * @description get file info
     * @param {String} name
     * @param {Object} [options]
     * @param {String} [options.ext]
     * @param {String} [options.path]
     * @param {Boolean} [options.absolute]
     * @returns {{ file: String, ext: String, path:String, filename: String }}
     */
    getPath(name: string, options?: {
        ext?: string;
        path?: string;
        absolute?: boolean;
    }): {
        file: string;
        ext: string;
        path: string;
        filename: string;
    };
    /**
     * @description get file content
     * @param {String} name
     * @param {Object} options
     * @returns {Promise<*>} content
     */
    getContent(name: string, options: any): Promise<any>;
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
    render(name: string, data?: {
        flow?: string;
    }, options?: {
        path?: string;
        ext?: string;
        flow?: string;
    }): Promise<string>;
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
    compile(content: string, params?: {
        flow?: string;
    }, options?: {
        flow?: string;
        open?: string;
        close?: string;
        delimiter?: string;
        openDelimiter?: string;
        closeDelimiter?: string;
        escape?: string;
        deep?: boolean;
    }): string;
    /**
     * @description save content into a file
     * @param {String} [content]
     * @param {String} [file]
     * @param {Object} [option]
     */
    save(content?: string, file?: string, option?: any): Promise<void>;
    /**
     * @description format the content
     * @param {String} content
     * @param {Object} [option]
     * @returns {String}
     */
    format(content: string, option?: any): string;
}
