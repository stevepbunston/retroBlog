const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const articles = require('../controllers/articles');
const { validateArticle, isAdmin } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(articles.index))
    .post(
        isAdmin,
        upload.fields([
            { name: 'image', maxCount: 5 },
            { name: 'movies', maxCount: 5 },
            { name: 'music', maxCount: 5 }, // Add music field
            { name: 'nba', maxCount: 5 }, // Add NBA field
            { name: 'mlb', maxCount: 5 }, // Add MLB field
            { name: 'nfl', maxCount: 5 }, // Add NFL field
            { name: 'nhl', maxCount: 5 } // Add NHL field
        ]),
        validateArticle,
        catchAsync(articles.createArticle)
    );


router.get('/new', isAdmin, articles.renderNewForm);

router.route('/:id')
    .get(catchAsync(articles.renderEditForm))
    .put(isAdmin, validateArticle, catchAsync(articles.updateArticle))
    .delete(isAdmin, catchAsync(articles.deleteArticle));

router.get('/:id/edit', isAdmin, catchAsync(articles.editArticle));

module.exports = router;
