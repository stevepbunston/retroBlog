const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const ArticleSchema = new Schema({
    title: String,
    game: String,
    release: String,
    description: String,
    blog: String,
    images: [
        {
            url: String,
            filename: String
        }
    ],
    console: String,
    movieOne: String,
    movieOneImage: String,
    movieTwo: String,
    movieTwoImage: String,
    movieThree: String,
    movieThreeImage: String,
    movieFour: String,
    movieFourImage: String,
    movieFive: String,
    movieFiveImage: String,
    musicOne: String,
    musicOneImage: String,
    musicTwo: String,
    musicTwoImage: String,
    musicThree: String,
    musicThreeImage: String,
    musicFour: String,
    musicFourImage: String,
    musicFive: String,
    musicFiveImage: String,
    nhlOne: String,
    nhlOneImage: String,
    nhlTwo: String,
    nhlTwoImage: String,
    nhlThree: String,
    nhlThreeImage: String,
    nhlFour: String,
    nhlFourImage: String,
    nhlFive: String,
    nhlFiveImage: String,
    nbaOne: String,
    nbaOneImage: String,
    nbaTwo: String,
    nbaTwoImage: String,
    nbaThree: String,
    nbaThreeImage: String,
    nbaFour: String,
    nbaFourImage: String,
    nbaFive: String,
    nbaFiveImage: String,
    mlbOne: String,
    mlbOneImage: String,
    mlbTwo: String,
    mlbTwoImage: String,
    mlbThree: String,
    mlbThreeImage: String,
    mlbFour: String,
    mlbFourImage: String,
    mlbFive: String,
    mlbFiveImage: String,
    nflOne: String,
    nflOneImage: String,
    nflTwo: String,
    nflTwoImage: String,
    nflThree: String,
    nflThreeImage: String,
    nflFour: String,
    nflFourImage: String,
    nflFive: String,
    nflFiveImage: String,
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