const user = require('../models/user.model');
const {
    validateGmail,
    validatePassword
} = require('../services/register.service.js');

module.exports.getRegister = (req, res) => {
    res.render('register', {
        err: null
    });
};

module.exports.postRegister = (req, res) => {
    if (!validateGmail(req.body.gmail) && !validatePassword(req.body.pwd)) {
        res.render('register', {
            err: 'Gmail not correct format & Password must have at least 8 character & not empty '
        });
    };
    if (!validateGmail(req.body.gmail)) {
        res.render('register', {
            err: 'Gmail not correct format, please check again'
        });
    };
    if (!validatePassword(req.body.pwd)) {
        res.render('register', {
            err: 'Password must have at least 8 character'
        });
    };
    res.send(req.body);
};