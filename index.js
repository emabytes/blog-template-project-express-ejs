const express = require("express")
const app = express()
const data = require("./data.json")
const dataCopy = require("./dataCopy.json")
const bodyParser = require('body-parser')

//random 6 elements
const newArr = [];
for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * dataCopy.length);
    newArr.push(dataCopy[random]);
    dataCopy.splice(random, 1);
}

//first 6 elements
// const newArr = data.slice(0, 7)
// console.log(newArr)

app.set("view engine", "ejs")
app.use(express.static("public"))
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(5050, () => {
    console.log("server at http://localhost:5050")
})

app.get("/", (req, res) => {
    res.render("index", { title: "Home", data: data })
})

app.get("/newArticle", (req, res) => {
    res.render("newArticle", { title: "New Article", newArr: newArr })
})

app.post('/newArticleData', urlencodedParser, (req, res) => {
    console.log(req.body)
    console.log(req.body.name);
    console.log(req.body.url);
    console.log(req.body.author);
    console.log(req.body.message);

    res.status(201).redirect("/new")
})

app.use((req, res) => {
    res.render('404', { title: 'Not found' })
})