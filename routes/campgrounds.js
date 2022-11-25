const express = require('express');
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const campgrounds = require('../controllers/campgrounds')

router.get('/', catchAsync(campgrounds.index))

router.get('/new', isLoggedIn ,(req, res) => {
    res.render('campgrounds/new')
})

router.post('/', isLoggedIn , isAuthor ,validateCampground ,catchAsync(campgrounds.newCamp))

router.get('/:id', catchAsync(campgrounds.showCamp))

router.put('/:id', isLoggedIn , isAuthor ,validateCampground, catchAsync(campgrounds.updateCamp))

router.delete('/:id', isLoggedIn , isAuthor ,validateCampground ,catchAsync(campgrounds.deleteCamp))

router.get('/:id/edit', isLoggedIn, isAuthor ,catchAsync(campgrounds.editCamp))

module.exports = router
