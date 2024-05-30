const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth');
const Media = require('../models/Media');

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
