const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

const routes = require("./routes");

routes(app);

app.listen(process.env.PORT || 8080);