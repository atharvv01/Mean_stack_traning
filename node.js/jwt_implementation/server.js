import express, { json } from "express";
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";


const app = express();
app.use(json());

mongoose.connect("mongodb+srv://root:root@cluster0.yuaxwwm.mongodb.net/users_and_passwords");

// Creating schema for user database
const userSchema = new mongoose.Schema({
    user_name: String,
    password: String,
    jwt_token: String,
});

// Creating a model
const userModel = mongoose.model("user_data", userSchema);


//creating schema for post databsef
const postSchema = new mongoose.Schema({
    post_title: String,
    post_desc: String,
    posted_by: { type: mongoose.Schema.Types.ObjectId, ref: userModel ,
    required:true},  // This will create a foreign key in the posts table to
});

const postModel = mongoose.model("post_info", postSchema);
// signup route
app.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (!password || !username) {
        res.status(422).json({ error: "please enter all fields" })

    }
    userModel.findOne({ user_name: username })
        .then((saveduser) => {
            if (saveduser) {
                return res.status(422).json({ error: "user already exist" })
            }
            const user = new userModel({
                user_name: username,
                password: password
            })
            user.save()
                .then(user => {
                    res.json({ message: "saved successfully" })
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
})

/** Sign in route */
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    console.log(typeof username);
    console.log(password);
    // If username and password not given
    if (!password || !username) {
        return res.status(422).json({ error: "Please enter all fields" });
    }

    try {
        // Find user by username
        const user = await userModel.findOne({ user_name: username, password: password });
        console.log(user);
        // If user not found
        if (!user) {
            return res.status(422).json({ error: "Invalid user" });
        }

        // Check password


        // Sign JWT token
        const token = jwt.sign({ username }, process.env.SECRET_KEY);

        // Update user's JWT token in the database
        user.jwt_token = token;
        await user.save();

        return res.json({ token });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

//Authorized route
app.get('/authorize', (req, res) => {
    // get the authorization from headers
    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json({ error: "you be logged in" })
    }
    // remove Bearer from the token
    const token = authorization.replace("Bearer ", "")

    // verify the token and send the response
    const decodedData = jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged in" })

        }

        const username = payload
        res.send(username)
    })


})

// signup route
app.post('/post_creation', (req, res) => {
    let id;
    const title = req.body.post_title
    const desc = req.body.post_desc
    if (!title || !desc) {
        res.status(422).json({ error: "please enter all fields" })

    }
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401).json({ error: "you be logged in" })
    }
    // remove Bearer from the token
    const token = authorization.replace("Bearer ", "")

    // verify the token and send the response
    let username
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged in" })

        }

         username = payload.username
         console.log("username "+username);
        
    })
    
    userModel.findOne({user_name:username})
    .then(userdata=>{
        console.log(userdata);
        id = userdata._id
        const post = new postModel({
            post_title: title,
            post_desc: desc,
            posted_by:id
        })
        post.save()
        .then((savedpost)=>{
            res.send("saved")
        })
        .catch(err=>{
            res.send("cannot post")
        })
        
    })
    .catch(err=>{
        res.send(err)
    })
    

    

});

app.get(("/posts"),(req,res) =>{
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401).json({ error: "you be logged in" })
    }
    // remove Bearer from the token
    const token = authorization.replace("Bearer ", "")

    // verify the token and send the response
    let username
    const decodedData = jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged in" })

        }

         username = payload.username
        
    })
    let _id;
    userModel.findOne({user_name:username})
    .then(userdata=>{
        _id = userdata._id
        postModel.find({posted_by : _id})
        .then((result)=>{
           res.send(result)
        })
    })

})


app.listen(process.env.PORT, () => {
    console.log("Listening on " + process.env.PORT);
})