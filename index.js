const express = require('express');
const helment = require('helmet');
const cors = require('cors');

const apiRouter = require('./api/apiRouter');

const port = 5000;

const server = express();

server.use(express.json());

server.use(helment());

server.use(cors());

server.options('*', cors()); // include before other routes

server.use('/api', apiRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "API is online." });
});

server.use((req, res) => {
  res.status(404).json({ message: "Not found." });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
})
