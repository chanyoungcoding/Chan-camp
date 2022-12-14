const User = require('../models/user');

module.exports.renderRegister = (req,res) => {
    res.render('users/register')
}

module.exports.register = async(req,res) => {
    try{
    const {email, username, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if(err) return next(err)
    })
    req.flash('Welcome to Chan Camp!!!!')
    res.redirect('/campgrounds')
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register')
    }
}

module.exports.renderRogin = (req,res) => {
    res.render('users/login')
}

module.exports.login = (req,res) => {
    req.flash('success', 'welcome back!!')
    const requestUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo;
    res.redirect(requestUrl)
}

module.exports.logout = (req,res) => {
    req.logout();
    req.flash('success', 'Good bye!!')
    res.redirect('/campgrounds')
}