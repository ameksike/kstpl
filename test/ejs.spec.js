const KsTpl = require('../');
describe('Driver Ejs', () => {

    it("common use", async () => {
        KsTpl.configure({ default: "ejs" });
        const str1 = KsTpl.compile('<%= people.join(","); %>', { people: ['geddy', 'neil', 'alex'] });
        expect(str1).toBe("geddy,neil,alex");
    });

    it("format", async () => {
        const options = { delimiter: '?', openDelimiter: '[', closeDelimiter: ']' };
        const data = { people: ['geddy', 'neil', 'alex'] };
        const template = '[?= people.join(","); ?]';
        KsTpl.configure({ default: "ejs" });

        const str1 = KsTpl.compile(template, data, options);
        expect(str1).toBe("geddy,neil,alex");
    });

    it("file", async () => {
        KsTpl.configure({ default: "ejs", ext: "ejs", path: __dirname + "/mock/" });
        const str1 = await KsTpl.render("simple", { user: { name: "Mit", age: 15 } });
        expect(str1).toBe(" <h2> Mit </h2> ");
    });
});