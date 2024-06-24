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
    .post(isAdmin, upload.array('image'),
    upload.single('movieOneImage'),
    upload.single('movieTwoImage'),
    upload.single('movieThreeImage'),
    upload.single('movieFourImage'),
    upload.single('movieFiveImage'),
    upload.single('musicOneImage'),
    upload.single('musicTwoImage'),
    upload.single('musicThreeImage'),
    upload.single('musicFourImage'),
    upload.single('musicFiveImage'),
    upload.single('nbaOneImage'),
    upload.single('nbaTwoImage'),
    upload.single('nbaThreeImage'),
    upload.single('nbaFourImage'),
    upload.single('nbaFiveImage'),
    upload.single('nhlOneImage'),
    upload.single('nhlTwoImage'),
    upload.single('nhlThreeImage'),
    upload.single('nhlFourImage'),
    upload.single('nhlFiveImage'),
    upload.single('nflOneImage'),
    upload.single('nflTwoImage'),
    upload.single('nflThreeImage'),
    upload.single('nflFourImage'),
    upload.single('nflFiveImage'),
    upload.single('mlbOneImage'),
    upload.single('mlbTwoImage'),
    upload.single('mlbThreeImage'),
    upload.single('mlbFourImage'),
    upload.single('mlbFiveImage'),
    validateArticle, catchAsync(articles.createArticle));

router.get('/new', isAdmin, articles.renderNewForm);

router.route('/:id')
    .get(catchAsync(articles.renderEditForm))
    .put(validateArticle, isAdmin, catchAsync(articles.updateArticle))
    .delete(isAdmin, catchAsync(articles.deleteArticle));

router.get('/:id/edit', isAdmin, catchAsync(articles.editArticle));

module.exports = router;