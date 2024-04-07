const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/Notes4you');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profile: {
        type: String,
        default: 'https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png'
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    downloads: {
        type: Number,
        default: 0,
    },
    amount: {
        type: Number,
        default: 0,
    },
})


module.exports = mongoose.model('user', userSchema);