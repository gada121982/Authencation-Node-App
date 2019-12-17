const nodemailer = require('nodemailer');
const ejs = require('ejs');

module.exports.startSendMail = async clientInfo => {
  // create transporter
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'gadadev.tk@gmail.com',
      pass: 'sin121983'
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });

  const data = await ejs.renderFile(`${__dirname}/layoutMail/register.ejs`, {
    name: clientInfo.name,
    token: clientInfo.token
  });
  // create options for send mail
  const mailOptions = {
    from: 'gada DEV <me@samples.mailgun.org>',
    to: clientInfo.gmail,
    subject: 'Test for nodeapp',
    text: 'Hello world',
    html: data
  };
  console.log(`da send mail , ${clientInfo.gmail}`);
  console.log(`da send mail , ${clientInfo.token}`);
  // send
  transport.sendMail(mailOptions, (err, data) => {
    if (err) {
      return false;
    }
    return true;
  });
};
