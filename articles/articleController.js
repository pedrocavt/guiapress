const express = require("express");
const router = express.Router();

router.get("/articles", (req, res) => {
    res.send("Rota artigos");
});

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
})

module.exports = router;