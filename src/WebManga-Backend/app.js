
const bodyParser = require('body-parser');
const cors = require('cors');
const docs = require('./docs_swagger');
const swaggerUi = require('swagger-ui-express');
const router = require("./router");
const express = require("express");



require("dotenv").config();

const app = express();
const port = 4000;


app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api-documentation',swaggerUi.serve, swaggerUi.setup(docs));

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/',router);

app.listen(port, () => {
  console.log(`L'API peut maintenant recevoir des requêtes: http://localhost:${port}`);
});
