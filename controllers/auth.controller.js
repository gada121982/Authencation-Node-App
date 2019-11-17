const user = require('../models/user.model');

module.exports.getLogin = (req, res) => {
    res.render('login');
};

module.exports.postLogin = (req, res) => {
    console.log(`this is req.body`, req.body);
    res.send(req.body);
};