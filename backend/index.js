const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const _ = require("lodash");
const User = require("./Models/User");
const PORT = process.env.PORT || 4040;
const app = express();

app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(cors(
  {
  origin: ["https://vids-play-frontend.vercel.app"], 
  methods: ["POST", "GET"],
  credentials : true
}
));

const jwtSecret = "hdfhsdhfksdkfnksdnfknf";
//geneating salt to hash the password
const bcryptSalt = bcrypt.genSaltSync(10);

//connect to mongoose
mongoose.connect("mongodb+srv://jaybhayerutik2:S8org2gDgqvIod66@cluster0.zr5qyx9.mongodb.net/vidsPlay?retryWrites=true&w=majority");

app.get("/", (req, res) => {
  res.json("Working");
});

app.get('/userProfile', async (req, res) => {
    const { username } = req.query;

    if(username.includes('_')){
        username = username.split('_')[0];
    }
  
    try {
        const userData = await User.find({ username: new RegExp(`^${username}`, 'i') });

  
      if (!userData || userData.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }  
      res.json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    
 });

app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("no token");
  }
});

app.post("/login", async (req, res) => {
  const { username, password, OS, browser, deviceType } = req.body;

  const user = await User.findOne({ username });
  
  if (user) {
    //decrypt the password and compare
    const passwordMatched = bcrypt.compare(password, user.password);
    if (passwordMatched) {

        if(OS !== user.OS || deviceType !== user.deviceType || browser !== user.browser) {
            const newUsername = `${username}_${browser}_${deviceType}`;
            await User.create({
            username: newUsername,
            password: bcrypt.hashSync(password, bcryptSalt),
            OS: OS,
            deviceType: deviceType,
            browser: browser
          });
    }
      //send same token as we did at the time of register
      jwt.sign({ userId: user._id, username }, jwtSecret, {}, (err, token) => {
        res.cookie("token", token, { sameSite: "none", secure: true }).json({
          id: user._id,
        });
      });
    }
  }
});

app.post("/logout", (req, res) => {
  //set token to empty we'll logout
  res
    .cookie("token", {}, { sameSite: "none", secure: true })
    .json("Logged out");
});
app.post("/register", async (req, res) => {
  const { username, password, OS, deviceType, browser } = req.body;
  try {
    const hashedPass = bcrypt.hashSync(password, bcryptSalt);
    const createdUser = await User.create({
      username: username,
      password: hashedPass,
      OS: OS,
      deviceType: deviceType,
      browser: browser
    });
    jwt.sign(
      { userId: createdUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(201)
          .json({
            id: createdUser._id,
          });
      }
    );
  } catch (err) {
    if (err) throw err;
    res.status(500).json("error");
  }
});

const server = app.listen(PORT);
