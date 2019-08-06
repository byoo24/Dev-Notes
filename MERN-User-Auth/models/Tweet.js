const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        require: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});



const Tweet = mongoose.model('tweet', TweetSchema);

module.exports = Tweet;