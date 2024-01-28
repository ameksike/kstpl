const KsTpl = require('../');
describe('Driver Markdown', () => {

    it("common use", () => {
        KsTpl.configure({ default: "markdown" });
        const str1 = KsTpl.compile('# Hello, Markdown!');
        expect(str1).toBe("<h1>Hello, Markdown!</h1>\n");
    });

    it("file without cache", async () => {
        KsTpl.configure({
            ext: "md",
            default: "markdown",
            path: __dirname + "/mock/"
        });
        const str1 = await KsTpl.render("simple", { name: "Mit", age: 15 }, { page: {}, next: "Highlight" });
        expect(str1.length).toBe(2185);
    });

    it("file with cache", async () => {
        KsTpl.configure({
            ext: "md",
            default: "markdown",
            path: __dirname + "/mock/",

            cacheType: "file",
            cachePath: __dirname + "/cache/",
            cacheExt: "md"
        });
        const str1 = await KsTpl.render("simple", {}, { page: {}, next: "Highlight" });
        expect(str1.length).toBe(2185);
    });

    it("links", async () => {
        KsTpl.configure({
            ext: "md",
            default: "markdown",
            path: __dirname + "/mock/",

            cacheType: "file",
            cachePath: __dirname + "/cache/",
            cacheExt: "md"
        });
        const str1 = await KsTpl.render("linked", {}, { page: {}, next: "Highlight" });
        expect(/<a href=/ig.test(str1)).toBe(true);
    });
});