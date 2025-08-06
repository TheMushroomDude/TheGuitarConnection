const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.sendStatus(200);
})

apiRouter.get('/directory', (req, res) => {
    res.status(200).json({
        "pages": ['/', '/messages'],
        "api": ['/api', '/api/directory']
    });
})

module.exports = { apiRouter };