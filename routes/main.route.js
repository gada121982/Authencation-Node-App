const express = require('express');
const main = require('../controllers/main.controller');

const router = express();

router.get('/', main.getMain);

module.exports = router;