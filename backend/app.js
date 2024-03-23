import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import Account from './models/account.js'

// Initialize Express app
const app = express()
const port = 3000

// Define a JWT secret key. This should be isolated by using env variables for security
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg'

// Set up CORS and JSON middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set up connection with MongoDB
const mongoDB = "mongodb+srv://naiping:FzPM9mj4YjwsTaP4@cluster0.y4egej3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

// register: check unique email => hash the given password and create a new user in mongodb
app.post('/register', async (req, res) => {
    const user = await Account.find({email: req.body.email}).exec();

    //exist email
    if(user.length > 0){
        res.status(400).json({message: 'Exist email'})
    }
    else{//no exist email
        bcrypt.hash(req.body.password, 10, async function (_err, hash) {
            const user = new Account ({
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            console.log(user)
            await user.save();
    
            res.status(201).json({ message: 'register success'})
        })
    }
})

//find user by email
app.get('/login', async (req, res) => {

    // Look up the user email in the database
    const user = await Account.find({email : req.body.email}).exec();

    console.log('user length is');
    console.log(user.length);

    // If found, compare the hashed passwords and generate the JWT token for the user
    if(user.length === 1){
        bcrypt.compare(req.body.password, user[0].password, function (_err, result) {
            if (!result) {
                return res.status(401).json({ message: 'Invalid password' })
            } else {
                let loginData = {
                    email: req.body.email,
                    signInTime: Date.now(),
                }

                const token = jwt.sign(loginData, jwtSecretKey)
                res.status(200).json({ message: 'success', token })
            }
        })
    }else {// If no user is found
        res.status(401).json({ message: 'Invalid username'})
    }
})


// The verify endpoint that checks if a given JWT token is valid
app.post('/verify', (req, res) => {
    const tokenHeaderKey = 'jwt-token'
    const authToken = req.headers[tokenHeaderKey]
    try {
        const verified = jwt.verify(authToken, jwtSecretKey)
        if (verified) {
            return res.status(200).json({ status: 'logged in', message: 'success' })
        } else {
            // Access Denied
            return res.status(401).json({ status: 'invalid auth', message: 'error' })
        }
    } catch (error) {
        // Access Denied
        return res.status(401).json({ status: 'invalid auth', message: 'error' })
    }
})

app.listen(port, () => {
    console.log(`backend is listening on port ${port}`)
})