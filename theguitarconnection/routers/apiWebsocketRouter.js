const express = require('express');
const apiWSRouter = express.Router();

apiWSRouter.get('/', (req, res) => {
    res.sendStatus(200);
})

module.exports = { apiWSRouter };