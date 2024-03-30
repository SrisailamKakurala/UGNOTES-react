const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Notes4you');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profile: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    downloads: Number,
    amount: Number,
})


module.exports = mongoose.model('user', userSchema);