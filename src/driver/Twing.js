const Driver = require('../Driver');
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
    async render2(name, data = {}, options = {}) {
        options.ext = options?.ext ?? this.ext;
        options.path = options?.path ?? this.path;
        const { path, filename } = this.getPath(name, options);
        if (!path) return "";
        try {
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
                src: "KsTpl:Twing:compile",
                message: error?.message || error,
                data: { name, path, local: __dirname }
            });
            return "";
        }
    }

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
    compile(content, params = {}, options = {}) {
        const { createEnvironment, createArrayLoader } = require("twing");
        const loader = createArrayLoader({ 'index.twig': content });
        const environment = createEnvironment(loader);
        return environment.render('index.twig', params);
    }
}

module.exports = Twing;