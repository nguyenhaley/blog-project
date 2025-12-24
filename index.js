import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let blogPosts = [];
let postCounter = 0;

// tells Express where static files are (for css)
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("welcomePage.ejs", {});
});

app.get("/homepage", (req, res) => {
  res.render("homepage.ejs", {
    allPosts: blogPosts
  });

});

app.get("/create", (req, res) => {
  res.render("blogCreationPage.ejs", {});
});

app.post("/submit", (req, res) => {

    postCounter += 1;

    const post = {
        id: postCounter,
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        date: req.body.date
    };
    blogPosts.push(post);
    res.redirect(`/post/${post.id}`);
});

app.get("/post/:id", (req, res) => {
    let postId = parseInt(req.params.id);
    let foundPost = blogPosts.find((post) => post.id === postId);

    res.render("post.ejs", {
        post: foundPost
    });
});

app.post("/delete/:id", (req, res) => {
    let postId = parseInt(req.params.id);
    let postIndex = blogPosts.indexOf(blogPosts.find((post) => post.id === postId));
    blogPosts.splice(postIndex, 1);
    res.redirect("/homepage");
});

app.get("/edit/:id", (req, res) => {
    let postId = parseInt(req.params.id);
    let foundPost = blogPosts.find((post) => post.id === postId);

    res.render("editor.ejs", {
        post: foundPost
    });
});

app.post("/edit/:id", (req, res) => {
    let postId = parseInt(req.params.id);
    let foundPost = blogPosts.find((post) => post.id === postId);

    foundPost.title = req.body.title;
    foundPost.author = req.body.author;
    foundPost.content = req.body.content;
    foundPost.date = req.body.date;

    res.redirect(`/post/${foundPost.id}`);

});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
