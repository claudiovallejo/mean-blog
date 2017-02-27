//  Left video at 1:05:34
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
//  Static content lives under current directory name + public
app.use(express.static(__dirname + '/public'));
//  Setup server at port 3000
app.listen(3000);
//  Create live connection to database
mongoose.connect('localhost/test');
//  Mongoose Schema (describes the structure of the blogpost)
var PostSchema = mongoose.Schema({
  posted: {type: Date, default: Date.now},
  title: {type: String, required: true},
  tag: {type: String, enum: ['POLITICS', 'ECONOMY', 'EDUCATION']},
  body: String
}, {collection: 'post'});
//  Mongoose Model
var PostModel = mongoose.model("PostModel", PostSchema);
//  Body Parser Config
app.use(bodyParser.json()); //  Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); //  Parse application/x-www-form-urlencoded
//  Create Blog Post
app.post("/api/blogpost", createPost);
function createPost(req, res) {
  var post = req.body;
  console.log(post);
  PostModel
    .create(post)
    .then(
      function(postObj){
        res.json(200);
      },
      function(error){
        res.sendStatus(400);
      }
    );
}
//  Get all Blog Posts
app.get("/api/blogpost", getAllPosts);
function getAllPosts(req, res) {
  PostModel
    .find()
    .then(
      function(posts){
        res.json(posts);
      },
      function(err){
        res.sendStatus(400);
      }
    )
}
