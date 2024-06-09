const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Media = require('../models/Media');

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

router.get('/GalleryPages', async (req, res) => {
    try {
        var mediaItems = await Media.find();
        // var 
        mediaItems.forEach(element => {
            if(element.type == 'youtube_embed'){
                console.log(element.link)
                var urlobj  = new URL(element.link)
                // No search params == embed link
                if (Array.from(urlobj.searchParams.values()) == 0){
                    const urlpaths = (urlobj.pathname.split('/'));
                    element.yt_id = urlpaths[urlpaths.length -1]
                }else{
                    // regular yt link
                    element.yt_id = Array.from(urlobj.searchParams.values())[0]
                }
                console.log(element.yt_id)
            }
        });
        // console.log(mediaItems)
        res.render('gallerypages', { mediaItems, page:req.query.page });
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

module.exports = router;
