export = KsTpl;
declare class KsTpl {
    constructor(opt: any);
    /**
     * @type {Console|null}
     */
    logger: Console | null;
    /**
     * @type {Object|null}
     */
    cmd: any | null;
    /**
     * @type {Object|null}
     */
    drv: any | null;
    /**
     * @type {Object|null}
     */
    che: any | null;
    default: string;
    cacheType: string;
    cachePath: string;
    cacheExt: string;
    /**
     * @description configure library
     * @param {Object} [opt]
     * @param {TEnumDrv} [opt.default=twing]
     * @param {Console} [opt.logger]
     * @param {String} [opt.path]
     * @param {String} [opt.driver]
     * @param {String} [opt.cachePath]
     * @param {String} [opt.cacheType]
     * @param {String} [opt.cacheExt]
     * @returns {Object} KsTpl
     */
    configure(opt?: {
        default?: TEnumDrv;
        logger?: Console;
        path?: string;
        driver?: string;
        cachePath?: string;
        cacheType?: string;
        cacheExt?: string;
    }): any;
    path: any;
    /**
     * @description Encoded data from an driver
     * @param {String} [driver]
     * @param {Object} [params]
     * @param {String} [action=compile]
     * @return {String} data
     */
    run(driver?: string, params?: any, action?: string): string;
    /**
     * @description set an external driver format
     * @returns {Object}
     */
    use(...args: any[]): any;
    /**
     * @description set an external driver format
     * @returns {Object}
     */
    set(...args: any[]): any;
    /**
     * @description get a certain driver implementation
     * @param {String} [driver=twing]
     * @returns {Object}
     */
    get(driver?: string): any;
    /**
     * @description internal log handler
     */
    log(...args: any[]): this;
    /**
     * @description render
     * @param {String} [file]
     * @param {Object} [options]
     * @param {String} [options.path]
     * @param {String} [options.ext]
     * @param {String} [options.driver]
     * @returns {String}
     */
    getDrvName(file?: string, options?: {
        path?: string;
        ext?: string;
        driver?: string;
    }): string;
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
    render(file: string, data?: {
        flow?: string;
    }, options?: {
        path?: string;
        ext?: string;
        flow?: string;
        cachePath?: string;
        cacheType?: string;
        cacheExt?: string;
        driver?: string;
    }): Promise<string>;
    /**
     * @description compile all the options into data string
     * @param {String} content
     * @param {Object} [data]
     * @param {String} [data.flow]
     * @param {Object} [options]
     * @param {String} [options.flow]
     * @param {String} [options.open]
     * @param {String} [options.close]
     * @param {String} [options.driver]
     * @returns {String}
     */
    compile(content: string, data?: {
        flow?: string;
    }, options?: {
        flow?: string;
        open?: string;
        close?: string;
        driver?: string;
    }): string;
    /**
     * @description save content into a file
     * @param {String} [content]
     * @param {String} [file]
     * @param {Object} [option]
     */
    save(content?: string, file?: string, option?: any): string;
    /**
     * @description format the content
     * @param {String} content
     * @param {Object} [option]
     * @returns {String}
     */
    format(content: string, option?: any): string;
}
declare namespace KsTpl {
    export { TList, TEnumDrv };
}
type TList = import('./types').TList;
type TEnumDrv = import('./types').TEnumDrv;
