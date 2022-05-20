const u = require('./dateformat.default.cjs');

const res = (...args) => {
    return u.default(...args);
}
Object.keys(u).forEach( k => { res[k] = u[k] } );
module.exports = res;
