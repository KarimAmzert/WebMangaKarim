const { Router } = require('express');
const router = Router();
const users = require('./users');
const mangas = require('./mangas');



router.use('/', users);
router.use('/', mangas)



module.exports = router;