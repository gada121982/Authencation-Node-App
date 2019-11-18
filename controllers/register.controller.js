const user = require('../models/user.model');
const {
    validateGmail
} = require('../services/register.service.js');

module.exports.getRegister = (req, res) => {
    res.render('register');
};

module.exports.postRegister = (req, res) => {
    // now we have to validate data
    
};