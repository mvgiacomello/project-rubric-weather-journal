const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();

const port = 8080;
const projectData = [];

server.use(cors());
server.use(bodyParser.json());
server.use('/', express.static(path.join(__dirname, './../app/')));

server.get('/api/data', (_req, res) => {
    console.log('Request received on [GET] /api/data');
    console.log('Returning', projectData);
    res.send(projectData)
})

server.post('/api/data', (req, res) => {
    console.log('Request received on [POST] /api/data');
    projectData.push(req.body);

    const lastObject = projectData[projectData.length - 1];
    console.log('Returning', lastObject);
    res.send(lastObject);
})

server.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});