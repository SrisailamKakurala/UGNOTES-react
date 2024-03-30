const port = 3000
const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('./models/users')
const postModel = require('./models/posts')
require('dotenv').config();


const jwtSecret = process.env.JWT_SECRET;


// middlewares
app.use(express.json())
app.use(cors())

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403) // Forbidden
        req.user = user
        next()
    })
}

// Register endpoint
app.post('/', async (req, res) => {
    try {
        // Extract user details from request body
        const { username, email, password } = req.body

        // Check if user already exists
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword
        })

        // Save the user to the database
        await newUser.save()

        // Generate JWT token
        const accessToken = generateAccessToken({ username: newUser.username })

        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Registration error:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})


// Login endpoint
app.post('/login', async (req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;
        
        // Check if the user exists
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        // If the username and password are valid, generate a JWT token
        const accessToken = generateAccessToken({ username: user.username });
        
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Function to generate JWT token
function generateAccessToken(user) {
    if (!jwtSecret) {
        throw new Error('JWT secret is not defined')
    }
    return jwt.sign(user, jwtSecret, { expiresIn: '1m' }) // Token expires in 15 minutes
}

app.post('/profileUpdate', async (req, res) => {

})


app.listen(port, () => {
    console.log('server started');
})