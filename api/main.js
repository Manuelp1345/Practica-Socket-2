const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { buscar } = require("./scraping/search");

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//habilitar la carpta public
const publicPath = path.resolve(__dirname, '../public');
console.log(publicPath);
app.use(express.static(publicPath));

app.get("/api/:search", (req, res) => {

    buscar(req.params.search).then(e => {
        res.json({
            ok: "ok",
            enlaces: e.enlaces,
            articulos: e.artiuclos
        })
    })



})

module.exports = app