const port = 3000
const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const userModel = require('./models/users')
const postModel = require('./models/posts')
const upload = require('./multer')
const path = require('path')
require('dotenv').config();


const secretKey = process.env.SECRET_KEY;


// middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

// passport setup 
app.use(expressSession({
    saveUninitialized: true,
    resave: true,
    secret: secretKey
}))

// Register endpoint
app.post('/', async (req, res) => {
    try {
        // Extract user details from request body
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword
        });

        // Save the new user
        await newUser.save();

        // Store user details in session
        req.session.userDets = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email
        };

        // Respond with user details
        res.status(201).json({ user: req.session.userDets });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Login endpoint
app.post('/login',async function (req, res, next) {
    try {
        // Extract login credentials from request body
        const { username, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ username });

        if (!user) {
            // User not found
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            // Passwords do not match
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Store user details in session
        req.session.userDets = {
            _id: user._id,
            username: user.username,
            email: user.email
        };

        console.log(req.session.userDets);
        // Respond with user details
        res.json({ user: req.session.userDets });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/getuser', (req, res) => {
    try {
        console.log("Session user data:", req.session.userDets);
        const user = req.session.userDets;
        res.status(200).json({ user });
    } catch(err) {
        console.error('Error retrieving user data:', err);
        res.status(400).send(err);
    } 
});


// app.post('/profileUpdate', upload.single('profileImg'), async (req, res) => {
//     // console.log('File uploaded:', req.file.filename);
//     // console.log(req.body.userId)
//     const user = await userModel.findOne({ _id: req.body.userId });
//     user.profile = `http://localhost:3000/uploads/${req.file.filename}`;
//     await user.save()
//     // Process the uploaded file, e.g., save it to a database or file system
//     res.send(req.file.filename);
// });


// app.get('/uploads/:profile', (req, res) => {
//     const filename = req.params.profile;
//     res.sendFile(filename, { root: path.join(__dirname, 'public', 'uploads') });
// })



// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) return next();
//     res.redirect('http://localhost:5173/login');
// }

app.listen(port, () => {
    console.log('server started');
})