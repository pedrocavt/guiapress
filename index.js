const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//Rotas controller
const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articleController");

//importando os modules
const Article = require("./articles/Article");
const Category = require("./categories/Category");

//view engine
app.set('view engine', 'ejs');

//static
app.use(express.static("public"));

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco feita com sucesso");
    }).catch((error) => {
        console.log(error);
    });

//rotas
app.use("/", categoriesController);

app.use("/", articlesController);

app.get("/", (req, res) => {
    res.render("index");
});

//abrindo o servidor
app.listen(9000, () => {
    console.log("O servidor esta rodando!");
});