const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const route = require('./routes/index.route');
const morgan = require('morgan');
const helmet = require('helmet');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const app = express();

// config
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(morgan('combined'));
app.use(helmet());

// connect dbs
mongoose
  .connect(process.env.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connect dbs succesfully !');
  })
  .catch(err => {
    console.log(`we have an error: ${err}`);
    process.exit();
  });


// route
app.use('/', route.main);
app.use('/login', route.login);
app.use('/register', route.register);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});