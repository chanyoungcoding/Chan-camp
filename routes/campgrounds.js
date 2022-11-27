const express = require('express');
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const { campgroundSchema } = require('../schemas.js')
const Campground = require('../models/campground')
const isLoggedIn = require('../middleware')
const campgrounds = require('../controllers/campgrounds')
const multer = require('multer');
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })

//서버 유효성 검사
const validateCampground = (req,res,next) => {
    const {error} = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el)=> el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

const isAuthor = async(req,res,next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)) {
        req.flash('error', '사용자 권한이 없습니다.')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn , upload.array('image') ,validateCampground , catchAsync(campgrounds.createCampground))


router.get('/new', isLoggedIn , campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor , upload.array('image') ,validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn , isAuthor ,catchAsync(campgrounds.destroyCampground))

router.get('/:id/edit', isLoggedIn , isAuthor ,catchAsync(campgrounds.renderEditForm))

module.exports = router