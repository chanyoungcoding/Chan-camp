const express = require('express');
const router = express.Router({mergeParams : true }) 
const Review = require('../models/review')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground')
const reviews = require('../controllers/reviews')
const { reviewSchema } = require('../schemas.js')
const isLoggedIn = require('../middleware')

const validateReview = (req,res,next) => {
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el)=> el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

const isReviewAuthor = async(req,res,next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)) {
        req.flash('error', '사용자 권한이 없습니다.')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

router.post('/', isLoggedIn ,validateReview ,catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor ,catchAsync(reviews.destroyReview))

module.exports = router