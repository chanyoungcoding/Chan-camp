const express = require('express');
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, password, email } = req.body
        const user = new User({ username, email });
        const registerdUser = await User.register(user, password);
        req.login(registerdUser, err => {
            if (err) {
                return next(err)
            }            
            req.flash('success', 'Welcome to Chan Camp')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local',
    { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!!!')
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/campgrounds');
    });
});

module.exports = router