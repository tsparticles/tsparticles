const path = require('path');
const pkgSettings = require(path.join(process.env.INIT_CWD, "package.json"));

console.log(pkgSettings);
