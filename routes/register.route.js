const express = require('express');
const register = require('../controllers/register.controller');

const router = express();

router.get('/', register.getRegister);
router.post('/', register.postRegister);

module.exports = router;