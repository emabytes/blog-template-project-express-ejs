const express = require("express")
const app = express()
const data = require("./data.json")
const dataCopy = require("./dataCopy.json")
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5050;

//random 6 elements
// const newArr = [];
// for (let i = 0; i < 6; i++) {
//     let random = Math.floor(Math.random() * dataCopy.length);
//     newArr.push(dataCopy[random]);
//     dataCopy.splice(random, 1);
// }

//first 6 elements
const newArr = data.slice(0, 7)
// console.log(newArr)

app.set("view engine", "ejs")
app.use(express.static("public"))
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(PORT, () => {
    console.log("server at http://localhost:5050")
})

app.get("/", (req, res) => {
    res.status(200.).render("index", { data: data })
})

app.get("/newArticle", (req, res) => {
    res.render("newArticle", { newArr: newArr, data: data })
})

app.get("/blog/:id", (req, res) => {
    console.log(req.params.id)
    res.render("blogItem", { blogItem: data[req.params.id], data: data })
})

app.post('/newData', urlencodedParser, (req, res) => {
    let monthsArr = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let today = new Date();
    let month = monthsArr[today.getMonth()];
    let day = today.getDate();
    let year = today.getFullYear();

    let newData = {
        id: data.length,
        url: req.body.url,
        title: req.body.title,
        body: req.body.body,
        published_at: `${month} ${day}, ${year}`,
        duration: (req.body.body.length / 400).toFixed(),
        author: req.body.author,
        author_bild: req.body.authorPicture
    }
    console.log(newData)
    data.push(newData)

    res.status(201).redirect('/')
})

app.use((req, res) => {
    res.render("404")
})