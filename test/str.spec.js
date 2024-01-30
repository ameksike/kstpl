const KsTpl = require('..');
describe('Driver Str', () => {

    it("common use", () => {
        KsTpl.configure({ default: "str" });
        const str1 = KsTpl.compile("{{name}}:{{age}}", { name: "Mit", age: 15, sex: "m", add: "mm" });
        expect(str1).toBe("Mit:15");
    });

    it("file", async () => {
        KsTpl.configure({ default: "str", ext: "html", path: __dirname + "/mock/" });
        const str1 = await KsTpl.render("simple", { name: "Mit", age: 15 });
        expect(str1).toBe("STR_Mit:15");
    });

    it("deep compile", () => {
        const data = {
            root: '/root/',
            content: '{root}/content/',
            scheme: '{content}/scheme/',
            page: '{content}/{scheme}/page',
        }
        KsTpl.configure({ default: "str", openDelimiter: "{", closeDelimiter: "}", deep: true });
        const str1 = KsTpl.compile("{content}/-/{scheme}/-/end", data);
        const str2 = KsTpl.compile("/root//content//scheme", data);
        const str3 = KsTpl.compile("C:\\dev\\demo-api-doc\\node_modules\\ksdocs.html", data);
        const str4 = KsTpl.compile("test1 \n test2 \r test3 \r\n test4", data, { escape: true });
        const str5 = KsTpl.compile("test1 \n test2 \r test3 \r\n test4", data);

        expect(str1).toBe('/root//content//-//root//content//scheme//-/end');
        expect(str2).toBe('/root//content//scheme');
        expect(str3).toBe("C:\\dev\\demo-api-doc\\node_modules\\ksdocs.html");
        expect(str4).toBe("test1  test2  test3  test4");
        expect(str5).toBe("test1 \n test2 \r test3 \r\n test4");
    });
});