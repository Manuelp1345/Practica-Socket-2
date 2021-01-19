const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const server = require("serverless-http");
const { buscar } = require("./scraping/search");


const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//habilitar la carpta public
app.use(express.static(path.resolve(__dirname, "../public")))

app.get("/:search", (req, res) => {
    console.log(req.params.search);
    buscar(req.params.search).then(e => {
        res.json({
            e
        })
    })



})



app.listen(3000, () => {
    console.log("server en el puerto 3000");
})

module.exports = app
module.exports.handler = server(app)