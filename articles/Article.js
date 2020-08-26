const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category")

//configurando model
const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }

});
//relacionamento 1-N
Category.hasMany(Article); //UMA categoria tem muitos artigos
//relacionamento 1-1
Article.belongsTo(Category); //UM artigo pertence a UMA categoria

module.exports = Article;