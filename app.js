//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const aboutContent = "I’ve been working as a digital artist and web developer for over five years, and during that time I’ve had the pleasure of working with a wide range of clients. My passion for design and technology started at a young age, and I’ve been honing my skills ever since. When I’m not working on client projects, you can usually find me experimenting with new techniques and technologies, or exploring the great outdoors.";
const homeStartingContent = "Welcome to Ken Nagamine's Daily Journal, where you'll find daily reflections on life and personal growth. Through sharing his own experiences, Ken hopes to inspire others to take time to reflect on their own lives and cultivate a deeper sense of self-awareness. Join our community of like-minded individuals who value the transformative power of self-reflection, and let's explore the ups and downs of life together to discover the beauty and meaning in everyday moments.";
const contactContent = "We'd love to hear from you! If you have any questions, comments, or feedback about Ken Nagamine's Daily Journal, please don't hesitate to get in touch with us. You can reach us via email at [insert email address], or by filling out the contact form below. We'll do our best to get back to you as soon as possible. Thank you for your interest in Ken Nagamine's Daily Journal. We look forward to connecting with you and continuing the journey of self-reflection and personal growth together.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = []

app.get("/", function(req, res){
  res.render("home", { startingContent: homeStartingContent, postsArray: posts })
  
  // console.log(posts)
})

app.get("/about", function(req, res){
  res.render("about", { aboutMeContent: aboutContent })
})

app.get("/contact", function(req, res){
  res.render("contact", { contactMeContent: contactContent })
})

app.get("/compose", function(req, res){
  res.render("compose")
})

app.post("/compose", function(req, res){
  const post = {}
  post.title = req.body.title
  post.content = req.body.content
  posts.push(post)

  res.redirect("/")  
})

app.get("/post/:extension", function(req, res){
  const requestedTitle = _.lowerCase(req.params.extension)

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title)

    if (storedTitle === requestedTitle){
      res.render("post", { 
        title: post.title,
        content: post.content
       })
    } 
  })

})




// process.env.PORT makes a dynamic port for Heroku deployment
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000")
})
