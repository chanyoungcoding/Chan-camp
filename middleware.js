const {campgroundSchema} = require('./schemas')
const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campground')

module.exports = (req,res,next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'you must be signed up!!')
        return res.redirect('/login')
    }
    next()
}

// const validateCampground = (req,res,next) => {
//     const {error} = campgroundSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map((el)=> el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next()
//     }
// }

// const isAuthor = async(req,res,next) => {
//     const {id} = req.params;
//     const campground = await Campground.findById(id);
//     if(!campground.author.equals(req.user._id)) {
//         req.flash('error', '사용자 권한이 없습니다.')
//         return res.redirect(`/campgrounds/${id}`)
//     }
//     next()
// }

// module.exports = validateCampground
// module.exports = isAuthor