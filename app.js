const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
mongoDbUrl = process.env.MONGODB_URL
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: process.env.JWT_KEY,
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.authenticate('session'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
app.use('/', indexRouter);
app.use('/', authRouter);
  
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
