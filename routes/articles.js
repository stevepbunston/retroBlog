const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const articles = require('../controllers/articles');
const { validateArticle, isAdmin } = require('../middleware');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(articles.index))
    .post(isAdmin, upload.array('image'),validateArticle, catchAsync(articles.createArticle));
router.get('/new', isAdmin, articles.renderNewForm);

router.route('/:id')
    .get(catchAsync(articles.renderEditForm))
    .put(validateArticle, isAdmin, catchAsync(articles.updateArticle))
    .delete(isAdmin, catchAsync(articles.deleteArticle));

router.get('/:id/edit', isAdmin, catchAsync(articles.editArticle));

module.exports = router;