const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.put('/user', (req, res) => {

});

app.get('/user', (req, res) => {
});

app.get('/user/:id', (req, res) => {

});

app.post('/user/:id', (req, res) => {

});

app.delete('/user/:id', (req, res) => {

});


app.listen(port, () => console.log(`Server listening on port ${port}!`));

