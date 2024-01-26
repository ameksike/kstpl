const TplDrv = require('../TplDrv');
const ejs = require('ejs');

class Ejs extends TplDrv {

    /**
     * @description Render templates based on Ejs lib
     * @param {String} name 
     * @param {Object} [data] 
     * @param {String} [data.flow]
     * @param {Object} [options] 
     * @param {String} [options.path] 
     * @param {String} [options.ext] 
     * @param {String} [options.flow] 
     * @param {Array} [options.functions] 
     * @requires Ejs
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
        const fs = require('fs').promises;
        const content = await fs.readFile(name, options.encoding || "utf8");
        return this.compile(content, data, options);
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
        return ejs.compile(content, params);
    }

}

module.exports = Ejs;