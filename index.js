const KsTpl = require('./src/KsTpl');
const TplDrv = require('./src/TplDrv');

module.exports = new (class extends KsTpl {
    TplDrv = TplDrv;
    KsTpl = KsTpl;
});