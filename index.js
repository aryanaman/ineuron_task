var express = require("express");
var app = express();
var mongoose = require("mongoose");
var User = require("./models/index.js");

var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/ineutronDatabase", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database connection established successfully....");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("home");
});

app.post("/insert", (req, res) => {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user.save(() => {
    res.redirect("/show");
  });
});

app.get("/show", (req, res) => {
  User.find({}, (err, result) => {
    res.render("show", { users: result });
  });
});

app.get("/delete/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/show");
});

app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id, (err, result) => {
    res.render("edit", { users: result });
  });
});

app.post("/update/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/show");
});

var server = app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
