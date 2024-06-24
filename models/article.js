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
            fileName: String
        }
    ],
    console: String,
    movieOne: String,
    movieOneImage: {
        url: String,
        fileName: String
    },
    movieTwo: String,
    movieTwoImage: {
        url: String,
        fileName: String
    },
    movieThree: String,
    movieThreeImage: {
        url: String,
        fileName: String
    },
    movieFour: String,
    movieFourImage: {
        url: String,
        fileName: String
    },
    movieFive: String,
    movieFiveImage: {
        url: String,
        fileName: String
    },
    musicOne: String,
    musicOneImage: {
        url: String,
        fileName: String
    },
    musicTwo: String,
    musicTwoImage: {
        url: String,
        fileName: String
    },
    musicThree: String,
    musicThreeImage: {
        url: String,
        fileName: String
    },
    musicFour: String,
    musicFourImage: {
        url: String,
        fileName: String
    },
    musicFive: String,
    musicFiveImage: {
        url: String,
        fileName: String
    },
    nhlOne: String,
    nhlOneImage: {
        url: String,
        fileName: String
    },
    nhlTwo: String,
    nhlTwoImage: {
        url: String,
        fileName: String
    },
    nhlThree: String,
    nhlThreeImage: {
        url: String,
        fileName: String
    },
    nhlFour: String,
    nhlFourImage: {
        url: String,
        fileName: String
    },
    nhlFive: String,
    nhlFiveImage: {
        url: String,
        fileName: String
    },
    nbaOne: String,
    nbaOneImage: {
        url: String,
        fileName: String
    },
    nbaTwo: String,
    nbaTwoImage: {
        url: String,
        fileName: String
    },
    nbaThree: String,
    nbaThreeImage: {
        url: String,
        fileName: String
    },
    nbaFour: String,
    nbaFourImage: {
        url: String,
        fileName: String
    },
    nbaFive: String,
    nbaFiveImage: {
        url: String,
        fileName: String
    },
    mlbOne: String,
    mlbOneImage: {
        url: String,
        fileName: String
    },
    mlbTwo: String,
    mlbTwoImage: {
        url: String,
        fileName: String
    },
    mlbThree: String,
    mlbThreeImage: {
        url: String,
        fileName: String
    },
    mlbFour: String,
    mlbFourImage: {
        url: String,
        fileName: String
    },
    mlbFive: String,
    mlbFiveImage: {
        url: String,
        fileName: String
    },
    nflOne: String,
    nflOneImage: {
        url: String,
        fileName: String
    },
    nflTwo: String,
    nflTwoImage: {
        url: String,
        fileName: String
    },
    nflThree: String,
    nflThreeImage: {
        url: String,
        fileName: String
    },
    nflFour: String,
    nflFourImage: {
        url: String,
        fileName: String
    },
    nflFive: String,
    nflFiveImage: {
        url: String,
        fileName: String
    },
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