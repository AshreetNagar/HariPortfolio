const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth');
const Media = require('../models/Media');
const { google } = require("googleapis");
const auth = new google.auth.GoogleAuth({ 
    keyFile: "./serviceaccount.json", 
    scopes: "https://www.googleapis.com/auth/drive", 
}); 
let tokVar =  {"token":""}

// Admin Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    try {
        const mediaItems = await Media.find();
        res.render('admin/dashboard', { mediaItems });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/googleDriveTest', ensureAuthenticated, async(req,res) =>{
    // testPage = 'googleDriveTest'
    testPage = 'newAdd'

    let nowTime = (new Date()).getTime();
    if (tokVar['token'] == ""){
        console.log("empty tokVar")
        auth.getAccessToken()
        .then((token) => {
            tokVar['token'] = {"token":token,"time":nowTime}
            res.render('admin/'+testPage, { token });
        })
        .catch((err) => {
            console.log("err: ", err)
            res.json({ error: 'Internal Server Error' });
            return;
        });
    }else if (nowTime-tokVar['token']["time"] > (5*60*1000)){
        console.log("expired tokVar")
        auth.getAccessToken()
        .then((token) => {
            tokVar['token'] = {"token":token,"time":nowTime}
            res.render('admin/'+testPage, { token });
        })
        .catch((err) => {
            console.log("err: ", err)
            res.json({ error: 'Internal Server Error' });
            return;
        });
    }else{
        let token = tokVar['token']
        const diff = (nowTime-tokVar['token']["time"])/(60*1000)
        console.log("use "+ diff+ " minutes old tokVar")
        res.render('admin/'+testPage, { token });
    }
});

// FORMS
// Add Card Form
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('admin/add');
});

// Edit Card Form
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    try {
        const mediaItem = await Media.findById(req.params.id);
        res.render('admin/edit', { mediaItem });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// ADDING THE INFO FROM FORMS
// Add Card
router.post('/add', ensureAuthenticated, async (req, res) => {
    const { title, tags, group, type, link } = req.body;
    try {
        const newMedia = new Media({ title, tags: tags.split(','), group, type, link });
        await newMedia.save();
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Edit Card
router.post('/edit/:id', ensureAuthenticated, async (req, res) => {
    const { title, tags, group, type, link } = req.body;
    try {
        await Media.findByIdAndUpdate(req.params.id, { title, tags: tags.split(','), group, type, link });
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete Card
router.post('/delete/:id', ensureAuthenticated, async (req, res) => {
    try {
        await Media.findByIdAndDelete(req.params.id);
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
