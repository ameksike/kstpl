const KsTpl = require('..');
describe('Driver Str', () => {

    it("common use", () => {
        KsTpl.configure({ default: "str" });
        const str1 = KsTpl.compile("{{name}}:{{age}}", { name: "Mit", age: 15 });
        expect(str1).toBe("Mit:15");
    });

    it("file", async () => {
        KsTpl.configure({ default: "str", ext: "html", path: __dirname + "/mock/" });
        const str1 = await KsTpl.render("simple", { name: "Mit", age: 15 });
        expect(str1).toBe("STR_Mit:15");
    });
});