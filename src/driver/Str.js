const TplDrv = require('../TplDrv');

class Str extends TplDrv {

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
                src: "KsTpl:Str:compile",
                error: { message: error?.message || error, stack: error?.stack },
                data: { content, params, options }
            });
            return null;
        }
    }
}

exports = module.exports = Str;