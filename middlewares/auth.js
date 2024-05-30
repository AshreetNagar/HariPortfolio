// THIS IS THE COPIED THIS I JUST CHANGED A BIT SO IT MAKES SENSE WITH OURS
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin/login');
}

module.exports = ensureAuthenticated;
