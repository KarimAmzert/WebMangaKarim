const basicInfo = require('./basicInfo');
const servers = require('./server');
const tags = require('./tags');
const components = require('./component');
const users = require('./tagIndexx');
const Mangas = require('./tagIndexx');




module.exports = {
    ...basicInfo,
    ...servers,
    ...tags,
    ...components,
    ...users,
    ...Mangas

};
