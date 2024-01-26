const KsTpl = require('../');
describe('Driver Twing ', () => {

    it("common use", async () => {
        KsTpl.configure({ default: "twing" });

        const str1 = await KsTpl.compile("{{name}}:{{age}}", { name: "Mit", age: 15 });
        expect(str1).toBe("Mit:15");
    });

    it("file", async () => {
        KsTpl.configure({ default: "twing", ext: "twig", path: __dirname + "/mock/" });

        const str1 = await KsTpl.render("simple", { list: [
            { name: "Mat", age: 3, twig: true },
            { name: "Deg", age: 4, twig: false },
            { name: "Ste", age: 5, twig: true }
        ] });
        expect(str1).toBe("Mit:15");
    });
});