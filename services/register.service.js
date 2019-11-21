const user = require('../models/user.model');

const validateGmail = gmail => {
  const regexGmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  regexGmail.lastIndex = 0;
  return regexGmail.test(gmail);
};

const validatePassword = pwd => {
  return !(pwd === '' || pwd.length < 8);
};

module.exports = {
  validateGmail,
  validatePassword,
};