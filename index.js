const KsTpl = require('./src/KsTpl');
const Driver = require('./src/Driver');
const Cache = require('./src/Cache');

module.exports = new (class extends KsTpl {
    Driver = Driver;
    KsTpl = KsTpl;
    Cache = Cache;
});