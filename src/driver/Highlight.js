const TplDrv = require('../TplDrv');
const hljs = require('highlight.js');
const _path = require('path');
const _fs = require('fs');

class Highlight extends TplDrv {

    /**
     * @description Interpolate all the options into data string
     * @param {String} content 
     * @param {Object} [params] 
     * @param {String} [params.flow] 
     * @param {Object} [options] 
     * @param {String} [options.flow] 
     * @param {Object} [options.page] 
     * @param {Boolean} [options.page.cdn] 
     * @param {String} [options.page.theme] 
     * @param {String} [options.page.scheme] 
     * @param {String} [options.page.extension] 
     * @returns {String}
     */
    compile(content, params = {}, options = {}) {
        try {
            if (!options?.page) {
                return content;
            }
            let extension = options?.extension || "min.css";
            let theme = options?.theme || "dark"; // light | blue | sublime
            let scheme = options?.scheme || "github"; // githun | mono | magula | monokai | nnfx | panda-syntax | qtcreator
            let stlName = `${scheme}${theme ? "-" + theme : ""}.${extension}`;
            let stlTag = "";
            if (options?.page?.cdn) {
                let path = options?.page?.url || "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles";
                stlTag = `<link rel="stylesheet" href="${path}/${stlName}">`;
            } else {
                let hljsPathTmp = require.resolve('highlight.js');
                let hljsPath = _path.dirname(hljsPathTmp);
                let filePath = _path.join(hljsPath, '../', 'styles', stlName);
                let fileContent = _fs.readFileSync(filePath, 'utf-8')
                stlTag = `<style> ${fileContent} </style>`;
            }
            const html = `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${options?.page?.title || "Ksike Template"} </title>
                        ${stlTag} 
                    </head>
                    <body> ${content} </body>
                </html>
            `;
            return html;
        } catch (error) {
            this.logger.error({
                flow: params?.flow || options?.flow,
                src: "KsTpl:Markdown:compile",
                error: { message: error?.message || error, stack: error?.stack },
                data: { content, params, options }
            });
            return null;
        }
    }

    /**
     * @description format the content 
     * @param {String} content 
     * @param {Object} [option] 
     * @returns {String}
     */
    format(str, { lang, escapeHtml }) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre><code class="hljs">' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (__) { }
        }
        str = escapeHtml instanceof Function ? escapeHtml(str) : str;
        return '<pre><code class="hljs">' + str + '</code></pre>';
    }
}

exports = module.exports = Highlight;