var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const Auth = require('../models/Auth');

router.get('/login',(req,res) => {
    res.render('login',{err:''})
});

passport.use(new LocalStrategy(function verify(username, password, cb) {
    Auth.find({userID:username}).then((user)=>{
        if(user.length != 1){
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
        crypto.pbkdf2(password, user[0].salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            hashedpw = Buffer.from(user[0].hashedpw,'base64')
            if (err) { return cb(err); }
            if (!crypto.timingSafeEqual(hashedpw, hashedPassword)) {
              return cb(null, false, { message: 'Incorrect username or password.' });
            }
            return cb(null, user[0]);
          });
    })
  }));

// Login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/login'
  }));

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });


module.exports = router;