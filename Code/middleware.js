const ExpressError = require('./utils/ExpressError');
module.exports.IsLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'You must be signed in first')
        return res.redirect('/log-in')
    }
    next();
}