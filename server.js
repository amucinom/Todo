var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 4567;

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

var db = require('mongoskin').db('mongodb://user:password@localhost:27017/todo');
console.log(db);

var todos = [];

app.get("/addtodo", function (req, res) {
	var x = req.query.newtodo;
  var callback = function (error, result) {
    if (!error) {
      res.end("added");
    }
  };
  db.collection("todo").insert(x, callback);
	// todos[todos.length] = x;
	res.end("added");
 });


app.get("/deletetodo", function (req, res) {
	res.end("delete code here");
});


app.get("/listtodos", function (req, res) {
	res.end(JSON.stringify(todos));
});


app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/client'));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port, hostname);