const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session")
const connection = require("./database/database");

//Sessions

//Redis

app.use(session({
    secret: "aslçdkasçdkdasdasd,lç,",
    cookie: { maxAge: 10000 * 30 } //30 segundos
}))

//Rotas controller
const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articleController");
const userController = require("./user/userController")

//importando os modules
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./user/User")

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

app.use("/", userController)


app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 2
    }).then(articles => {

        Category.findAll().then(categories => {
            res.render("index", { articles: articles, categories: categories })
        })

    });
})

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", { article: article, categories: categories })
            })
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/")
    })
})

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }]
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", { articles: category.articles, categories: categories })
            })
        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
})

//abrindo o servidor
app.listen(9000, () => {
    console.log("O servidor esta rodando!");
});