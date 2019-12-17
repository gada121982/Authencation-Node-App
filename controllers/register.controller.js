const randomString = require('randomstring');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { startSendMail } = require('../services/mail/mailAuth.service');

const {
  validateGmail,
  validatePassword,
  checkExistGmail
} = require('../services/register.service.js');

module.exports.getRegister = (req, res) => {
  console.log(req.body);
  const error = [];
  res.render('register', {
    error,
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
  const countGmailExisted = await checkExistGmail(req.body.gmail);
  if (countGmailExisted > 0) {
    error.push({
      error: 'Your gmail existed'
    });
  }

  if (error.length > 0) {
    res.render('register', {
      error,
      name: req.body.name,
      gmail: req.body.gmail,
      pwd: req.body.pwd
    });
    error = [];
  } else {
    // send mail to authencation , beside that , we also store data in dbs
    // with a random token and active status equal false
    const token = randomString.generate(32);
    const dataUser = {
      name: req.body.name,
      gmail: req.body.gmail,
      token
    };
    const newUser = new User({
      name: req.body.name,
      gmail: req.body.gmail,
      active: false,
      token
    });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.pwd, salt);
    newUser.pwd = hash;

    newUser.save(async Er => {
      if (Er) return new Error(Er);
      startSendMail(dataUser);
      res.redirect('login');
    });
  }
};

// gen out token
module.exports.verify = async (req, res) => {
  const { token } = req.params;
  console.log(`this is confirm token`, token);

  await User.updateOne({ token }, { active: true, token: '' });
  res.redirect('/login');
};
