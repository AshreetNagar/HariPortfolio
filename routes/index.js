const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Media = require('../models/Media');
const Group = require('../models/Group');
const Tag = require('../models/Tag');

// Home page route
router.get('/', (req, res) => {
    res.render('home');
});

// Gallery page route
router.get('/gallery', async (req, res) => {
    try {
        var groupId = ""
        var groupName = ""
        if ('group' in req.query){
            groupId = req.query['group']
        }
        if ('groupName' in req.query){
            groupName = req.query['groupName']
        }
        res.render('gallery', { groupId, groupName });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


router.get('/GalleryCategories', async (req, res) => {
    try {
        const groups = await Group.find();
        console.log(groups)
        res.render('gallerycategories', {groups});

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
    console.log(req.body)
    const {                     firstName, 
        lastName, 
        email, 
        phoneNumber,
        topic,
        date,
        time,
        message } = req.body;

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
            to: 'firstname.lastname.shut@gmail.com', // you have to change this stuff for sure
            subject: `Portfolio Website: ${topic} request from ${email}`,
            text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone#: ${phoneNumber}\nTopic: ${topic}\nDate: ${date}\nTime: ${time}\nMessage:\n${message}`
        };

        // Send email (Copied from online)
        await transporter.sendMail(mailOptions);
        res.redirect('/contact');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Debug Page
router.get('/debug', (req,res) => {
    res.render('debug');
});

router.get('/media', async (req,res)=>{
    var mediaItems = []
    var groupId = ""
    if ('groupId' in req.query){
        groupId = req.query['groupId']
        console.log(groupId)
        mediaItems = await Media.find({groups:groupId});
    }else{
        mediaItems = await Media.find();
    }
    res.json(mediaItems)
})

router.get('/groups', async (req, res) => {
    try {
        const groupItems = await Group.find();
        res.json(groupItems)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/tags', async (req, res) => {
    try {
        var items = []
        if (('nameQuery' in req.query) && (req.query['nameQuery'] != '')){
            var nameQuery = req.query['nameQuery']
            items = await Tag.find({tagName:nameQuery});
        }else{
            items = await Tag.find();
        }
        res.json(items)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
