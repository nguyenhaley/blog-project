import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// tells Express where static files are (for css)
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("welcomePage.ejs", {});
});

app.get("/homepage", (req, res) => {
  res.render("homepage.ejs", {});
});

app.get("/create", (req, res) => {
  res.render("blogCreationPage.ejs", {});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
