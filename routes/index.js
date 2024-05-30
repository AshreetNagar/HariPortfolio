const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Media = require('../models/Media');
const Auth = require('../models/Auth');
const jwt = require("jsonwebtoken"); 
const crypto = require('crypto');

// Home page route
router.get('/', (req, res) => {
    res.render('home');
});

// Gallery page route
router.get('/gallery', async (req, res) => {
    try {
        const mediaItems = await Media.find();
        res.render('gallery', { mediaItems });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Contact page route
router.get('/contact', (req, res) => {
    res.render('contact');
});

// Handle contact form submission (Idk if this is right I did it quick)
router.post('/contact', async (req, res) => {
    const { firstName, lastName, email, subject, message, source } = req.body;

    try {
        // nodemailer stuff if you want to edit
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email content (Idk if this works)
        const mailOptions = {
            from: email,
            to: 'recipient-email@gmail.com', // you have to change this stuff for sure
            subject: subject,
            text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nSource: ${source}\n\nMessage:\n${message}`
        };

        // Send email (Copied from online)
        await transporter.sendMail(mailOptions);
        res.redirect('/contact');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/login',(req,res) => {
    res.render('login',{err:''})
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        //Check password
        user = await Auth.find({userID:username})
        if(user.length != 1){
            res.render('login', {err:'Incorrect Username'});
            return 
        }
        salt = user[0].salt
        hashedpw = Buffer.from(user[0].hashedpw,'base64')
        jwtSecretKey = process.env.JWT_KEY
        crypto.pbkdf2(password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { 
                res.render('login', {'err':err});
                return                
            }
            if (!crypto.timingSafeEqual(hashedpw, hashedPassword)) {
                res.render('login', {err:'Incorrect Password'});
                return 
            }
            // Generate JWT if passed
            const token = jwt.sign({ userId: username }, jwtSecretKey, { expiresIn: "2h" });
            console.log(token)
            res.redirect('/gallery');
            return;
            // Verifying the token
            jwt.verify(token, "secretKey", (err, decoded) => {
                if (err) {
                    console.log("Error verifying json: "+err)
                } else {
                    console.log("New token: "+token)
                }
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
