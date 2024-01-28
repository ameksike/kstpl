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
});