const express = require('express');
const app =express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')
const users = require('./routes/user')

mongoose.connect('mongodb://0.0.0.0:27017/chanCamp')
    .then(() => {
        console.log('MONGODB CONNECT!!')
    })  
    .catch(err => {
        console.log('에러가 발생했습니다. ')
        console.log(err)
    })

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'chanSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    next();
})

app.get('.fakeUser', async(req, res) => {
    const user = new User({ email: 'chan@naver.com', username: 'chan' })
    const newUser = await User.register(user, 'chicken')
    res.send(newUser)
})

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)
app.use('/', users)

app.get('/', (req,res) => {
    res.render('home')
})

app.all('*', (req,res,next) => {
    next(new ExpressError('Page not Found', 404))
})

app.use((err,req,res,next) => {
    const { status = 500 } = err
    if(!err.message) {
        err.message = 'Something wrong'
    }
    res.status(status).render('error', {err})
})

app.listen(3000, (req,res) => {
    console.log('서버 가동')
})