const _path = require('path');
const _fs = require('fs');
const Cache = require('../Cache');

class Driver extends Cache {

    /**
     * @description get file content 
     * @param {Object} [payload]
     * @param {String} [payload.ext] 
     * @param {String} [payload.path] 
     * @param {String} [payload.encoding] 
     * @param {String} [payload.flow] 
     * @returns {Promise<String>} 
     */
    async load(payload) {
        try {
            let { path, file } = this.getPath(payload);
            if (!path) return "";
            return await _fs.promises.readFile(file, payload?.encoding || this.encoding);
        }
        catch (error) {
            this.logger?.error({
                flow: payload?.flow,
                src: "KsTpl:Cache:load",
                error: { message: error?.message || error, stack: error?.stack },
                data: payload
            });
            return null;
        }
    }

    /**
     * @description save content into a file
     * @param {Object} [payload]
     * @param {String} [payload.ext] 
     * @param {String} [payload.path] 
     * @param {String} [payload.encoding] 
     * @param {String} [payload.flow] 
     * @returns {Promise<String>}
     */
    async save(payload = {}) {
        if (!payload?.content) {
            return null;
        }
        try {
            let { file } = this.getPath(payload);
            await _fs.promises.mkdir(_path.dirname(file));
            await _fs.promises.writeFile(file, payload.content);
            return file;
        }
        catch (error) {
            this.logger?.error({
                flow: payload?.flow,
                src: "KsTpl:Cache:save",
                error: { message: error?.message || error, stack: error?.stack },
                data: payload
            });
            return null;
        }
    }
}

module.exports = Driver;