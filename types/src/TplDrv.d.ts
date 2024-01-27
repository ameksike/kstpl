export = Driver;
declare class Driver {
    constructor(cfg?: {});
    /**
    * @type {Console}
    */
    logger: Console;
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
    render(file: string, data?: {
        flow?: string;
    }, options?: {
        path?: string;
        ext?: string;
        flow?: string;
    }): string;
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
    compile(content: string, params?: {
        flow?: string;
    }, options?: {
        flow?: string;
        open?: string;
        close?: string;
    }): string;
}
