const TplDrv = require('../TplDrv');

class Twing extends TplDrv {

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
                src: "util:TPLHandler:render",
                message: error?.message || error,
                data: { name, path, local: __dirname }
            });
            return "";
        }
    }
}

module.exports = Twing;