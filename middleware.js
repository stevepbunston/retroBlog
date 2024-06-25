const { articleSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Review = require('./models/review');


module.exports.validateArticle = (req, res, next) => {
    const { error } = articleSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}



module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // add this line
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}


module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

//ADMIN ADDITION
module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    //remove flash as we have an h1 in the error page with message
    // req.flash('error', 'You do not have permission');
    const referer = req.get('Referer') || '/ahahahhh';
    res.redirect(referer);
};
//END ADMIN ADDITION


module.exports.isReviewAuthorOrAdmin = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash('error', 'Review not found!');
        return res.redirect(`/articles/${id}`);
    }

    // Check if the user is the author of the review or an admin
    if (!review.author.equals(req.user._id) && !req.user.role === 'admin') {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/articles/${id}`);
    }
    next();
}