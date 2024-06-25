const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const RankedImageSchema = new Schema({
    rank: Number,
    name: String,
    image: ImageSchema
});

const ArticleSchema = new Schema({
    title: String,
    game: String,
    release: String,
    description: String,
    blog: String,
    images: [ImageSchema],
    console: String,
    movies: [RankedImageSchema],
    music: [RankedImageSchema],
    nhl: [RankedImageSchema],
    nba: [RankedImageSchema],
    mlb: [RankedImageSchema],
    nfl: [RankedImageSchema],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
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