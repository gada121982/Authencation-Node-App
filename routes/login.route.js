const express = require('express');
const auth = require('../controllers/auth.controller');

const router = express();

router.get('/', auth.getLogin);
router.post('/', auth.PostLogin);

module.exports = router;
