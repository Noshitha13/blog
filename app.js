console.log("app is running")
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post-route");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.get("/", (req, res) => {
    res.render("index");  
});
app.use("/", userRoutes);
app.use("/posts", postRoutes);

app.listen(8021, () => console.log("Server running on port 8021"));
