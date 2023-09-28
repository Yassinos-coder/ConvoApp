const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const userAPIs = require("./APIs/userAPI");
const friendAPIs = require("./APIs/friendsAPI");
const messageAPI = require("./APIs/messageAPI");
require("dotenv").config();

const app = express();

app.use(express.static("uploads"));
app.use(express.json());
app.use(cors());
app.use(fileUpload());

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info("Database connection granted");
    db_connection_success = true;
  })
  .catch((error) => {
    db_connection_success = false;
    console.warn("Database connection error:", error.message);
  });

app.use(userAPIs);
app.use(friendAPIs);
app.use(messageAPI);


app.listen(process.env.BACK_END, () => {
  console.info(
    `Back-End Convo Started Successfully on port => ${process.env.BACK_END}!`
  );
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Convo BackEnd</title>
      </head>
      <body>
        <h1>GET THE FUCK OUTTA HERE !!!🤬</h1>
      </body>
    </html>
  `);
});