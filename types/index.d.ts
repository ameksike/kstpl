declare const _exports: {
    TplDrv: typeof TplDrv;
    KsTpl: typeof KsTpl;
    logger: Console;
    drv: import("ksdp/types/src/behavioral/Strategy");
    cmd: import("ksdp/types/src/behavioral/Command");
    default: string;
    configure(opt?: {
        default?: any;
        log?: Console;
    }): any;
    run(algorithm?: any, params?: any, action?: string): string;
    build(data: any, algorithm?: any, options?: any): string | Buffer;
    use(...args: any[]): any;
    set(...args: any[]): any;
    get(algorithm?: string): any;
    log(...args: any[]): this;
};
export = _exports;
import TplDrv = require("./src/TplDrv");
import KsTpl = require("./src/KsTpl");
