const express = require('express');
const router = express.Router();

const {GenerateNewshortURL, handleGetanalytics}= require('../controller/url');

router.post('/', GenerateNewshortURL);
router.get('/analytics/:shortId', handleGetanalytics);

module.exports = router;