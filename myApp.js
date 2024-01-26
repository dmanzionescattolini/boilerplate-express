let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    console.log(req.method + " " + req.url + " - " + req.ip);
    next();
})

app.get("/now", function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.json({"time": req.time});
})
app.get("/:word/echo", function (req, res) {
    let word = req.params.word;
    res.json({"echo": word});
})
app.route("/name").get(function (req, res) {
    res.json({"name": req.query.first + " " + req.query.last});
}).post(function (req, res) {
    res.json({"name": req.body.first + " " + req.body.last});
})
app.get('/', function (req, res) {
    let absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});
app.use("/public", express.static(__dirname + '/public'));
app.get("/json", function (req, res) {
    let upcaseOrNot = process.env.MESSAGE_STYLE;
    if (upcaseOrNot === "uppercase") {
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    }
})

console.log("Hello World");


module.exports = app;
