const express = require('express');
const bodyParser = require("body-parser");
require("module-alias/register");
const dotenv = require('dotenv');
const indexRoute = require("@routes/index");

var cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());


  

 
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});
app.use(bodyParser.json({ limit: "50mb" }));


// define a simple route
app.get("/api", (req, res) => {
  res.json({ message: "No Page found" });
});

app.use("/api", indexRoute);
// Start the server
const PORT = process.env.NODE_PORT || 4000;
app.listen(PORT, () => {  console.log(`App listening on port ${PORT}`); 
});
