const Joi = require('joi');

module.exports.articleSchema = Joi.object({
    article: Joi.object({
        title: Joi.string().required(),
        game: Joi.string().required(),
        release: Joi.string().required(),
        console: Joi.string().required(),
        blog: Joi.string().required(),
        movies: Joi.array().items(
            Joi.object({
                title: Joi.string().required()
            })
        ).min(1).required(),
        music: Joi.array().items(
            Joi.object({
                title: Joi.string().required()
            })
        ).min(1).required(), // Mark music as required
        nba: Joi.array().items(
            Joi.object({
                title: Joi.string().required()
            })
        ).min(1).required(), // Mark nba as required
        mlb: Joi.array().items(
            Joi.object({
                title: Joi.string().required()
            })
        ).min(1).required(), // Mark mlb as required
        nfl: Joi.array().items(
            Joi.object({
                title: Joi.string().required()
            })
        ).min(1).required(), // Mark nfl as required
        nhl: Joi.array().items(
            Joi.object({
                title: Joi.string().required()
            })
        ).min(1).required() // Mark nhl as required
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(10),
        body: Joi.string().required()
    }).required()
});
