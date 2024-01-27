const TplDrv = require('../TplDrv');

class Markdown extends TplDrv {

    /**
     * @description Interpolate all the options into data string
     * @param {String} content 
     * @param {Object} [params] 
     * @param {String} [params.flow] 
     * @param {Object} [options] 
     * @param {String} [options.next] 
     * @param {String} [options.flow] 
     * @param {String} [options.open] 
     * @param {String} [options.close] 
     * @returns {String}
     */
    compile(content, params = {}, options = {}) {
        try {
            const markdownit = require('markdown-it');
            const nextDrv = options?.next && this.kstpl?.get(options?.next);
            // Actual default values
            const md = markdownit({
                // Enable HTML tags in source
                html: options?.html ?? this.html ?? true,
                // Use '/' to close single tags (<br />).
                // This is only for full CommonMark compatibility.
                xhtmlOut: options?.xhtmlOut ?? this.xhtmlOut ?? true,
                // Convert '\n' in paragraphs into <br>
                breaks: options?.breaks ?? this.breaks ?? false,
                // CSS language prefix for fenced blocks. Can be
                // useful for external highlighters.
                langPrefix: options?.langPrefix ?? this.langPrefix ?? 'language-',
                // Autoconvert URL-like text to links
                linkify: options?.linkify ?? this.linkify ?? false,
                // Enable some language-neutral replacement + quotes beautification
                // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
                typographer: options?.typographer ?? this.typographer ?? false,
                // Highlighter function. Should return escaped HTML,
                // or '' if the source string is not changed and should be escaped externally.
                // If result starts with <pre... internal wrapper is skipped.
                highlight: options?.highlight instanceof Function ? options?.highlight : (str, lang) => {
                    if (nextDrv) {
                        return nextDrv.format(str, { lang, escapeHtml: (str) => md.utils.escapeHtml(str) });
                    }
                    return str;
                }
            });
            options && delete options["next"];
            return nextDrv ? nextDrv.compile(content, params, options) : md.render(content);
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
}

exports = module.exports = Markdown;