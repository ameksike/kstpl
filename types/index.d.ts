declare const _exports: {
    Driver: typeof Driver;
    KsTpl: typeof KsTpl;
    Cache: typeof Cache;
    logger: Console;
    cmd: any;
    drv: any;
    che: any;
    default: string;
    cacheType: string;
    cachePath: string;
    cacheExt: string;
    configure(opt?: {
        default?: import("./src/types").TEnumDrv;
        logger?: Console;
        path?: string;
        algorithm?: string;
        cachePath?: string;
        cacheType?: string;
        cacheExt?: string;
    }): any;
    path: any;
    run(algorithm?: string, params?: any, action?: string): string;
    use(...args: any[]): any;
    set(...args: any[]): any;
    get(algorithm?: string): any;
    log(...args: any[]): this;
    getDrvName(file?: string, options?: {
        path?: string;
        ext?: string;
        algorithm?: string;
    }): string;
    render(file: string, data?: {
        flow?: string;
    }, options?: {
        path?: string;
        ext?: string;
        flow?: string;
        cachePath?: string;
        cacheType?: string;
        cacheExt?: string;
        algorithm?: string;
    }): Promise<string>;
    compile(content: string, data?: {
        flow?: string;
    }, options?: {
        flow?: string;
        open?: string;
        close?: string;
        algorithm?: string;
    }): string;
    save(content?: string, file?: string, option?: any): string;
    format(content: string, option?: any): string;
};
export = _exports;
import Driver = require("./src/Driver");
import KsTpl = require("./src/KsTpl");
import Cache = require("./src/Cache");
