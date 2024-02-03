const Driver = require('../Driver');
const _twing = require("twing");
/**
 * @link https://twing.nightlycommit.com/usage.html
 * @link https://twing-api.nightlycommit.com/
 */
class Twing extends Driver {

    /**
     * @description Render templates based on twing lib
     * @param {String} name 
     * @param {Object} [data] 
     * @param {String} [data.flow]
     * @param {Object} [options] 
     * @param {String} [options.path] 
     * @param {String} [options.ext] 
     * @param {String} [options.flow] 
     * @param {Array} [options.functions] 
     * @requires twing
     * @returns {Promise<string>}
     * @example
     * ................. TEMPLATE FILE
     *	<ul>  
     *		{% for user in users %}
     *        	<li>{{ user.username }}</li>
     *  	{% endfor %}
     *	</ul>
     *	................. JAVASCRIPT FILE
     *	(async () => {
     *		const helpTPL = require('../../utils/TplHandler');
     *		const data1 = await helpTPL.render("WeightAndFuel.html", {
     *			users:[
     *				{username: "Tom"},
     *				{username: "Mito"},
     *				{username: "Codes"},
     *			]
     *		});
     *	})()
     */
    async render(name, data = {}, options = {}) {
        options = options || {};
        options.ext = options?.ext ?? this.ext;
        options.path = options?.path ?? this.path;
        const { path, filename } = this.getPath(name, options);
        options.path = path;
        options.fs = true;
        options.filename = filename;
        return super.render(name, data, options);
    }

    /**
     * @description compile all the options into data string
     * @param {String} content 
     * @param {Object} [params] 
     * @param {String} [params.flow] 
     * @param {Object} [options] 
     * @param {Boolean} [options.fs] 
     * @param {String} [options.path] 
     * @param {String} [options.flow] 
     * @param {String} [options.open] 
     * @param {String} [options.close] 
     * @returns {Promise<String>}
     */
    compile(content, params = {}, options = {}) {
        try {
            options = options || {};
            let loader = null;
            if (options?.fs && options?.path) {
                loader = _twing.createFilesystemLoader(require("fs"));
                loader.addPath(options.path);
            } else {
                loader = _twing.createArrayLoader({ 'default': content });
                options.filename = 'default';
            }
            let environment = this.decorate(_twing.createEnvironment(loader), options);
            return environment.render(options.filename, params);
        }
        catch (error) {
            this.logger?.error({
                flow: data?.flow || options?.flow,
                src: "KsTpl:Twing:compile",
                message: error?.message || error,
                data: { name, path, local: __dirname }
            });
            return "";
        }
    }

    /**
     * @description add extra config to the driver 
     * @param {Object} environment 
     * @param {Object} options 
     * @returns {Object} lib
     */
    decorate(environment, options) {
        if (options?.functions) {
            for (let i in options.functions) {
                const item = options.functions[i];
                if (item.handler instanceof Function) {
                    environment.addFunction(_twing.createFunction(item?.name || i, item.handler, item.params || []));
                }
            }
        }
        if (options?.filters) {
            for (let i in options.filters) {
                const item = options.filters[i];
                if (item.handler instanceof Function) {
                    environment.addFilter(_twing.createFilter(item?.name || i, item.handler, item.params || []));
                }
            }
        }
        return environment;
    }
	
	/*
     * @description Render method for versions previus 6.0.0
     * @param {String} name 
     * @param {Object} [data] 
     * @param {String} [data.flow]
     * @param {Object} [options] 
     * @param {String} [options.path] 
     * @param {String} [options.ext] 
     * @param {String} [options.flow] 
     * @param {Array} [options.functions] 
	 */
    async renderV5(name, data = {}, options = {}) {
        const { path, filename } = this.getPath(name, options);
        if (!path) return "";
        try {
            const version = require("twing/package")?.version[0];
            if (parseInt(version) >= 6) {
                throw new Error("Twing version " + version + " is not supported");
            }
            const { TwingEnvironment, TwingLoaderFilesystem, TwingFunction } = require("twing");
            const loader = new TwingLoaderFilesystem(path);
            const twing = new TwingEnvironment(loader);
            if (options?.functions) {
                for (let i in options.functions) {
                    if (options.functions[i] instanceof Function) {
                        twing.addFunction(new TwingFunction(i, options.functions[i]));
                    }
                }
            }
            return await twing.render(filename, data);
        }
        catch (error) {
            this.logger?.error({
                flow: data?.flow || options?.flow,
                src: "util:TPLHandler:render",
                message: error?.message || error,
                data: { name, path, local: __dirname }
            });
            return "";
        }
    }
}

module.exports = Twing;