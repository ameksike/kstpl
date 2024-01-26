const KsTpl = require('../');
describe('Driver Twig', () => {

    it("common use", () => {
        KsTpl.configure({ default: "twig" });

        const str1 = KsTpl.compile("{{name}}:{{age}}", { name: "Mit", age: 15 });
        expect(str1).toBe("Mit:15");
    });

    it("file", async () => {
        KsTpl.configure({ default: "twig", ext: "twig", path: __dirname + "/mock/" });

        const str1 = await KsTpl.render("simple", { list: [
            { name: "Mat", age: 3, twig: true },
            { name: "Deg", age: 4, twig: false },
            { name: "Ste", age: 5, twig: true }
        ] });
        expect(str1).toBe("Mit:15");
    });
});