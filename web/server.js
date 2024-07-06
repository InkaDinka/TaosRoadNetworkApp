const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

//Define CORS options (since the origin is localhost for client and server side Access-Control-Allow-Origin header must be the site that's calling for data.)
app.use(cors({credentials: true, origin: 'https://fluffy-telegram-wr77gxwv66pg35r64-8000.app.github.dev'}));

app.use(express.json())
//Accessing repository environment variables
const NEO4J_URI = process.env.NEO4J_URI;
const NEO4J_USER = process.env.NEO4J_USER;
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD;

//Define a route handler for '/'
app.get('/', (req, res) => {
    res.send('Blank info');
  });

app.get('/data', (req, res) => {
//sets the secrets in json format
  const secrets = {
    secret_p: NEO4J_PASSWORD,
    secret_u: NEO4J_URI,
    secret_user: NEO4J_USER
  };
//response will be in json.
  res.json(secrets);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});