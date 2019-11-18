const regexGmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g

const validateGmail = (gmail) => {
    return regexGmail.test(gmail);
};

const validatePassword = (pwd) => {
    // you need add more case in there , basiclly , i just do like this.
    return !(pwd === '' || pwd.length < 8);
}

module.exports = {
    validateGmail,
    validatePassword
};