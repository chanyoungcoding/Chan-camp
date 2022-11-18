const express = require('express');
const app =express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError')

const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')

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

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

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