const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();
const port = process.env.port || 3000;

const handlers = require("./lib/handlers.js");

app.engine("handlebars", expressHandlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);

//about page
app.get("/about", handlers.about);

//cusotm 404 pages
app.use(handlers.notFound);

//custom 500 page
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`express started on port ${port}`);
  });
} else {
  module.exports = app;
}
