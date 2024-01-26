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
        expect(KsTpl.TplDrv).toBeInstanceOf(Function);
        expect(KsTpl.compile).toBeInstanceOf(Function);
        expect(KsTpl.render).toBeInstanceOf(Function);
        // expect(KsTpl.get()).toBeInstanceOf(Object);
    });
});