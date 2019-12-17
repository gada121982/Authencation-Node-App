const user = require('../models/user.model');

module.exports.getLogin = (req, res) => {
  console.log(`this is res.locals ${res.locals.success_msg}`);
  res.render('login');
};

module.exports.PostLogin = (req, res) => {
  console.log(`this is req.body`, req.body);
  res.send(req.body);
};
