const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.sendStatus(200);
})

module.exports = { apiRouter };