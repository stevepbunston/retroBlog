const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
        // ADMIN ADDITION
        role: {
            type: String,
            default: 'user' // Default role is 'user'
        }
        //END ADMIN ADDITION
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);