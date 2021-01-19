const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");

const { buscar } = require("./scraping/search");


const app = express()
let server = http.createServer(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//habilitar la carpta public
app.use(express.static(path.resolve(__dirname, "../public")))
const port = process.env.PORT || 3000;

app.get("/:search", (req, res) => {
    console.log(req.params.search);
    buscar(req.params.search).then(e => {
        res.json({
            ok: "ok",
            enlaces: e.enlaces,
            articulos: e.artiuclos
        })
    })



})



app.listen(port, () => {
    console.log("server en el puerto " + port);
})

module.exports = app
module.exports.handler = server