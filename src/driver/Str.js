const Driver = require('../Driver');

class Str extends Driver {

    /**
     * @description Interpolate all the options into data string
     * @param {String} content 
     * @param {Object} [params] 
     * @param {String} [params.flow] 
     * @param {Object} [options] 
     * @param {String} [options.flow] 
     * @param {String} [options.delimiter] 
     * @param {String} [options.openDelimiter] 
     * @param {String} [options.closeDelimiter] 
     * @param {Boolean} [options.deep] 
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
            const deep = options?.deep ?? this.deep;
            const open = options?.openDelimiter || this.openDelimiter || "{{";
            const close = options?.closeDelimiter || this.closeDelimiter || "}}";
            if (params) {
                for (let i in params) {
                    if (!rex(open + ".*" + close).test(content)) {
                        break;
                    }
                    let value = params[i];
                    if (deep && rex(open + ".*" + close).test(value) && rex(open + i + close).test(content)) {
                        value = this.compile(value, params, options);
                    }
                    content = content.replace(rex(open + i + close), value);
                }
            }
            return content.replace(/\\r|\r|\n|\\n/g, "");
        } catch (error) {
            this.logger?.error({
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