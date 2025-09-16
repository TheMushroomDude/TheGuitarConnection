const express = require('express');
const apiRouterMessages = express.Router();

apiRouterMessages.get('/', (req, res) => {
    res.sendStatus(200);
})

apiRouterMessages.post('/create', (req, res) => {
    res.status(200).json({
        "pages": ['/', '/messages'],
        "api": ['/api', '/api/directory']
    });
})

module.exports = { apiRouterMessages };