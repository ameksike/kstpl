const KsTpl = require('../');
describe('Driver Twing ', () => {

    it("common use", async () => {
        KsTpl.configure({ default: "twing" });
        const str1 = await KsTpl.compile("{{name}}:{{age}}", { name: "Mit", age: 15 });
        expect(str1).toBe("Mit:15");
    });

    it("add functions and filters", async () => {
        KsTpl.configure({ default: "twing" });
        let template = "{{name}}:{{age}}:{{duplicate(age, name)|check}}";
        let data = { name: "Mit", age: 15 };
        let options = {
            functions: {
                duplicate: {
                    params: [{ name: "age" }, { name: "name" }],
                    handler: (context, age, name) => {
                        return Promise.resolve(parseInt(age) * 2)
                    }
                },
            },
            filters: {
                check: {
                    handler: (context, value) => {
                        return Promise.resolve(parseInt(value) * 2)
                    }
                },
            }
        };
        try {
            const str1 = await KsTpl.compile(template, data, options);
            expect(str1).toBe("Mit:15:60");
        }
        catch (error) {
            console.log(error)
        }
    });

    it("file", async () => {
        KsTpl.configure({ default: "twing", ext: "twig", path: __dirname + "/mock/" });
        try {
            const str1 = await KsTpl.render("simple", {
                list: [
                    { name: "Mat", age: 3, twig: true },
                    { name: "Deg", age: 4, twig: false },
                    { name: "Ste", age: 5, twig: true }
                ]
            });
            expect(str1.length).toBe(90);
        }
        catch (error) {
            console.log(error)
        }
    });
});