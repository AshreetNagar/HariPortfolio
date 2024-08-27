const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth');
const Media = require('../models/Media');
const Tag = require('../models/Tag');
const Group = require('../models/Group');
const { google } = require("googleapis");
const auth = new google.auth.GoogleAuth({ 
    keyFile: "./serviceaccount.json", 
    scopes: "https://www.googleapis.com/auth/drive", 
}); 
let tokVar =  {"token":""}

async function getGDriveToken() {
    let nowTime = (new Date()).getTime();
    if (tokVar['token'] == ""){
        const token = await auth.getAccessToken()
        tokVar = {"token":token,"time":nowTime}
        console.log(token)
        return token
        // .catch((err) => {
            // console.error("err: ", err)
            // return;
        // });
    }else if (nowTime-tokVar['token']["time"] > (1*60*1000)){
        const token = await auth.getAccessToken()
        tokVar = {"token":token,"time":nowTime}
        return token
        // .catch((err) => {
            // console.error("err: ", err)
            // return;
        // });
    }else{
        let token = tokVar['token']
        const diff = (nowTime-tokVar['token']["time"])/(60*1000)
        console.log(token)
        return token
    }
}

// Admin Dashboard
router.get('/debug', ensureAuthenticated, async (req, res) => {
    try {
        res.render('admin/debug');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


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


router.get('/uploadVideo', ensureAuthenticated, async(req,res) =>{
    // testPage = 'googleDriveTest'
    testPage = 'uploadVideo'
    const token = await getGDriveToken()
    res.render('admin/'+testPage, { token });

});

router.get('/uploadPicture', ensureAuthenticated, async(req,res) =>{
    // testPage = 'googleDriveTest'
    testPage = 'uploadPicture'
    const token = await getGDriveToken()
    res.render('admin/'+testPage, { token });

});

router.get('/googleDriveTest', ensureAuthenticated, async(req,res) =>{
    testPage = 'googleDriveTest'
    // testPage = 'newAdd'
    const token = await getGDriveToken()
    res.render('admin/'+testPage, { token });
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

// ADDING THE CARD INFO FROM FORMS

// Add Card
router.post('/add', ensureAuthenticated, async (req, res) => {
    const { title, caption, tags, groups, type, link, thumbnailLink, metadata } = req.body;
    try {
        const newMedia = new Media({ title, caption, tags, groups, type, link, thumbnailLink, metadata });
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


// Tag Section
router.get('/tag', async (req, res) => {
    try {
        const tagItems = await Tag.find();
        res.json(tagItems)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/tag', ensureAuthenticated, async (req, res) => {
    const { tagName } = req.body;
    console.log(req.body)
    try {
        const newTag = new Tag({ tagName });
        await newTag.save();
        res.json(newTag)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Group Section
router.get('/group', async (req, res) => {
    try {
        const groupItems = await Group.find();
        res.json(groupItems)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/group', ensureAuthenticated, async (req, res) => {
    const { groupName } = req.body;
    try {
        const newGroup = new Group({ groupName });
        await newGroup.save();
        res.json(newGroup)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



module.exports = router;
