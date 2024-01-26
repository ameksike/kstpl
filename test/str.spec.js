const KsTpl = require('..');
describe('Driver Str ', () => {

    it("common use", () => {
        KsTpl.configure({ default: "str" });

        const str1 = KsTpl.compile("{{name}}:{{age}}", { name: "Mit", age: 15 });
        expect(str1).toBe("Mit:15");
    });
});