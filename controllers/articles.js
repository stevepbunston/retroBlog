const Article = require('../models/article');

module.exports.index = async(req, res) => {
    const articles = await Article.find({});
    res.render('articles/index', {articles});
}

module.exports.renderNewForm = (req, res) => {
    res.render('articles/new');
}

module.exports.createArticle = async (req, res, next) => {
    //if(!req.body.article) throw new ExpressError("Invalid Article", 404);
    const article = new Article(req.body.article);
    article.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    await article.save();
    console.log(article);
    req.flash('success', 'Successfully created new article!');
    res.redirect(`/articles/${article._id}`);
}

module.exports.renderEditForm = async (req, res) => {
    const article = await Article.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    });
    if(!article){
        req.flash('error', 'Cannot find article!');
        return res.redirect('/articles');
    }
    res.render('articles/show', {article});
}

module.exports.editArticle = async (req, res) => {
    const article = await Article.findById(req.params.id);
    if(!article){
        req.flash('error', 'Cannot find article!');
        return res.redirect('/articles');
    }
    res.render('articles/edit', {article});
}

module.exports.updateArticle = async(req, res) => {
    const { id } = req.params;
    const article = await Article.findByIdAndUpdate(id,{...req.body.article});
    req.flash('success', 'Successfully updated article!');
    res.redirect (`/articles/${article._id}`);
}

module.exports.deleteArticle = async(req, res) => {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted article!');
    res.redirect('/articles');
}