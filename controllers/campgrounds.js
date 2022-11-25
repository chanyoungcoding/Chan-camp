const Campground = require('../models/campground')

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.newCamp = async(req,res) => {
    const campground = new Campground(req.body.campground)
    campground.author = req.user._id
    await campground.save();
    req.flash('success', 'Successfully made a new Campground')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCamp = async(req,res) => {
    const { id } = req.params
    const campground = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author')
    if (!campground) {
        req.flash('error', 'Cannot find that campground!!')
    }
    res.render('campgrounds/show', { campground })
}

module.exports.updateCamp = async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'Successfully updated Campground!!')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCamp = async(req,res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted Campground!!')
    res.redirect('/campgrounds')
}

module.exports.editCamp = async(req,res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground!!')
    }
    res.render('campgrounds/edit', { campground })
}

