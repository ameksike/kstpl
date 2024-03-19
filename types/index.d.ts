declare const _exports: {
    Driver: typeof Driver;
    KsTpl: typeof KsTpl;
    Cache: typeof Cache;
    logger: Console;
    cmd: any;
    drv: any;
    che: any;
    map: any;
    ext: string;
    default: string;
    cacheType: string;
    cachePath: string;
    cacheExt: string;
    configure(opt?: {
        default?: import("./src/types").TEnumDrv;
        logger?: Console;
        path?: string;
        driver?: string;
        deep?: boolean;
        map?: any;
        ext?: string;
        cachePath?: string;
        cacheType?: string;
        cacheExt?: string;
    }): any;
    path: any;
    run(driver?: string, params?: any, action?: string): string;
    use(...args: any[]): any;
    set(...args: any[]): any;
    get(driver?: string): any;
    getDrvName(file?: string, options?: {
        path?: string;
        ext?: string;
        driver?: string;
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
        driver?: string;
    }): Promise<string>;
    compile(content: string, data?: {
        flow?: string;
    }, options?: {
        driver?: string;
        flow?: string;
        open?: string;
        close?: string;
        delimiter?: string;
        openDelimiter?: string;
        closeDelimiter?: string;
        escape?: string;
        deep?: boolean;
    }): string;
    save(content?: string, file?: string, option?: any): string;
    format(content: string, option?: any): string;
    "__#8@#getExt"(filename: string): string;
};
export = _exports;
import Driver = require("./src/Driver");
import KsTpl = require("./src/KsTpl");
import Cache = require("./src/Cache");
