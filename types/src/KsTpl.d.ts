export = KsTpl;
declare class KsTpl {
    constructor(opt: any);
    /**
     * @type {Console|null}
     */
    logger: Console | null;
    drv: import("ksdp/types/src/behavioral/Strategy");
    cmd: import("ksdp/types/src/behavioral/Command");
    default: string;
    /**
     * @description configure library
     * @param {Object} [opt]
     * @param {TEnumDrv} [opt.default=twing]
     * @param {Console} [opt.log]
     * @returns {Object} KsTpl
     */
    configure(opt?: {
        default?: TEnumDrv;
        log?: Console;
    }): any;
    /**
     * @description Encoded data from an algorithm
     * @param {TEnumDrv} [algorithm]
     * @param {TList} [params]
     * @param {String} [action=build]
     * @return {String} data
     */
    run(algorithm?: any, params?: any, action?: string): string;
    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data
     * @param {TEnumDrv} [algorithm=twing]
     * @param {Object} [options] Object config options based on selected algorithm.
     * @return {String|Buffer} data
     */
    build(data: string | number | any, algorithm?: any, options?: any): string | Buffer;
    /**
     * @description set an external driver format
     * @param {Object} payload
     * @param {String} [alias]
     * @returns {Object}
     */
    use(...args: any[]): any;
    /**
     * @description set an external driver format
     * @param {Object} payload
     * @param {String} [alias]
     * @returns {Object}
     */
    set(...args: any[]): any;
    /**
     * @description get a certain algorithm implementation
     * @param {String} [algorithm=twing]
     * @returns {Object}
     */
    get(algorithm?: string): any;
    /**
     * @description internal log handler
     */
    log(...args: any[]): this;
}
declare namespace KsTpl {
    export { TList, TEnumDrv };
}
type TList = any;
type TEnumDrv = any;
