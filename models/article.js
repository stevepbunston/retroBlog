const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const MovieSchema = new Schema({
    title: String,
    image: ImageSchema // Include image schema
});

// Define separate schemas for music, nba, mlb, nfl, nhl
const MusicSchema = new Schema({
    title: String,
    image: ImageSchema
});

const NBASchema = new Schema({
    title: String,
    image: ImageSchema
});

const MLBSchema = new Schema({
    title: String,
    image: ImageSchema
});

const NFLSchema = new Schema({
    title: String,
    image: ImageSchema
});

const NHLSchema = new Schema({
    title: String,
    image: ImageSchema
});

const ArticleSchema = new Schema({
    title: String,
    game: String,
    release: String,
    description: String,
    blog: String,
    console: String,
    movies: [MovieSchema], // Array of movies with title and image
    images: [ImageSchema], // Array of images with URL and filename
    music: [MusicSchema], // Array of music with title and image
    nba: [NBASchema], // Array of NBA items with title and image
    mlb: [MLBSchema], // Array of MLB items with title and image
    nfl: [NFLSchema], // Array of NFL items with title and image
    nhl: [NHLSchema], // Array of NHL items with title and image
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]
});

ArticleSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});

module.exports = mongoose.model('Article', ArticleSchema);
