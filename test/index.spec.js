const KsTpl = require('..');
describe('Load KsTpl Lib', () => {

    beforeAll(async () => { });

    afterAll(async () => { });

    it("valid instance", () => {
        expect(KsTpl).toBeInstanceOf(Object);
        expect(KsTpl.get).toBeInstanceOf(Function);
        expect(KsTpl.set).toBeInstanceOf(Function);
        expect(KsTpl.use).toBeInstanceOf(Function);
        expect(KsTpl.KsTpl).toBeInstanceOf(Function);
        expect(KsTpl.Driver).toBeInstanceOf(Function);
        expect(KsTpl.compile).toBeInstanceOf(Function);
        expect(KsTpl.render).toBeInstanceOf(Function);
        expect(KsTpl.get()).toBeInstanceOf(Object);
    });

    it("common use", async () => {
        const str = KsTpl.compile("{{name}}:{{age}}", { name: "Mit", age: 15 }, { driver: "str" });
        const twing = await KsTpl.compile("{{name}}:{{age}}", { name: "Mit", age: 15 }, { driver: "twing" });
        const ejs = KsTpl.compile('<%= people.join(","); %>', { people: ['geddy', 'neil', 'alex'] }, { driver: "ejs" });
        const md = KsTpl.compile('# Hello, Markdown!', null, { driver: "markdown" });

        expect(str).toBe("Mit:15");
        expect(twing).toBe("Mit:15");
        expect(ejs).toBe("geddy,neil,alex");
        expect(md).toBe("<h1>Hello, Markdown!</h1>\n");
    });

    it("autosearch", async () => {
        KsTpl.configure({ 
            map: { "md": "markdown", "html": "twing", "twig": "twing", "ejs": "ejs", "htmljs": "ejs" }, 
            path: __dirname + "/mock/",
            ext: ""
        });

        const str1 = await KsTpl.render("simple.ejs", { user: { name: "Mit", age: 15 } });
        const str2 = await KsTpl.render("linked.md", {}, { page: {}, next: "Highlight" });
        const str3 = await KsTpl.render("simple.twig", {
            list: [
                { name: "Mat", age: 3, twig: true },
                { name: "Deg", age: 4, twig: false },
                { name: "Ste", age: 5, twig: true }
            ]
        });
        
        expect(str1).toBe(" <h2> Mit </h2> ");
        expect(/<a href=/ig.test(str2)).toBe(true);
        expect(str3.length).toBe(90);
    });
});