const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const https = require('https');
const fs = require('fs');

const userAPIs = require('./APIs/userAPI');
const friendAPIs = require('./APIs/friendsAPI');
const messageAPI = require('./APIs/messageAPI')
require('dotenv').config();

const app = express();

app.use(express.static('uploads'));
app.use(express.json());
app.use(cors());
app.use(fileUpload());

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.info('Database connection granted');
    db_connection_success = true;
  })
  .catch(error => {
    db_connection_success = false;
    console.warn('Database connection error:', error.message);
  });

app.use(userAPIs);
app.use(friendAPIs);
app.use(messageAPI);

// Load the SSL certificate files
const httpsOptions = {
  key: fs.readFileSync('./certs/192.168.3.194-key.pem'),
  cert: fs.readFileSync('./certs/192.168.3.194.pem')
};

const server = https.createServer(httpsOptions, app);

app.get('/', async(req, res) => {
  res.send('True')
})

server.listen(process.env.BACK_END, () => {
  console.info(`Back-End Convo Started Successfully on port => ${process.env.BACK_END}!`);
});
