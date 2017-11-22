const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + 'public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.send('Root route');
});

app.listen(3000, function() {
  console.log('Server started...');
});
