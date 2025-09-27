const express = require('express');
const fs = require('fs');
const { CdnDir } = require('../tools');
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.sendStatus(200);
})

module.exports = { apiRouter };