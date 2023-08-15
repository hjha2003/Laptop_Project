const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('../backend/routes/route');
const cors = require("cors");
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', userRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on ${process.env.PORT || 5000}`);
});


