const TplDrv = require('../TplDrv');

class Str extends TplDrv {

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
        const file = name + ext;
        const path = _path.dirname(file);
        const filename = _path.basename(file);
        return { path, file, filename, ext };
    }

    /**
     * @description render file view 
     * @param {String} file 
     * @param {Object} [data] 
     * @param {String} [data.flow] 
     * @param {Object} [options] 
     * @param {String} [options.path] 
     * @param {String} [options.ext] 
     * @param {String} [options.flow] 
     * @returns {String}
     */
    render(file, data = {}, options = {}) {
        if (!file) return '';
        try {
            const fs = require("fs");
            const src = this.getPath(file, options);
            const content = fs.readFileSync(src?.file, { encoding: 'utf8', flag: 'r' }) || "";
            return this.interpolate(content, data, options)
        }
        catch (error) {
            this.logger.error({
                flow: data?.flow || options?.flow,
                src: "util:TPLHandler:compile",
                error: { message: error?.message || error, stack: error?.stack },
                data: { file, data, options }
            });
            return null;
        }
    }
    /**
     * @description Interpolate all the options into data string
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
        function rex(val, opt = "g") {
            try {
                return new RegExp(val, opt);
            } catch (e) {
                return val;
            }
        }
        try {
            const { open = "{{", close = "}}" } = options;
            if (params) {
                for (let i in params) {
                    content = content.replace(rex(open + i + close), params[i]);
                }
            }
            return content.replace(/\\r|\r|\n|\\n/g, "");
        } catch (error) {
            this.logger.error({
                flow: params?.flow || options?.flow,
                src: "util:TPLHandler:interpolate",
                error: { message: error?.message || error, stack: error?.stack },
                data: { content, params, options }
            });
            return null;
        }
    }
}

exports = module.exports = Str;