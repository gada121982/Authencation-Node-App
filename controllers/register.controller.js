const user = require('../models/user.model');
const bcrypt = require('bcryptjs');

const {
    validateGmail,
    validatePassword
} = require('../services/register.service.js');

module.exports.getRegister = (req, res) => {
    console.log(req.body);
    let error = [];
    res.render('register', {
        error: error,
        name: req.body.name,
        gmail: req.body.gmail,
        pwd: req.body.pwd
    });
};

module.exports.postRegister = async (req, res) => {
    let error = [];
    console.log(req.body);
    if (!req.body.name) {
        error.push({
            error: 'Name is empty , please checkout'
        });
    }
    if (validateGmail(req.body.gmail) === false) {
        error.push({
            error: 'Email not valid'
        });
    }
    if (!validatePassword(req.body.pwd)) {
        error.push({
            error: 'Password not valid'
        });

    }
    // check exist gmail
    await user.countDocuments({
        gmail: req.body.gmail
    }, (err, count) => {
        if (err) throw new Error(err);
        if (count > 0) {
            error.push({
                error: 'Your gmail existed'
            });
        }
    });

    if (error.length > 0) {
        res.render('register', {
            error: error,
            name: req.body.name,
            gmail: req.body.gmail,
            pwd: req.body.pwd
        });
        error = [];
    } else {
        let newUser = new user({
            name: req.body.name,
            gmail: req.body.gmail,
        });

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.pwd, salt);
        newUser.pwd = hash;

        newUser.save((error) => {
            if (error) return new Error(error);
            res.redirect('login');
        })

    }

};