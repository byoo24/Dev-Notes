// This creates a new Express server.
const express = require("express");
const app = express();

// Mongoose
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const passport = require('passport');
const bodyParser = require('body-parser');

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require("./models/User");




// connect to mongoose
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));



app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// Basic route so that we can render some information on our page.
// app.get("/", (req, res) => {
//     const user = new User({
//         handle: "Jim",
//         email: "jim@jim.jim",
//         password: "jimisgreat123",
//     });
//     user.save();
//     res.send("Hello World!!!");
// });

app.use(passport.initialize());

app.use("/api/users", users);
app.use("/api/tweets", tweets);




// process.env.PORT is for deploying to heroku
const port = process.env.PORT || 5000;

// Tell Express to start a socket and listen for connections on the path.
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});